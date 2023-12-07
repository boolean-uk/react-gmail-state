import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  const [emails] = useState(initialEmails);

  const starredEmails = () => emails.filter((email) => email.starred);
  const readEmails = () => emails.filter((email) => email.read);

  console.log(initialEmails);

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
            <span className="count">{readEmails().length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails().length}</span>
          </li>

          <li className="item toggle">
            <label htmlfor="hide-read">Hide read</label>
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
        <ul>
          {emails.map((email) => (
            <li
              key={email.id}
              className={`email ${email.read ? "read" : "unread"}`}
            >
              <div className="select">
                <input
                  type="checkbox"
                  className="select-checkbox"
                  checked={email.read}
                />
              </div>
              <div className="star">
                <input
                  type="checkbox"
                  className="star-checkbox"
                  checked={email.starred}
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
