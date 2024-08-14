import React from 'react'
import { getLoggedInUser } from './db/datasource'
function LoginSucess() {
  const loggedInUser = getLoggedInUser()
  const userName = loggedInUser ? loggedInUser.name : ''
  return (
    <div className='text-center'>
      <h1>Login Successfully </h1>
      <h2>Welcome, {userName}</h2>
    </div>
  )
}

export default LoginSucess