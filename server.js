import jsonServer from 'json-server'
import bcrypt from 'bcryptjs'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

// Signup: creates a new user with hashed password
server.post('/signup', (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const users = router.db.get('users').value()
  const existing = users.find((u) => u.email === email)
  if (existing) {
    return res.status(400).json({ error: 'Email already exists' })
  }

  const hashed = bcrypt.hashSync(password, 10)
  const id = Date.now()
  const user = { id, email, password: hashed, name: name || '' }

  router.db.get('users').push(user).write()

  const { password: _p, ...safe } = user
  return res.status(201).json(safe)
})

// Signin: validates credentials and returns user data (without password)
server.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = router.db.get('users').find({ email }).value()
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const { password: _p, ...safe } = user
  return res.json(safe)
})

// GET /tasks - Get all tasks for the logged-in user (filtered by userId)
server.get('/tasks', (req, res) => {
  const userId = req.query.userId
  if (!userId) {
    return res.status(400).json({ error: 'userId query parameter is required' })
  }
  const tasks = router.db.get('tasks').filter({ userId: parseInt(userId) }).value()
  return res.json(tasks)
})

// POST /tasks - Create a new task for the logged-in user
server.post('/tasks', (req, res) => {
  const { name, priority, deadline, stage, userId } = req.body
  if (!name || !userId) {
    return res.status(400).json({ error: 'name and userId are required' })
  }
  const id = Date.now()
  const task = { id, name, priority: priority || '', deadline: deadline || '', stage: stage || 0, userId: parseInt(userId) }
  router.db.get('tasks').push(task).write()
  return res.status(201).json(task)
})

// PUT /tasks/:id - Update a task (verify it belongs to the user)
server.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const { userId, ...updates } = req.body
  const task = router.db.get('tasks').find({ id: taskId }).value()
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  if (userId && task.userId !== parseInt(userId)) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  const updated = { ...task, ...updates }
  router.db.get('tasks').find({ id: taskId }).assign(updated).write()
  return res.json(updated)
})

// DELETE /tasks/:id - Delete a task (verify it belongs to the user)
server.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const userId = req.query.userId
  if (!userId) {
    return res.status(400).json({ error: 'userId query parameter is required' })
  }
  const task = router.db.get('tasks').find({ id: taskId }).value()
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  if (task.userId !== parseInt(userId)) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  router.db.get('tasks').remove({ id: taskId }).write()
  return res.json({ message: 'Task deleted' })
})

// Fallback to default router (REST for /users and any other resources in db.json)
server.use(router)

const PORT = process.env.JSON_SERVER_PORT || 5000
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running on port ${PORT}`)
})
