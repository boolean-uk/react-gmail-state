import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);

  const renderEmails = emails.map((email) => {
    return (
      <div key ={email.id}>
        <li className="email">
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox" 
              checked={email.read}
              onChange={() => toggleRead(email)} />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={() => toggleStarred(email)} />
          </div>
          <div className="sender">
            {email.sender}
          </div>
          <div className="title">
            {email.title}
          </div>
        </li>
      </div>
    )
  })

  const toggleRead = (email) => {
    const updatedEmails = emails.map((eachEmail) => {
      if (eachEmail === email) {
        return {
          ...eachEmail,
          read: !eachEmail.read,
        }
      } else {
        return eachEmail
      }
    })
    setEmails(updatedEmails)
  }

  const toggleStarred = (email) => {
    const updatedEmails = emails.map((eachEmail) => {
      if (eachEmail === email) {
        return {
          ...eachEmail,
          starred: !eachEmail.starred
        }
      } else {
        return eachEmail
      }
    })
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
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{renderEmails}</main>
    </div>
  )
}

export default App
