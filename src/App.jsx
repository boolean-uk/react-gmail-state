import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";
import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [active, setActive] = useState("inbox");
  const [starred, setStarred] = useState(
    emails.filter((email) => email.starred)
  );

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${active === "inbox" ? "active" : ""}`}
            onClick={() => {
              setActive("inbox");
              setEmails(initialEmails);
            }}>
            <span className="label">Inbox</span>
            <span className="count">{initialEmails.length}</span>
          </li>
          <li
            className={`item ${active === "starred" ? "active" : ""}`}
            onClick={() => {
              setActive("starred");
              setEmails(starred);
            }}>
            <span className="label">Starred</span>
            <span className="count">{starred.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onClick={() => {
                setHideRead(!hideRead);
              }}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul className="email-list">
          {emails.map(
            (email) =>
              (hideRead && email.read === true) || (
                <li
                  key={email.id}
                  className={`email ${email.read ? "read" : "unread"}`}>
                  <div className="select">
                    <input
                      className="select-checkbox"
                      type="checkbox"
                      checked={email.read}
                      onClick={() => {
                        email.read = !email.read;
                        setEmails([...emails]);
                      }}
                    />
                  </div>
                  <div className="star">
                    <input
                      className="star-checkbox"
                      type="checkbox"
                      checked={email.starred}
                      onClick={() => {
                        email.starred = !email.starred;
                        setEmails([...emails]);
                        if (email.starred) {
                          setStarred([...starred, email]);
                        } else {
                          setStarred(
                            starred.filter((star) => star.id !== email.id)
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="sender">{email.sender}</div>
                  <div className="title">{email.title}</div>
                </li>
              )
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
