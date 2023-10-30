import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'


function App() {
  const [emails, setEmails] = useState(initialEmails)
  // console.log(emails)

  // CREATE CLASSNAME DEPENDING ON READ/UNREAD STATE
  function readEmail(email) {
      if (email.read === true) {
        return 'read'
      }
      else {
        return 'unread'
      }
  }

  // EXTENSION 1
  // TOGGLE READ STATE FUNCTION
  function toggleRead(email) {
      const readEmail = emails.map((currentEmail) => {
        if (currentEmail === email) {
          return {
            ...currentEmail,
            read: !currentEmail.read
          }
        }
        else {
          return currentEmail
        }
      })
    setEmails(readEmail)
  }

// TOGGLE STARRED STATE FUNCTION
function toggleStarred(email) {
  const starredEmail = emails.map((currentEmail) => {
    if (currentEmail === email) {
      return {
        ...currentEmail,
        starred: !currentEmail.starred
      }
    }
    else {
      return currentEmail
    }
  })
  setEmails(starredEmail)
}

// EXTENSION 2
const [hideRead, setHideRead] = useState(false)

const emailsToHide = hideRead ? emails.filter((email) => email.read === false) : emails

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
              checked={hideRead}
              onChange={(e) => {setHideRead(e.target.checked)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailsToHide.map((email) => 
          <li key={email.id} className={`email ${readEmail(email)}`}  >
            <div className="select">
              <input className="select-checkbox" type="checkbox" checked={email.read} onChange={() => toggleRead(email)}/>
            </div>
            <div className="star">
              <input className="star-checkbox" type="checkbox" checked={email.starred} onChange={() => toggleStarred(email)}/>
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
          )}
        </ul>
    </main>
    </div>
  )
}

export default App
