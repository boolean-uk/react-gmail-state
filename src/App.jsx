  import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)

  function toggleRead(toUpdate) {
    const updatedEmails = emails.map((email) => email === toUpdate ? {...email, read: !email.read} : email)

    setEmails(updatedEmails)
  }

  function toggleStar(toUpdate) {
    const updatedEmails = emails.map((email) => email === toUpdate ? {...email, starred: !email.starred} : email)

    setEmails(updatedEmails)
  }

  function getUnreadEmails(emails) {
    return emails.filter((email) => !email.read)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getUnreadEmails(filteredEmails)

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
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul> 
          {filteredEmails.map((email, index) => (
            <li 
              key={index} 
              className={`email ${email.read ? "read" : "unread"}`}>
                <div className='select'>
                  <input 
                    className='select-checkbox' type='checkbox'
                    checked={email.read}
                    onChange={() => toggleRead(email)}
                    />
                </div>
                <div className='star'>
                  <input 
                    className='star-checkbox'
                    type='checkbox' 
                    checked={email.starred}
                    onChange={() => toggleStar(email)}
                    />
                </div>
                <div className='sender'>{email.sender}</div>
                <div className='title'>{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
