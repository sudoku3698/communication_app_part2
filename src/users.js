import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import './Users.css'

export default function Users() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')))

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error,setError]=useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (index) => {
    const updatedUsers = [...users]
    const userToDelete = updatedUsers[index]
    

    const confirmDelete = window.confirm(`Are you sure you want to delete ${userToDelete.name}?`)
    if (confirmDelete) {
      updatedUsers.splice(index, 1)
      setUsers(updatedUsers)
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setName(users[index].name)
    setEmail(users[index].email)
    handleShow()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editIndex !== null) {
      if (!name) {
        setError('Please enter a name')
        return
      }
      if (!email) {
        setError('Please enter an email')
        return
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setError('Invalid email address')
        return
      }
      const updatedUsers = [...users]
      const currentUser = updatedUsers[editIndex]
      const isEmailUnique = updatedUsers.every(user => user.email !== email || user.email === currentUser.email)
      if (!isEmailUnique) {
        setError('Email must be unique except self')
        return
      }
    }
    if (editIndex === null) {
      setUsers([...users, { name, email }])
    } else {
      setError('')
      const updatedUsers = [...users]
      updatedUsers[editIndex] = { ...updatedUsers[editIndex], name:name, email:email }
      setUsers(updatedUsers)
    }
    setEditIndex(null)
    setName('')
    setEmail('')
    handleClose()
  }


  return (<>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className="btn btn-primary btn-sm me-2">Edit</button>
                  {loggedInUser !== null && loggedInUser.email !== users[index].email && (
                    <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>}
            <Modal.Body>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loggedInUser?.email === email} />
            </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
    </>
  )
}



