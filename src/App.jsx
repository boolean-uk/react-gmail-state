import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";
import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  // Use initialEmails for state
  console.log(initialEmails);

  const toggleRead = (index) => {
    const updatedEmails = [...emails];
    updatedEmails[index].read = !updatedEmails[index].read;
    setEmails(updatedEmails);
  };

  const toggleStar = (index) => {
    const updatedEmails = [...emails];
    updatedEmails[index].starred = !updatedEmails[index].starred;
    setEmails(updatedEmails);
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
            <span className="count">{emails.length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">0</span>
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
        <ul className="email-list">
          {emails.map((email, index) => (
            <li
              className={`email ${email.read ? "read" : "unread"}`}
              key={index}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  onChange={() => toggleRead(index)}
                  checked={email.read} // Reflect read status
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  onChange={() => toggleStar(index)} // Toggle star status
                  checked={email.starred} // Reflect star status
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
