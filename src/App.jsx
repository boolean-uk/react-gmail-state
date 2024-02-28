import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";
import { useEffect } from "react";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [tab, setTab] = useState("inbox");
  const [unread, setUnread] = useState(
    emails.filter((email) => email.read === false).length
  );
  const [starred, setStarred] = useState(
    emails.filter((email) => email.starred === true).length
  );
  function updateUnread() {
    setUnread(emails.filter((email) => email.read === false).length);
  }
  function updateStarred() {
    setStarred(emails.filter((email) => email.starred === true).length);
  }
  function toggleRead(event) {
    const id = parseInt(event.target.value);
    setEmails(
      emails.map((email) => {
        return email.id === id
          ? { ...email, read: event.target.checked }
          : email;
      })
    );
  }
  function toggleStarred(event) {
    const id = parseInt(event.target.value);
    setEmails(
      emails.map((email) => {
        return email.id === id
          ? { ...email, starred: event.target.checked }
          : email;
      })
    );
  }

  useEffect(() => {
    updateUnread();
    updateStarred();
  }, emails);
  
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={tab === "inbox" ? "item active" : "item"}
            onClick={() => {
              setTab("inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unread}</span>
          </li>
          <li
            className={tab === "starred" ? "item active" : "item"}
            onClick={() => {
              setTab("starred");
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starred}</span>
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
        {
          emails.map((email) => {
            if (hideRead && email.read) return;
            if (tab === "starred" && !email.starred) return;
            return (
              <li
                key={email.id}
                className={email.read ? "email read" : "email unread"}
              >
                <div className={"select"}>
                  <input
                    value={email.id}
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read}
                    onChange={toggleRead}
                  />
                </div>
                <div className="star">
                  <input
                    value={email.id}
                    className="star-checkbox"
                    type="checkbox"
                    checked={email.starred}
                    onChange={toggleStarred}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            );
          }) /* Render a list of emails here */
        }
      </main>
    </div>
  );
}

export default App;
