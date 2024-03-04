import React, { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";
import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

  const toggleEmailProperty = (id, property) => {
    setEmails(emails.map(email =>
      email.id === id ? { ...email, [property]: !email[property] } : email
    ));
  };

  const toggleStar = (id) => {
    toggleEmailProperty(id, "starred");
  };

  const toggleRead = (id) => {
    toggleEmailProperty(id, "read");
  };

  const getFilteredEmails = () => {
    let filteredEmails = [...emails];
    if (hideRead) filteredEmails = filteredEmails.filter(email => !email.read);
    if (currentTab === "starred") filteredEmails = filteredEmails.filter(email => email.starred);
    return filteredEmails;
  };

  const filteredEmails = getFilteredEmails();
  const unreadEmailsCount = emails.filter(email => !email.read).length;
  const starredEmailsCount = emails.filter(email => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className={`item ${currentTab === 'inbox' ? 'active' : ''}`} onClick={() => setCurrentTab('inbox')}>
            <span className="label">Inbox</span>
            <span className="count">{unreadEmailsCount}</span>
          </li>
          <li className={`item ${currentTab === 'starred' ? 'active' : ''}`} onClick={() => setCurrentTab('starred')}>
            <span className="label">Starred</span>
            <span className="count">{starredEmailsCount}</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>

      <main className="emails">
        {filteredEmails.map(email => (
          <li key={email.id} className={`email ${email.read ? "read" : "unread"}`}>
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
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
