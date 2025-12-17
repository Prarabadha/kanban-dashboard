// Helper to simulate network delay
const delay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Get users database from localStorage
const getUsersDB = () => {
  const data = localStorage.getItem("usersDB");
  return data ? JSON.parse(data) : [];
};

// Save users database to localStorage
const saveUsersDB = (usersDB) => {
  localStorage.setItem("usersDB", JSON.stringify(usersDB));
};

// SIGN UP API
export const signUpApi = async (userData) => {
  await delay();

  let usersDB = getUsersDB();

  const userExists = usersDB.find(
    (u) => u.email === userData.email
  );

  if (userExists) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  usersDB.push(userData);
  saveUsersDB(usersDB);

  return {
    success: true,
    message: "Signup successful",
  };
};

// SIGN IN API
export const signInApi = async ({ email, password }) => {
  await delay();

  let usersDB = getUsersDB();

  const user = usersDB.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  return {
    success: true,
    message: "Login successful",
    user,
  };
};
