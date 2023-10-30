import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'


function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [emailStarred, setEmailStarred] = useState()
  
  console.log(emails)
  
  const emailsStarred = emailStarred ? emails.filter(mail => mail.read === true) : emails;

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
        {emails.map((email, index) => (
          <li key={index} className="email">
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"/>
          </div>
          <div className="star">
          <input
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
