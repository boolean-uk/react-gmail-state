import React, { useState } from 'react';
import Header from './components/header';
import initialEmails from './data/emails';
import './styles/app.css';

function App() {
  // Use initialEmails for state
  const [emails] = useState(initialEmails);


  return (
 <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">3</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => {
                // Handle checkbox change here
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails here */}
        <ul>{
          emails.map((email, key) =>
            <li className={`email ${email.read ? "read" : "unread"}`}>
              <div className="select">
                <input className="select-checkbox" type="checkbox"/>
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox"/>
              </div>
              <div className="sender">
                {email.sender}
              </div>
              <div className="title">
                {email.title}
              </div>
            </li>
          )
        }</ul>
      </main>
    </div>
  );
}

export default App;

