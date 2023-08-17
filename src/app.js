import { useState } from 'react'
import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  // Use initialEmails for state
  const [emailsList, setEmailsList] = useState(initialEmails)

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
      <main className="emails">{
        /* Render a list of emails here, according to email-template.html */
        <ul>{
          emailsList.map((email, key) =>
            <li className={`email ${email.read ? "read" : "unread"}`}>
              <div className="select">
                <input className="select-checkbox" type="checkbox"/>
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox"/>
              </div>
              <div className="sender">
                {email.sender}
              </div>
              <div className="title">
                {email.title}
              </div>
            </li>
          )
        }</ul>
      }</main>
    </div>
  )
}

export default App
