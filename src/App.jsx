import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails,setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = emails.filter(email => !email.read)

  if (currentTab === 'starred')
    filteredEmails = emails.filter(email => email.starred)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter(email => !email.read).length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
      <ul>
        {filteredEmails.map((email, index) => (
          <li className={`email ${email.read ? 'read' : 'unread'}`} key={index}>
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={() => {toggleRead(email)}}
            />
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => {toggleStar(email)}}
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
