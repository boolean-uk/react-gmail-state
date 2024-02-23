import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  const [showOnlyRead, setShowRead] = useState(false)
  const [readEmails, setReadEmails] = useState(initialEmails)

  const toggleStar = targetEmail =>
    {
        const updatedEmails = emails =>
        emails.map(email =>
            email.id === targetEmail.id
            ? { ...email, starred: !email.starred }
            : email
        )
        setEmails(updatedEmails)
    }

    const toggleRead = targetEmail => 
    {
        const updatedEmails = emails =>
        emails.map(email =>
            email.id === targetEmail.id ? { ...email, read: !email.read } : email
        )
        setEmails(updatedEmails)
    }

  const toggleShowRead = (event) =>
  {
    if (event.target.checked)
    {
      const readEmailsArr = emails.filter((email) => email.read === event.target.checked)
      setReadEmails(readEmailsArr)
      setShowRead(true)
    }
    else
    {setShowRead(false)}
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
              checked={showOnlyRead}
              onChange={(event) => {toggleShowRead(event)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
      {/* List of all emails */}
      {!showOnlyRead && emails.map((email, index) => (
        <li
            key={index}
            className={`email ${email.read ? 'read' : 'unread'}`}
        >
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
              onChange={() => toggleRead(email)}
            />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={() => toggleStar(email)}
            />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
      </li>
      )
      )}

      {/* List of only read emails */}
      {showOnlyRead && readEmails.map((email, index) => (
        <li
            key={index}
            className={`email ${email.read ? 'read' : 'unread'}`}
        >
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
              onChange={() => toggleRead(email)}
            />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={() => toggleStar(email)}
            />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
      </li>
      )
      )}
      </main>
    </div>
  )
}

export default App
