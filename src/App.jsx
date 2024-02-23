import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";
import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("Inbox");

  const toggleRead = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, read: !email.read } : email
      )
    );
  };

  const toggleStar = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const getReadEmails = (emails) => {
    return emails.filter((email) => email.read === false);
  };

  const getStarredEmails = (emails) => {
    return emails.filter((email) => email.starred === true);
  };

  let displayedEmails = emails;
  if (hideRead) {
    displayedEmails = getReadEmails(displayedEmails);
  }
  if (currentTab === "Starred") {
    displayedEmails = getStarredEmails(displayedEmails);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "Inbox" ? "active" : ""}`}
            onClick={() => setCurrentTab("Inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{getReadEmails(emails).length}</span>
          </li>
          <li
            className={`item ${currentTab === "Starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("Starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails(emails).length}</span>
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
        {displayedEmails.map((email) => (
          <div
            key={email.id}
            className={`email ${email.read ? "read" : "unread"}`}
          >
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={email.read}
                onChange={() => toggleRead(email.id)}
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked={email.starred}
                onChange={() => toggleStar(email.id)}
              />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
