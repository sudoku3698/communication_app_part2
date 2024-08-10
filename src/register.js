import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./css/golbal.css"

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault()

    if(!data.name){
      alert('Please enter your name')
      return
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
      alert('Invalid email address')
      return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existUser = users.find(user => user.email === data.email)
    if(existUser){
      alert('Email already exists')
      return
    }
    if(!data.email){
      alert('Please enter your email')
      return
    }
    if(!data.password){
      alert('Please enter your password')
      return
    }
    if(!data.confirmPassword){
      alert('Please confirm your password')
      return
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const user = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users') || '[]'), user]))
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    navigate('/success_register')
  }

  return (
    <>
      <div className ="container">
        <h1 className ="text-center">Register</h1>
        <div className ="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input placeholder="Enter Name" type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input placeholder="Enter Email" type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input placeholder="Enter Password" type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input placeholder="Confirm Password" type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="form-group text-center mt-2">
            <Link to="/login" className ="btn btn-link">Login</Link>
            <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
