import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getUnreadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)

  const [hideRead, setHideRead] = useState(false)

  const [tab, setTab] = useState("inbox")

  let filteredEmails = emails

  const unreadNum = getUnreadEmails(emails).length
  const starredNum = getStarredEmails(emails).length

  if (hideRead) {
    filteredEmails = getUnreadEmails(filteredEmails)
  }

  if (tab === "starred") {
    filteredEmails = getStarredEmails(filteredEmails)
  }

  const toggleRead = (email) => {
    setEmails(emails.map(em => em === email ? {...em, read: !em.read} : em))
  }

  const toggleStar = (email) => {
    setEmails(emails.map(em => em === email ? {...em, starred: !em.starred} : em))
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${tab === "inbox" ? "active" : ""}`}
            onClick={() => setTab("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadNum}</span>
          </li>
          <li
            className={`item ${tab === "starred" ? "active" : ""}`}
            onClick={() => setTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredNum}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        filteredEmails.map((email) => (
          <li className={`email ${email.read ? "read" : "unread"}`} key={email.id} >
            <div className="select">
            <input
              className="select-checkbox"
              type="checkbox" 
              checked={email.read}
              onChange={()=>toggleRead(email)}
              />
            </div>
            <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={()=>toggleStar(email)}
            />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        ))
      }</main>
    </div>
  )
}

export default App
