import { useState } from 'react'
import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  const [emailsList, setEmailsList] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [starredOnly, setStarredOnly] = useState(false)

  const toggleRead = (emailId) => {
    // NOTE: update state of emailsList as presented here: https://stackoverflow.com/questions/72108129/react-update-array-of-object-with-checked-field-in-state

    const newEmailsList = emailsList.map(email =>
      email.id === emailId ? {...email, read: !(email.read)} : email
    )
    setEmailsList(newEmailsList)
  }

  const toggleStar = (emailId) => {
    // NOTE: update state of emails array as presented here: https://stackoverflow.com/questions/72108129/react-update-array-of-object-with-checked-field-in-state

    const newEmailsList = emailsList.map(email =>
      email.id === emailId ? {...email, starred: !(email.starred)} : email
    )
    setEmailsList(newEmailsList)
  }

  const toggleHideRead = () => setHideRead(!hideRead)

  const toggleStarredOnly = () => setStarredOnly(!starredOnly)

  // const displayEmail = (isRead, isStarred) => {
  //   /** render email if:
  //    * either Hide Read is unchecked, or Hide Read is checked and email.read is false
  //    * and
  //    * either Starred is not active or Starred is active and email.starred is true
  //    */
  //   const display = ((!hideRead) || !isRead) &&
  //                   ((!starredOnly) || isStarred)
  //   return display
  // }

  const getEmailsToDisplay = () => {
    let emailsToDisplay = emailsList
    if (hideRead) {
      emailsToDisplay = emailsToDisplay.filter(email => !email.read)
    }
    if (starredOnly) {
      emailsToDisplay = emailsToDisplay.filter(email => email.starred)
    }
    return emailsToDisplay
  }

  const emailItems = getEmailsToDisplay().map(email => {
    // render email if either Hide Read is unchecked, or Hide Read is checked and email.read is false
    // if (displayEmail(email.read, email.starred)) {
      return (
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
              checked={email.starred}
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
    // } else {
    //   return null
    // }
  })

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${!starredOnly ? "active" : ""}`}
            onClick={toggleStarredOnly}
          >
            <span className="label">Inbox</span>
            <span className="count">{emailsList.length}</span>
          </li>
          <li
            className={`item ${starredOnly ? "active" : ""}`}
            onClick={toggleStarredOnly}
          >
            <span className="label">Starred</span>
            <span className="count">{emailsList.filter(email => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={toggleHideRead}
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
