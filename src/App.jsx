import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);

  // Create a read/unread state
  function updatedEmailsRead(email) {
    return email.read ? "read" : "unread";
  }
  // Use initialEmails for state
  console.log(initialEmails);

  // EXTENSION 1
  // Toggle Read State Function
  function toggleRead(email) {
    const updatedEmailsRead = emails.map((currentEmail) =>
      currentEmail === email
        ? { ...currentEmail, read: !currentEmail.read }
        : currentEmail
    );
    setEmails(updatedEmailsRead);
  }

  // TOGGLE STARRED STATE FUNCTION
  function toggleStarred(email) {
    const updatedEmailsStarred = emails.map((currentEmail) =>
      currentEmail === email
        ? { ...currentEmail, starred: !currentEmail.starred }
        : currentEmail
    );
    setEmails(updatedEmailsStarred);
  }
  // EXTENSION 2
  const [hideRead, setHideRead] = useState(false);

  // EXTENSION 3

  const [inbox, setInbox] = useState(true);
  const theUnreadEmails = emails.filter((email) => !email.read);
  const theStarredEmails = emails.filter((email) => email.starred);
  const presentEmailList =
    inbox === false ? theStarredEmails : hideRead ? theUnreadEmails : emails;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={inbox === true ? "item active" : "item"}
            onClick={() => {
              setInbox(true);
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{theUnreadEmails.length}</span>
          </li>
          <li
            className={inbox === false ? "item active" : "item"}
            onClick={() => {
              setInbox(false);
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{theStarredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => {
                setHideRead(e.target.checked);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {presentEmailList.map((email) => (
            <li key={email.id} className={`email ${updatedEmailsRead(email)}`}>
              <div className="select">
                <input
                  className="select-checkbox"
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
                  onChange={() => toggleStarred(email)}
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
