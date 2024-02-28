import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

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

  const getUnreadEmails = emails.filter((email) => !email.read);

  const getStarredEmails = emails.filter((email) => email.starred);

  // In starred tab only starred emails is included, else all emails included
  const filteredEmails = currentTab === "starred" ? getStarredEmails : emails;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            // Adds class "active" if in inbox tab
            className={currentTab === "inbox" ? "item active" : "item"}
            onClick={() => {
              setCurrentTab("inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{getUnreadEmails.length}</span>
          </li>
          <li
            // Adds class "active" if in starred tab
            className={currentTab === "starred" ? "item active" : "item"}
            onClick={() => {
              setCurrentTab("starred");
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails.length}</span>
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
          {
            // filteredEmails contains all starred emails if in starred tab, and all emails if in inbox tab
            filteredEmails.map(
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
                        onChange={() => toggleRead(email)}
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
                )
            )
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
