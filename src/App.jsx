import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)

  const toggleRead = (targetEmail) => {
    const updatedEmails = emails =>
    emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map(email =>
      email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
    )
    setEmails(updatedEmails)


  } 
  
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        <ul>
          {emails.map((email, index) => (
            <li
              key={index}
              className={`email ${email.read ? 'read' : 'unread'}`}
              // onClick={() => {}}
            >
              <div className="select">
                <input className='select-checkbox'
                type="checkbox"
                checked={email.read}
                onChange={() => toggleRead(email)}></input>
              </div>
              <div className="star">
                <input className='star-checkbox'
                type="checkbox"
                checked={email.starred}
                onChange={() => toggleStar(email)}></input>
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
        }
        </main>
    </div>
  )
}

export default App
