import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);

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
      <main className="emails">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`email ${email.read ? "read" : "unread"}`}
          >
            <div className="select">
              <input
                type="checkbox"
                checked={email.selected}
                onChange={() => {}}
              />
            </div>
            <div class="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked0={email.starred}
                onChange={() => {}}
              />
            </div>

            <span className="sender">{email.sender}</span>
            <span className="title">{email.title}</span>
            <span className="timestamp">{email.timestamp}</span>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
