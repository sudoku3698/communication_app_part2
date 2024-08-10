import React from 'react'

function welcome() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const userName = loggedInUser ? loggedInUser.name : ''
  return (
    <div>
      <h1>Welcome {userName}</h1>
    </div>
  )
}

export default welcome