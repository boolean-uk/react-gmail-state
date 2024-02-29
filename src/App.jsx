import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  // set immutable to state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("inbox")

  // function to update state of emails with a new object array that has updated property read
  function toggleRead(emailId) {
    setEmails((emails) =>
      emails.map((email) =>
        email.id === emailId ? { ...email, read: !email.read } : email
      )
    )
  }

  // function to update state of emails with a new object array that has updated property starred
  function toggleStar(emailId) {
    setEmails((emails) =>
      emails.map((email) =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );
  }


  // set immutable counts for leftbar
  const countRead = emails.filter(email => !email.read).length
  const countStarred = emails.filter(email => email.starred).length

  //declare temporary variable filteredEmails for state handling
  let filteredEmails = emails

  //let variable with email in emails that has the property read = true
  if(hideRead) filteredEmails = 
    emails.filter(email => !email.read)

  //if current tab is set to starred then let variable with email in emails that have property starred = true
  if(currentTab === 'starred') filteredEmails = 
    filteredEmails.filter(email => email.starred)
  

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "inbox" ? "active" : ""}`}
            onClick={() => setCurrentTab("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{countRead}</span>
          </li>
          <li
             className={`item ${currentTab === "starred" ? "active" : ""}`}
             onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{countStarred}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
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
              className={`email ${email.read ? "read" : "unread"}`}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email.id)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email.id)}
                />
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
