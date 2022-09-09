function login({ email, password }) {
  const delay = (0.7 + Math.random() * 2) * 1000

  return new Promise((resolve, reject) => {
    if (password === "password123" && !!email) {
      resolve()
    } else {
      reject(new Error('Invalid credentials'))
    }
  })
}

export default login