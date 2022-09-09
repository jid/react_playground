import { useEffect, useState } from 'react'
import login from './utils'

// ====================== LOGIN FORM ===================
//
// Guidelines:
// * You have an incomplete login form.
// * You are not allowed to add any additional HTML elements.
// * You are not allowed to use refs.
//
// Tasks:
// * The login button should trigger the login() action imported above and pass required data to it.
// * Disable the Login button if email is blank OR if password is under 6 letters.
// * Disable the Login button while login action is beeing performed.
// * Show an error message from the login() if login fails. The error should be cleared every time user re-attempts to log in.
// * Show an alert box (native Javascript alert) if login succeeds. Investigate the login function  to find out how to log in succesfully.

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginDisabled, setLoginDisabled] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setLoginDisabled(!email || password.length < 6)
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      setLoginDisabled(true)
      await login({ email, password })
      setLoginDisabled(false)

      alert('Logged in!')
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="wrapper">
      <div className="row">
        <label htmlFor={"email"}>Email</label>
        <input id={"email"} type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="row">
        <label htmlFor={"password"}>Password</label>
        <input id={"passowrd"} type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMsg ? (<div className="errorMessage">{errorMsg}</div>) : null}

      <div className="button">
        <button
          onClick={handleLogin}
          disabled={loginDisabled}
        >Login</button>
      </div>
    </div>
  )
}