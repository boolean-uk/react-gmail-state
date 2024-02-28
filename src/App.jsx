import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [showRead, setShowRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

  const toggleShowRead = () => {
    setShowRead(!showRead);
  };

  const filteredByReadEmails = showRead
    ? emails.filter((email) => email.read)
    : emails;

  const filteredEmails =
    currentTab === "starred"
      ? filteredByReadEmails.filter((email) => email.starred)
      : filteredByReadEmails;

  const toggleRead = (target) => {
    const updatedEmails = emails.map((e) =>
      e === target ? { ...e, read: !e.read } : e
    );
    setEmails(updatedEmails);
  };

  const toggleStar = (target) => {
    const updatedEmails = emails.map((e) =>
      e === target ? { ...e, starred: !e.starred } : e
    );
    setEmails(updatedEmails);
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
            <span className="count">
              {emails.filter((email) => email.read).length}
            </span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter((email) => email.starred).length}
            </span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              defaultChecked={false}
              onChange={toggleShowRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map((email, index) => (
            <li className="email" key={index}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={!email.read}
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
              <div className="title">
                {email.read ? <>{email.title}</> : <b>{email.title}</b>}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
