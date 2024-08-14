import React from 'react'

function LoginSucess() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const userName = loggedInUser ? loggedInUser.name : ''
  return (
    <div className='text-center'>
      <h1>Login Successfully </h1>
      <h2>Welcome, {userName}</h2>
    </div>
  )
}

export default LoginSucess