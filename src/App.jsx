import {useState} from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getReadEmails = emails => emails.filter(email => email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  // Use initialEmails for state
  const [inboxEmails, setInboxEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("inbox")
  console.log(initialEmails)

  const unreadEmails = inboxEmails.filter(email => !email.read)
  const starredEmails = inboxEmails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setInboxEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setInboxEmails(updatedEmails)
  }

  let filteredInbox = inboxEmails

  if (hideRead) filteredInbox = getReadEmails(filteredInbox)

  if (currentTab === "starred") filteredInbox = getStarredEmails(filteredInbox)
  
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => {setCurrentTab("inbox")}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => {setCurrentTab("starred")}}
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
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */
        filteredInbox.map((email, index) => (
          <li className={`email ${email.read ? 'unread' : 'read'}`} key={index}>
            <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={!email.read}
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
        ))}</main>
    </div>
  )
}

export default App
