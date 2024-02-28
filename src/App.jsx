import { useState } from "react";

import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

const getReadEmails = (emails) => emails.filter((email) => !email.read)

const getStarredEmails = (emails) => emails.filter((email) => email.starred);

function App() {

  const [emails, setEmails] = useState(initialEmails)

  const [hideRead, setHideRead] = useState(false)

  const [currentTab, setCurrentTab] = useState("inbox")

  let filteredEmails = emails;

  const unreadEmails = emails.filter((email) => !email.read)
  const starredEmails = emails.filter((email) => email.starred)

  const toggleRead = (target) => {
    setEmails(
      emails.map((email) =>
        email.id === target.id ? { ...email, read: !email.read } : email
      )
    )
  }

  const toggleStar = (target) => {
    setEmails(
      emails.map((email) =>
        email.id === target.id ? { ...email, starred: !email.starred } : email
      )
    )
  }

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === "starred")
    filteredEmails = getStarredEmails(filteredEmails)

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
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>

      {/** Handling Emails */}
      <main className="emails">
        <ul>
          {filteredEmails.map((email, index) => (
            <li
              key={index}
              className={`email ${email.read ? "read" : "unread"}`}
            >
              <div className="read">
                <input
                  className="read-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
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
