import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'
import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => { }}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            onClick={() => { }}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => { }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {
          /* Render a list of emails here */
          emails.map((email, _) => (
            < li key={email.id} className={`email ${email.read ? "read" : "unread"}`} >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
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
        }
      </main>
    </div >
  )
}

export default App
