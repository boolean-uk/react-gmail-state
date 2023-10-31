import { useState } from "react";
// code added import useState
import Header from "./components/header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  // Code added
  const [emails, setEmails] = useState(initialEmails);

  console.log(emails);

  function starredEmails() {
    const newE = [...emails].filter((e) => e.starred);

    setEmails(newE);
  }

  //You need to render a list of emails from state so it looks similar to the screenshot above.
  // Set state using the useState hook and the intialEmails variable provided for you.
  // You can find an HTML template for each email in the src/templates folder.

  // Add new email
  // eslint-disable-next-line no-unused-vars
  const addNewEmail = () => {
    const newEmail = {
      sender: "Zoom",
    };
    console.log("added new email", addNewEmail);
    const updatedEmails = [...emails, newEmail];

    setEmails(updatedEmails);
    console.log(updatedEmails, "updated ");
  };

  // Code added from above
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
            <span className="count">
              {emails.reduce((acc, e) => acc + !e.read, 0)}
            </span>
          </li>
          <li className="item" onClick={starredEmails}>
            <span className="label">Starred</span>
            <span className="count">
              {emails.reduce((acc, e) => acc + e.starred, 0)}
            </span>
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
        {emails.map((email) => {
          return (
            <li
              key={email.id}
              className={`email ${email.read ? "read" : "unread"}`}
            >
              <div className="select">
                <input className="select-checkbox" type="checkbox" />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
