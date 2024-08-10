import React, { useState, useEffect } from 'react'
export default function Chats() {
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')))
  const [chats, setChats] = useState(JSON.parse(localStorage.getItem('chats')) || [])
  const [message, setMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message) {
      alert('Please enter message')
      return
    }
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}`
    const chat = {
      userName: loggedInUser.name,
      message: message,
      time: time
    }
    setChats([...chats, chat])
    setMessage('')
  }

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-default">
            <div className="card-header">Chats</div>
            <div className="card-body p-0">
              <ul className="list-unstyled" style={{ height: '400px', overflowY: 'auto' }}>
                {chats.map((chat, index) => (
                  <li key={index} className="p-2">
                    <div className={`align-items-center d-flex mb-3 ${chat.userName === loggedInUser.name ? 'justify-content-end' : ''}`}>
                      <div className={`d-flex flex-column bg-light ${chat.userName === loggedInUser.name ? 'border border-primary rounded-end' : 'border border-secondary rounded-start'}`} style={{ width: '75%' }}>
                        <div className="d-flex align-items-center p-2">
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 mt-1">
                            {chat.message}
                          </div>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                          <strong>{chat.userName}</strong>
                          <div className="text-muted small">{chat.time}</div>
                        </div>

                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <form onSubmit={handleSubmit} className="d-flex">
                <span className="mt-2 ms-auto pr-2" style={{ paddingRight: "10px" }}>{loggedInUser.name}</span>
                <input className="form-control me-2" type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." />
                <button className="btn btn-primary" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
