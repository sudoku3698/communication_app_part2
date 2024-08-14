import React from 'react'
import { getLoggedInUser } from './db/datasource'

function welcome() {
  const loggedInUser = getLoggedInUser()
  const userName = loggedInUser ? loggedInUser.name : ''
  return (
    <div>
      <h1>Welcome {userName}</h1>
    </div>
  )
}

export default welcome