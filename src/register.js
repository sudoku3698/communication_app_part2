import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./css/golbal.css"

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({})
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!name) {
      isValid = false;
      errors.name = 'Name is required';
    }
    if (!email) {
      isValid = false;
      errors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      isValid = false;
      errors.email = 'Invalid email address';
    }
    if (!password) {
      isValid = false;
      errors.password = 'Password is required';
    }
    if (!confirmPassword) {
      isValid = false;
      errors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      isValid = false;
      errors.confirmPassword = 'Passwords do not match';
    }
    setError(errors);
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existUser = users.find(user => user.email === email)
    if(existUser){
      setError({...error, email: 'Email already exists'})
      return
    }
    const user = {
      name,
      email,
      password
    }
    localStorage.setItem('users', JSON.stringify([...users, user]))
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    navigate('/success_register')
  }

  const removeError = (field) => {
    setError({...error, [field]: ''})
  }

  return (
    <>
      <div className ="container">
        <h1 className ="text-center">Register</h1>
        <div className ="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input placeholder="Enter Name" type="text" className={`form-control ${error.name ? 'is-invalid' : ''}`} name="name" value={name} onChange={(e) => {removeError('name'); setName(e.target.value)}} />
              {error.name && <div className="invalid-feedback">{error.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input placeholder="Enter Email" type="email" className={`form-control ${error.email ? 'is-invalid' : ''}`} name="email" value={email} onChange={(e) => {removeError('email'); setEmail(e.target.value)}} />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input placeholder="Enter Password" type="password" className={`form-control ${error.password ? 'is-invalid' : ''}`} name="password" value={password} onChange={(e) => {removeError('password'); setPassword(e.target.value)}} />
              {error.password && <div className="invalid-feedback">{error.password}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input placeholder="Confirm Password" type="password" className={`form-control ${error.confirmPassword ? 'is-invalid' : ''}`} name="confirmPassword" value={confirmPassword} onChange={(e) => {removeError('confirmPassword'); setConfirmPassword(e.target.value)}} />
              {error.confirmPassword && <div className="invalid-feedback">{error.confirmPassword}</div>}
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

