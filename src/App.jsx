import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'
import { useState } from 'react'

const getReadEmails = emails => emails.filter(email => !email.read)
const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setShowRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const toggleStar = targetEmail =>
  {
    const updatedEmails = emails =>
    emails.map(email =>
       email.id === targetEmail.id
        ? { ...email, starred: !email.starred }
        : email
    )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => 
  {
    const updatedEmails = emails =>
      emails.map(email =>
      email.id === targetEmail.id ? { ...email, read: !email.read } : email
    )
    setEmails(updatedEmails)
  }

  const changeSearch = (event) =>
  {
    setSearchTitle(event.target.value)
  }

  let filteredEmails = emails
  if (hideRead) filteredEmails = getReadEmails(filteredEmails)
  if (currentTab === 'starred') filteredEmails = getStarredEmails(filteredEmails)

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
            <span className="count"></span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count"></span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setShowRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
      {filteredEmails.map((email, index) => (
        <li
            key={index}
            className={`email ${email.read ? 'read' : 'unread'}`}
        >
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
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
      )
      )}
      </main>
    </div>
  )
}

export default App
