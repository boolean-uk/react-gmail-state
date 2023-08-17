import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

import { useState } from "react";

function App() {
  const [emails, setEmails] = useState(initialEmails);

  const toggleStar = (emailtotoggle) => {
    console.log(emailtotoggle)
    const updated = emails.map((email) => {
      if(email.id !== emailtotoggle.id) {
        return email
      }
      return {...email, starred:!email.starred}

    })
    setEmails(updated)
  }

  const toggleRead = (emailtotoggle) => {
    console.log(emailtotoggle)
    const updated = emails.map((email) => {
      if(email.id !== emailtotoggle.id) {
        return email
      }
      return {...email, read:!email.read}
      // How to change background-color: grey; ?
    })
    setEmails(updated)
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
        {
          /* Render a list of emails here */
          <li>
            {emails.map((email) => 
              <li className="email">
                <div className="select">
                  <input className="select-checkbox" type="checkbox" checked={email.read} onChange={() => toggleRead(email)}/>
                </div>
                <div className="star">
                  <input className="star-checkbox" type="checkbox" checked={email.starred} onChange={() => toggleStar(email) }/>
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            )}
          </li>
        }
      </main>
    </div>
  );
}

export default App;
