import React, { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'
import './styles/app.css'

function App() {

  const [emails, setEmails] = useState(initialEmails);

  const [currentTab, setCurrentTab] = useState("inbox");

  const [hideRead, setHideRead] = useState(false);

  function toggleRead(emailId) {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, read: !email.read } : email
      )
    );
  }

  function toggleStar(emailId) {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );
  }

  const filteredEmails = (
    currentTab === "inbox"
      ? emails.filter((email) => !email.starred)
      : emails.filter((email) => email.starred)
  ).filter((email) => !hideRead || !email.read);

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
            <span className="count">
              {emails.filter((email) => !email.starred).length}
            </span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter((email) => email.starred).length}
            </span>
          </li>
          <li className="item toggle">
            <label for="hide-read">Hide read</label>
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
        <ul className="email-list">
          {filteredEmails.map((email) => (
            <li
              key={email.id}
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
  );
}

export default App;