import { useState, useEffect } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [displayedEmails, setDisplayedEmails] = useState(initialEmails)

  const toggleRead = (email) => {
    console.log(email.title)
    
  }

  const toggleStarred = (targetEmail) => {
    setEmails(emails.map((email) =>
    email.id === targetEmail.id ? {...email, starred: !email.starred} : email))
  }

  useEffect(() => {
    let filteredList = emails
    setDisplayedEmails(filteredList)
  }, [emails])

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
      <main className="emails">
        <ul>
          {displayedEmails.map((email, index) => (
            <li className="email" key={index}>
            <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
              onChange={() => toggleRead(email)}/>
            </div>
            <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={() => toggleStarred(email)}
            />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
