import { useState } from 'react'

import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getReadEmails = emails => emails.filter(email => !email.read)
const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const _unreadEmails = emails.filter(email => !email.read)
  const _starredEmails = emails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
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

  let _filteredEmails = emails

  if (hideRead) _filteredEmails = getReadEmails(_filteredEmails)

  if (currentTab === 'starred')
    _filteredEmails = getStarredEmails(_filteredEmails)

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
            <span className="count">{_unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{_starredEmails.length}</span>
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
      <main className="emails">
        <ul>
        {_filteredEmails.map((email, index) => (
            <li key={index} className="email">
              <div className="select">
                <input className="select-checkbox" type="checkbox" onChange={() => toggleRead(email)} checked={email.read}/>
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox" onChange={() => toggleStar(email)} checked={email.starred}/>
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
