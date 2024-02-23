import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";
import "./styles/App.css";

function App() {
  // Add state to hold all emails, it should use initialEmails
  const [emails, setEmails] = useState(initialEmails);

  const toggleRead = (thisEmail) => {
    // Descripton: Recieve email and set set it's read status to the opposite
    // Input: email
    // create new array to store emails
    const changedEmails = emails.map(function (email) {
      // iterate through emails state to find input-email
      if (email === thisEmail) {
        // update its read status
        return {
          ...emails,
          sender: email.sender,
          title: email.title,
          starred: email.starred,
          read: !email.read,
        };
      }
      return email;
    });
    // put new array into setEmails
    setEmails(changedEmails);
  };

  const toggleStar = (thisEmail) => {
    // Descripton: Recieve email and set set it's starred status to the oposite
    // Input: email
    // create new array to store emails
    const changedEmails = emails.map(function (email) {
      // iterate through emails state to find input-email
      if (email === thisEmail) {
        // update its starred status
        return {
          ...emails,
          sender: email.sender,
          title: email.title,
          starred: !email.starred,
          read: email.read,
        };
      }
      return email;
    });

    // put new array into setEmails
    setEmails(changedEmails);
  };
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
            <label htmlFor="hide-read">Hide read</label>
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
          {/*Loop through emails and print them*/}
          {emails.map((email, index) => (
            <li
              className={`email ${email.read ? "read" : "unread"}`}
              key={index}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
                <label htmlFor="select-checkbox">{email.read}</label>
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
                />
                <label htmlFor="star-checkbox">{email.starred}</label>
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
