import { useState } from 'react';

import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');

  const getEmails = () => {
    let tempEmails = emails;
    if (hideRead) {
      tempEmails = emails.filter((email) => !email.read)
    }

    if (currentTab === 'starred') {
      tempEmails = tempEmails.filter((email) => email.starred)
    }

    return tempEmails
  }

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return {
          ...email,
          read: !email.read
        }
      }
      return email
    })
    setEmails(updatedEmails)
  }

  const toggleStar = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return {
          ...email,
          starred: !email.starred
        }
      }
      return email
    })
    setEmails(updatedEmails)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? ' active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter(e => !e.read).length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? ' active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(e => !e.read && e.starred).length}</span>
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
      <main className="emails">
        {getEmails().map((email, index) => (
         <li key={index} className={`email ${email.read ? 'read' : 'unread'}`}>
          <div className="select">
          <input
            checked={email.read}
            className="select-checkbox"
            onClick={() => toggleRead(email.id)}
            type="checkbox"/>
          </div>
          <div className="star">
            <input
              checked={email.starred}
              onClick={() => toggleStar(email.id)}
              className="star-checkbox"
              type="checkbox"
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
