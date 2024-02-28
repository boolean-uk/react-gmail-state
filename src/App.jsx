import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleRead = (target) => {
    const updatedEmails = emails.map((email) =>
      email.id === target.id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  const toggleStar = (target) => {
    const updatedEmails = emails.map((email) =>
      email.id === target.id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  };

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
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map(
            (email, index) =>
              // If hideRead is checked only show not read emails
              (!hideRead || !email.read) && (
                <li
                  className={email.read ? "email read" : "email unread"}
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
                      onClick={() => toggleStar(email)}
                    />
                  </div>
                  <div className="sender">{email.sender}</div>
                  <div className="title">{email.title}</div>
                </li>
              )
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
