import Header from "./components/header";
import initialEmails from "./data/emails";

import { useState } from "react";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideReadEmails, setHideReadEmails] = useState(true);
  const [activeBox, setActiveBox] = useState("item-inbox");

  const starredEmails = emails.filter((email) => email.starred);
  const unreadEmails = emails.filter((email) => !email.read);

  function toggleRead(email) {
    const changedEmails = emails.map((curEmail) => {
      if (email === curEmail) {
        curEmail.read = !curEmail.read;
      }
      return curEmail;
    });

    setEmails(changedEmails);
  }

  function toggleFavourite(email) {
    const changedEmails = emails.map((curEmail) => {
      if (email === curEmail) {
        curEmail.starred = !curEmail.starred;
      }
      return curEmail;
    });

    setEmails(changedEmails);
  }

  function toggleReadEmails(event) {
    setHideReadEmails(event.target.checked);
  }

  function toggleActiveBox(event) {
    const classList = event.target.classList;
    setActiveBox(classList[0]);
  }

  const renderEmails = emails.filter((email) => {
    if ((hideReadEmails && email.read) || (activeBox === "item-starred" && !email.starred)) {
      return false;
    }

    return true;
  });

  function generateBoxClass() {
    const classes = ["item-inbox", "item-starred"];
    return classes.map((cls) => (activeBox === cls ? cls + " active item" : cls + " item"));
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className={generateBoxClass()[0]} onClick={toggleActiveBox}>
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li className={generateBoxClass()[1]} onClick={toggleActiveBox}>
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadEmails}
              onChange={toggleReadEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {renderEmails.map((email) => {
            const readClassName = email.read ? "read" : "unread";
            return (
              <li className={`email ${readClassName}`} key={email.id}>
                <div className="select">
                  <input
                    type="checkbox"
                    className="select-checkbox"
                    onChange={() => toggleRead(email)}
                    checked={email.read}
                  />
                </div>
                <div className="star">
                  <input
                    type="checkbox"
                    className="star-checkbox"
                    checked={email.starred}
                    onChange={() => toggleFavourite(email)}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
