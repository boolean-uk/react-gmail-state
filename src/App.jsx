import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'


function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [hideEmails, setHideEmails] = useState(false)


  const toggleStarred = (toggleStarredEmail) => {
    const updatedEmails = emails.map((mappedEmail) => {
      if (mappedEmail === toggleStarredEmail) {
        return {
          ...toggleStarredEmail,
          starred: !toggleStarredEmail.starred
        }

      } else {
        return mappedEmail
      }
    }
    )
    setEmails(updatedEmails)
  }


  const toggleRead = (toggledEmail) => {
    const updatedEmails = emails.map((mappedEmail) => {
      if (mappedEmail === toggledEmail) {
        return {
          ...toggledEmail,
          read: !toggledEmail.read
        }

      } else {
        return mappedEmail
      }
    }
    )
    setEmails(updatedEmails)
  }


  
  const unread = hideEmails ? emails.filter(email => email.read === false) : emails;
  const emailsThatAreStarred = emails ? emails.filter(mail => mail.starred === true) : emails;



  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => { }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className="item"
            onClick={() => { }}
          >
            <span className="label">Starred</span>
            <span className="count">{emailsThatAreStarred.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideEmails}
              onChange={(e) => {
                setHideEmails(e.target.checked)
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {unread.map((email, index) => (
          <li key={index} className="email">
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
                onChange={() => toggleStarred(email)}
              />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        ))}
      </main>
    </div>
  )
}

export default App
