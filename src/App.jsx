import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'


function App() {
  // console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  console.log(emails)

  function readEmail(email) {
      if (email.read === true) {
        return 'read'
      }
      else {
        return 'unread'
      }
  }

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
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map((email, index) => 
          // <li key={index} className={'email'}>
          <li key={index} className={`email ${readEmail(email)}`}  >
            <div className="select">
              <input className="select-checkbox" type="checkbox" checked={email.read}/>
            </div>
            <div className="star">
              <input className="star-checkbox" type="checkbox" checked={email.starred}/>
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
          )}
        </ul>
    </main>
    </div>
  )
}

export default App
