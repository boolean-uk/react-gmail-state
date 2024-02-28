import { useState, useEffect } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [displayedEmails, setDisplayedEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")
  const [inboxInfo, setInboxInfo] = useState({})

  const updateInboxInfo = () => {
    const info = {}
    info.numUnreadEmails = emails.filter(email => !email.read).length
    info.numStarredEmails = emails.filter(email => email.starred).length
    return setInboxInfo(info)
  }

  const toggleRead = (targetEmail) => {
    setEmails(emails.map((email) =>
    email.id === targetEmail.id ? {...email, read: !email.read} : email))
  }

  const toggleStarred = (targetEmail) => {
    setEmails(emails.map((email) =>
    email.id === targetEmail.id ? {...email, starred: !email.starred} : email))
  }

  useEffect(() => {
    updateInboxInfo()
    let filteredEmails = emails
    if (hideRead) {
      filteredEmails = filteredEmails.filter(email => !email.read)
    }
    if (currentTab === "starred") {
      filteredEmails = filteredEmails.filter(email => email.starred)
    }
    setDisplayedEmails(filteredEmails)
  }, [emails, hideRead, currentTab])

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === "all" ? "item active" : "item"}
            onClick={()=> setCurrentTab("all")}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxInfo.numUnreadEmails}</span>
          </li>
          <li
            className={currentTab === "starred" ? "item active" : "item"}
            onClick={()=> setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{inboxInfo.numStarredEmails}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {setHideRead(!hideRead)}}
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
