import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);
  const [currentTab, setCurrentTab] = useState("inbox");
  const [hideRead, setHideRead] = useState(false);

  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email === targetEmail ? { ...email, star: !email.star } : email
    );
    setEmails(updatedEmails);
  };

  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email === targetEmail ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  let filteredEmails = emails;

  if (currentTab === "starred") {
    filteredEmails = emails.filter((email) => email.star);
  }
  if (hideRead) {
    filteredEmails = filteredEmails.filter((email) => !email.read);
  }

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
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter((email) => email.star).length}
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
        <ul>
          {filteredEmails.map((email, index) => (
            <li
              className={`email ${email.read ? "read" : "unread"}`}
              key={index}
            >
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
                  checked={email.star}
                  onChange={() => toggleStar(email)}
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
