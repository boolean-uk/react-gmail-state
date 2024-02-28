import { useState } from 'react'

import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const getUnreadEmails = (emails) => {
    return emails.filter((email) => !email.read)
  }

  const getStarredEmails = (emails) => {
    return emails.filter((email) => email.starred)
  }

  let filteredEmails = emails
  if (hideRead) filteredEmails = getUnreadEmails(emails)
  if (currentTab === 'starred') filteredEmails = getStarredEmails(emails)
  
  /**
   * Count the amount of unread emails by checking the length of a filtered list
   * @returns The amount of unread emails
   */
  const countUnread = () => {
    return emails.filter((email) =>
      !email.read
    ).length
  }

  /**
   * Count the amount of starred emails by checking the length of a filtered list
   * @returns The amount of starred emails
   */
  const countStarred = () => {
    return emails.filter((email) =>
      email.starred
    ).length
  }

  /**
   * "Read" an email by setting its read property to its opposite
   * @param {The email to update} email 
   */
  const toggleRead = (email) => {
    const updatedList = emails.map((currentEmail) =>
      currentEmail === email ? {...currentEmail, read: !currentEmail.read} : currentEmail
    )
    setEmails(updatedList)
  }

  /**
   * Star an email by setting its starred property to its opposite
   * @param {The email to update} email 
   */
  const toggleStarred = (email) => {
    const updatedList = emails.map((currentEmail) =>
      currentEmail === email ? {...currentEmail, starred: !currentEmail.starred} : currentEmail
    )
    setEmails(updatedList)
  }

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
            <span className="count">{countUnread()}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => {setCurrentTab('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{countStarred()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => {setHideRead(!hideRead)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{filteredEmails.map((email, index) => (
      <>
        <li className=
        {`email ${email.read ? 'read' : 'unread'}`}
        key={index}
        > 
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onClick={() => toggleRead(email)}
            />
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onClick={() => toggleStarred(email)}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
      </>
      )
      )}</main>
    </div>
  )
}

export default App
