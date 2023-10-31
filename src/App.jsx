import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'
import { flushSync } from 'react-dom'

function App() {
  const [emails, setEmails] = useState(initialEmails)

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

// EXTENSION 3

const [inbox, setInbox] = useState(true)

const unreadEmails = emails.filter((email) => {
  if (email.read === false) {
    return email
  }
})

const starredEmails = emails.filter((email) => {
  if (email.starred === true) {
    return email
  }
})

const starredUnreadEmails = emails.filter((email) => {
  if (email.read === false && email.starred === true) {
    return email
  }
})

let currentEmailList

if (inbox === false && hideRead === true) {
  currentEmailList = starredUnreadEmails
}
else if (inbox === false) {
  currentEmailList = starredEmails
}
else if (hideRead) {
  currentEmailList = unreadEmails
}
else currentEmailList = emails

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={inbox === true ? 'item active' : 'item'}
            onClick={() => {setInbox(true)}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={inbox === false ? 'item active' : 'item'}
            onClick={() => {setInbox(false)}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
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
          {currentEmailList.map((email) => 
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
