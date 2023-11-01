import { useState } from "react";
import Header from "./components/header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

  const ReadToggle = (value) =>
    setEmails(
      emails.map((item) =>
        item === value ? { ...value, read: !value.read } : item
      )
    );

  const toggleStar = (value) =>
    setEmails(
      emails.map((item) =>
        item === value ? { ...value, starred: !value.starred } : item
      )
    );

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === "inbox" ? `item active` : "item"}
            onClick={() => setCurrentTab("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={currentTab === "starred" ? `item active` : "item"}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter((item) => item.starred).length}
            </span>
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
      <main className="emails">
        {emails
          .filter((item) => (hideRead ? !item.read : item))
          .filter((item) => (currentTab === "starred" ? item.starred : item))
          .map((email, index) => (
            <li className="email" key={index}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => ReadToggle(email)}
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
      </main>
    </div>
  );
}

export default App;
