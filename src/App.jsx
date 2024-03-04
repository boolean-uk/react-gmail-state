import Header from './components/Header'
import initialEmails from './data/emails'
import './styles/App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [currentTab, setCurrentTab] = useState('inbox') // State to track current tab
  const [hideRead, setHideRead] = useState(false) // State to track whether to hide read emails

  const getReadEmails = () => {
    let readEmails = emails
    if (hideRead) {
      readEmails = readEmails.filter(email => !email.read)
    }
    if (currentTab === 'starred') {
      readEmails = getStarredEmails(readEmails)
    }
    return readEmails
  }

  const getStarredEmails = emails => emails.filter(email => email.starred)

  const toggleRead = readEmail => {
    setEmails(emails.map(email =>
      email.id === readEmail.id ? { ...email, read: !email.read } : email
    ))
  }

  const toggleStar = starredEmail => {
    setEmails(emails.map(email =>
      email.id === starredEmail.id ? { ...email, starred: !email.starred } : email))
  }

  const unreadEmailCount = emails.filter(email => !email.read).length;
  const starredEmailCount = emails.filter(email => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className={`item ${currentTab === 'inbox' ? 'active' : ''}`} onClick={() => setCurrentTab('inbox')}>
            <span className="label">Inbox</span>
            <span className="count">{unreadEmailCount}</span>
          </li>
          <li className={`item ${currentTab === 'starred' ? 'active' : ''}`} onClick={() => setCurrentTab('starred')}>
            <span className="label">Starred</span>
            <span className="count">{starredEmailCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)} // Toggle hideRead state
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {getReadEmails().map((email, index) => (
            <li
              className={`email ${email.read ? 'read' : 'unread'}`}
              key={index}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  defaultChecked={email.read}
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
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
