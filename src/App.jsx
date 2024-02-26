import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("inbox")

  const toggleStar = (email) => {
    setEmails(emails.map((item) => {
      if (item.id === email.id) {
        return {
          ...item,
          starred: !item.starred
        }
      }
      return item
    }))
  }

  const toggleRead = (email) => {
    setEmails(emails.map((item) => {
      if (item.id === email.id) {
        return {
          ...item,
          read: !item.read
        }
      }
      return item
    }))
  }

  const hideReadEmails = () => {
    setHideRead(!hideRead)
  }

  const getFilteredEmails = () => {
    let filtered;
    if (currentTab === "starred") {
      filtered = emails.filter((email) => email.starred)
    }
    else {
      filtered = emails
    }
    if (hideRead) {
      filtered = filtered.filter((email) => !email.read)
    }
    return filtered
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "inbox" ? "active" : ""}`}
            onClick={() => { setCurrentTab("inbox") }}
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
              className={`item ${currentTab === "starred" ? "active" : ""}`}
            // onClick={() => {}}
            onClick={() => { setCurrentTab("starred") }}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter((email) => email.starred).length}</span>
          </li>

          <li className="item toggle">
          <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
              onChange={() => { hideReadEmails() }}
            />
          </li>
        </ul>
      </nav>

      <main className="emails">{/* Render a list of emails here */getFilteredEmails().map((email, _) => (
            < li key={email.id} className={`email ${email.read ? "read" : "unread"}`} >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
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
              <div className="sender">
                {email.sender}
              </div>
              <div className="title">
                {email.title}
              </div>
            </li>
          ))
        }</main>
    </div>
  )
}

export default App
