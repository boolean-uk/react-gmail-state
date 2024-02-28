import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleStar = targetEmail => {
    setEmails(emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, starred: !email.starred } : email))
  }

  const toggleRead = targetEmail => {
    setEmails(emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    );
  };

  const handleCheckbox = (e) => {
    setHideRead(e.target.checked);
    console.log(hideRead)
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
            <span className="count">{getStarredEmails(emails).length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={handleCheckbox}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails
        .filter(email => !email.read || !hideRead)
        .map((email, index) => (
          /* Render a list of emails here */
          <li key={index} className="email">
            <div className="star">
              <input 
              className="star-checkbox" 
              type="checkbox" 
              checked={email.starred}
              onClick={() => toggleStar(email)}
              />
            </div>
            <div className="select">
              <input 
              className="select-checkbox" 
              type="checkbox" 
              checked={email.read}
              onClick={() => toggleRead(email)}
              />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
