import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

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

  const handleTabChange = (tab) => setCurrentTab(tab);

  const getFilteredEmails = () => {
    switch (currentTab) {
      case "inbox":
        return emails.filter((email) => !email.starred);
      case "starred":
        return emails.filter((email) => email.starred);
      default:
        return emails;
    }
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "inbox" ? "active" : ""}`}
            onClick={() => handleTabChange("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{getFilteredEmails().length}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => handleTabChange("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{getFilteredEmails().length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {getFilteredEmails().map((email) => (
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
