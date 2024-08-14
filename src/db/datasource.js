//Users
export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  return users
}

export const setDBUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
}

export const getUser = (id) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  return users.find(user => user.id === id)
}

export const createUser = (user) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  user.id = Date.now()
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
  return user
}

export const updateUser = (id, user) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users[index] = user
    localStorage.setItem('users', JSON.stringify(users))
  }
  return user
}

export const deleteUser = (id) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users.splice(index, 1)
    localStorage.setItem('users', JSON.stringify(users))
  }
  return null
}


//Chats
export const getChats = () => {
  const chats = JSON.parse(localStorage.getItem('chats')) || []
  return chats
}

export const setDbChats = (chats) => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }

export const getChat = (id) => {
  const chats = JSON.parse(localStorage.getItem('chats')) || []
  return chats.find(chat => chat.id === id)
}

export const createChat = (chat) => {
  const chats = JSON.parse(localStorage.getItem('chats')) || []
  chat.id = Date.now()
  chats.push(chat)
  localStorage.setItem('chats', JSON.stringify(chats))
  return chat
}

export const updateChat = (id, chat) => {
  const chats = JSON.parse(localStorage.getItem('chats')) || []
  const index = chats.findIndex(c => c.id === id)
  if (index !== -1) {
    chats[index] = chat
    localStorage.setItem('chats', JSON.stringify(chats))
  }
  return chat
}

export const deleteChat = (id) => {
  const chats = JSON.parse(localStorage.getItem('chats')) || []
  const index = chats.findIndex(c => c.id === id)
  if (index !== -1) {
    chats.splice(index, 1)
    localStorage.setItem('chats', JSON.stringify(chats))
  }
  return null
}


//Documents
export const getDocuments = () => {
  const documents = JSON.parse(localStorage.getItem('documents')) || []
  return documents
}
export const setDbDocuments = (updatedDocuments) => {
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
}
export const getDocument = (id) => {
  const documents = JSON.parse(localStorage.getItem('documents')) || []
  return documents.find(doc => doc.id === id)
}

export const createDocument = (document) => {
  const documents = JSON.parse(localStorage.getItem('documents')) || []
  document.id = Date.now()
  documents.push(document)
  localStorage.setItem('documents', JSON.stringify(documents))
  return document
}

export const updateDocument = (id, document) => {
  const documents = JSON.parse(localStorage.getItem('documents')) || []
  const index = documents.findIndex(d => d.id === id)
  if (index !== -1) {
    documents[index] = document
    localStorage.setItem('documents', JSON.stringify(documents))
  }
  return document
}

export const deleteDocument = (id) => {
  const documents = JSON.parse(localStorage.getItem('documents')) || []
  const index = documents.findIndex(d => d.id === id)
  if (index !== -1) {
    documents.splice(index, 1)
    localStorage.setItem('documents', JSON.stringify(documents))
  }
  return null
}


//loggedInUser
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('loggedInUser'))
}

export const setLoggedInUser = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user))
  return user
}

export const updateLoggedInUser = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user))
  return user
}

export const deleteLoggedInUser = () => {
  localStorage.removeItem('loggedInUser')
  return null
}
