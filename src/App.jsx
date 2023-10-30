import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {


  const [emails, setEmails] = useState(initialEmails)
  const [unreadEmails, setUnreadEmails] = useState([])
  const [hideRead, setHideRead] = useState(false)
  const [display, setDisplay] = useState(emails)
  

  const setEmailClassName = (email) => {
    if(email.read === true) {
      return "email read"
    } else {
      return "email unread"
    }
  }

  const toggleRead = email => {
    const updatedEmails = emails.map(
      em => em === email ? {...em, read: !em.read}: em
    )
    setEmails(updatedEmails)
  }

  const toggleStarred = email => {
    const updatedEmails = emails.map(
      em => em === email ? {...em, starred: !em.starred}: em
    )
    setEmails(updatedEmails)
  }

  const filterOutReadEmails = () => {
      const currentUnread = emails.filter(em => em.read === false)
      setUnreadEmails(currentUnread)
  }


  const toggleHideRead = () => {
    if (hideRead === true) {
      setDisplay(unreadEmails)
    } else {
      setDisplay(emails)
    }
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
              checked={!hideRead}
              onChange={() => {
                setHideRead(!hideRead)
                filterOutReadEmails()
                toggleHideRead()
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        <ul> {display.map((email, index) => (
          <li key={index} className={setEmailClassName(email)}>
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
              checked={email.starred}
              type="checkbox"
              onChange={() => toggleStarred(email)}
            />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
        )
        )}
        </ul>
      }</main>
    </div>
  )
}

export default App
