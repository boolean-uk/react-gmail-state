import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);

  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("Inbox");

  const starredMail = () =>
    emails.filter((email) => {
      return email.starred === true;
    });

  function updateRead(mailToUpdate) {
    const updatedEmails = emails.map((email) => {
      if (mailToUpdate.id === email.id) {
        return { ...email, read: !email.read };
      } else {
        return email;
      }
    });
    setEmails(updatedEmails);
  }

  function updateStarred(mailToUpdate) {
    const updatedEmails = emails.map((email) => {
      if (mailToUpdate.id === email.id) {
        return { ...email, starred: !email.starred };
      } else {
        return email;
      }
    });
    setEmails(updatedEmails);
  }

  function getEmails() {
    let emailsToRender = emails;
    if (hideRead) {
      emailsToRender = emailsToRender.filter((email) => email.read === false);
    }

    if (currentTab === "Starred") {
      console.log("currentTab", currentTab, currentTab === "Starred");
      emailsToRender = emailsToRender.filter((email) => {
        console.log(email.starred);
        return email.starred;
      });
    }
    return emailsToRender;
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={"item " + (currentTab === "Inbox" ? "active" : "")}
            onClick={() => {
              setCurrentTab("Inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={"item " + (currentTab === "Starred" ? "active" : "")}
            onClick={() => {
              setCurrentTab("Starred");
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredMail().length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {getEmails().map((email) => {
          return (
            <div
              key={email.id}
              className={"email " + (email.read ? "read" : "unread")}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => updateRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => updateStarred(email)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
