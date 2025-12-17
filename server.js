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

// Fallback to default router (REST for /users and any other resources in db.json)
server.use(router)

const PORT = process.env.JSON_SERVER_PORT || 5000
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running on port ${PORT}`)
})
