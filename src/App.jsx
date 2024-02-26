import { useState } from "react";

import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);
  const [allEmails, setAllEmails] = useState(initialEmails);

  const [boolUnread, setBoolUnread] = useState(false);
  const [activeItem, setActiveItem] = useState("inbox");

  const toggleStar = (id) => {
    const index = allEmails.findIndex((obj) => obj.id === id);
    const updatedEmails = [...allEmails];

    const updatedEmail = { ...updatedEmails[index] };
    updatedEmail.starred = !updatedEmail.starred;

    updatedEmails[index] = updatedEmail;

    setEmails(updatedEmails);
    setAllEmails(updatedEmails);
  };

  const toggleRead = (id) => {
    const index = allEmails.findIndex((obj) => obj.id === id);
    const updatedEmails = [...allEmails];

    const updatedEmail = { ...updatedEmails[index] };
    updatedEmail.read = !updatedEmail.read;

    updatedEmails[index] = updatedEmail;

    setEmails(updatedEmails);
    setAllEmails(updatedEmails);
  };

  const setEmailsAll = () => {
    setActiveItem("inbox");
    if (boolUnread) {
      setEmails(allEmails.filter((obj) => obj.read === false));
      return;
    }
    setEmails(allEmails);
  };

  const setEmailsUnread = () => {
    console.log(emails);
    setBoolUnread(!boolUnread);
    if (boolUnread) {
      if (activeItem === "inbox") {
        setEmails(allEmails);
      }
      if (activeItem === "starred") {
        setEmails(allEmails.filter((obj) => obj.starred === true))
      }
      return;
    }
    const unreadEmails = emails.filter((obj) => obj.read === false);
    setEmails(unreadEmails);
  };

  const setEmailsStarred = () => {
    setActiveItem("starred");
    const starredEmails = emails.filter((obj) => obj.starred === true);
    if (boolUnread) {
      setEmails(starredEmails.filter((obj) => obj.read === false));
      return;
    }
    setEmails(starredEmails);
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={activeItem === "inbox" ? "item active" : "item"}
            onClick={() => {
              setEmailsAll();
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">
              {allEmails.filter((obj) => obj.read === false).length}
            </span>
          </li>
          <li
            className={activeItem === "starred" ? "item active" : "item"}
            onClick={() => {
              setEmailsStarred();
            }}
          >
            <span className="label">Starred</span>
            <span className="count">
              {allEmails.filter((obj) => obj.starred === true).length}
            </span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={boolUnread}
              onChange={() => {
                setEmailsUnread();
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((email, index) => {
          return (
            <li
              key={index}
              className={email.read ? "email read" : "email unread"}
              onClick={() => toggleRead(email.id)}
            >
              <div className="select">
                <input className="select-checkbox" type="checkbox" />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  onChange={() => toggleStar(email.id)}
                  checked={email.starred}
                  onClick={(event) => event.stopPropagation()}
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
