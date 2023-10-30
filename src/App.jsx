import Header from "./components/header";
import initialEmails from "./data/emails";

import { useState } from "react";

import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  console.log('email', emails[0])

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
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
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
        <ul>{emails.map((email) => {
          return (
            <li className="email" key={email.id}>
              <div className="select">
              <input type="checkbox" className="select-checkbox" />
              </div>
              <div className="star">
                <input type="checkbox" className="star-checkbox" checked={email.starred} />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          )
        })}</ul>
      </main>
    </div>
  );
}

export default App;
