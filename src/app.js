import { useState } from 'react'
import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  // Use initialEmails for state
  const [emailsList, setEmailsList] = useState(initialEmails)

  const toggleRead = (emailId) => {
    // update the target email's read property in state, when a user clicks on the checkbox

    // NOTE: update state of emailsList as presented here: https://stackoverflow.com/questions/72108129/react-update-array-of-object-with-checked-field-in-state

    const newEmailsList = emailsList.map(email =>
      email.id === emailId ? {...email, read: !(email.read)} : email
    )
    setEmailsList(newEmailsList)
  }

  const toggleStar = (emailId) => {
    // update the target email's starred property in state, when a user clicks on the star
    // NOTE: update state of emails array as presented here: https://stackoverflow.com/questions/72108129/react-update-array-of-object-with-checked-field-in-state

    const newEmailsList = emailsList.map(email =>
      email.id === emailId ? {...email, starred: !(email.starred)} : email
    )
    setEmailsList(newEmailsList)
  }

  const emailItems = emailsList.map(email => 
    <li className={`email ${email.read ? "read" : "unread"}`} key={email.id}>
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          onChange={() => {toggleRead(email.id)}}
        />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          onChange={() => {toggleStar(email.id)}}
        />
      </div>
      <div className="sender">
        {email.sender}
      </div>
      <div className="title">
        {email.title}
      </div>
    </li>
  )

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
        <ul>{ emailItems }</ul>
      }</main>
    </div>
  )
}

export default App
