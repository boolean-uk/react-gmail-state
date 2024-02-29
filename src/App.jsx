import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

const getStarredEmails = (emails) => emails.filter((email) => email.starred);

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

  const unreadEmails = emails.filter((email) => !email.read);
  const starredEmails = emails.filter((email) => email.starred);

  const toggleRead = (targetEmail) => {
    const updateEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      );
    setEmails(updateEmails);
  };

  const toggleStar = (targetEmail) => {
    const updateEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      );
    setEmails(updateEmails);
  };

  const getReadEmails = (emails) =>
    hideRead ? emails.filter((email) => !email.read) : emails;

  let filteredEmails = emails;

  if (hideRead) filteredEmails = getReadEmails(filteredEmails);

  if (currentTab === "starred")
    filteredEmails = getStarredEmails(filteredEmails);

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
      <main className="emails">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`email ${email.read ? "read" : "unread"}`}
          >
            <div className="select">
              <input
                type="checkbox"
                checked={email.selected}
                onChange={() => {
                  toggleRead(email);
                }}
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked={email.starred}
                onChange={() => {
                  toggleStar(email);
                }}
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
