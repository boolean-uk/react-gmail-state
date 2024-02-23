import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmailsToRender] = useState(initialEmails);

  const toggleRead = (emailToToggle) => {
    const updatedEmails = emails.map((email) =>
      email === emailToToggle ? { ...email, read: !email.read } : email
    );
    setEmailsToRender(updatedEmails);
  };

  const toggleStarred = (emailToToggle) => {
    const updatedEmails = emails.map((email) =>
      email === emailToToggle ? { ...email, starred: !email.starred } : email
    );
    setEmailsToRender(updatedEmails);
  };

  function uiClassName(email) {
    if (email.read) {
      return "email read";
    } else {
      return "email";
    }
  }

  function getStarredEmails() {
    const starredEmails = emails.filter(isEmailStarred);

    return starredEmails;
  }
  function isEmailStarred(email) {
    return email.starred === true;
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails().length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails here */}
        <ul>
          {emails.map((email) => (
            <li className={uiClassName(email)} key={email.id}>
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
                  onChange={() => toggleStarred(email)}
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
