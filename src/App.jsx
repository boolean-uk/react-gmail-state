import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

export default function App() {
  const [currentTab, setCurrentTab] = useState("inbox");
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  // Filter emails by read status
  const unreadEmails = emails.filter((email) => !email.read);

  // Filter emails by starred status
  const starredEmails = emails.filter((email) => email.starred);

  // Get starred emails
  const getStarredEmails = (emails) => emails.filter((email) => email.starred);

  // Get unread emails
  const getReadEmails = (emails) =>
    hideRead ? emails.filter((email) => !email.read) : emails;

  // Toggle star status
  const toggleStar = (targetEmail) => {
    const updateEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      );
    setEmails(updateEmails);
  };

  let filteredEmails = emails;
  // If statement to filter emails based on the current tab
  if (hideRead) filteredEmails = getReadEmails(filteredEmails);

  if (currentTab === "starred")
    filteredEmails = getStarredEmails(filteredEmails);

  const toggleRead = (targetEmail) => {
    const updateEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      );
    setEmails(updateEmails);
  };

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
