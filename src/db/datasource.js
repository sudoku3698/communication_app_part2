//Users
export const getUsers = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    return users
}

export const setDBUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
}



//Chats
export const getChats = () => {
    const chats = JSON.parse(localStorage.getItem('chats')) || []
    return chats
}

export const setDbChats = (chats) => {
    localStorage.setItem('chats', JSON.stringify(chats))
}


//Documents
export const getDocuments = () => {
    const documents = JSON.parse(localStorage.getItem('documents')) || []
    return documents
}
export const setDbDocuments = (updatedDocuments) => {
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
}


//loggedInUser
export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem('loggedInUser'))
}

export const setLoggedInUser = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
}
export const deleteLoggedInUser = () => {
    localStorage.removeItem('loggedInUser')
    return null
}
