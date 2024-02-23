import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";
import "./styles/App.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [currentTab, setCurrentTab] = useState("inbox");
  const [hideRead, setHideRead] = useState(false); // State for Hide Read checkbox

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

  const getStarredEmails = (emails) => {
    return emails.filter((email) => email.starred);
  };

  const getReadEmails = (emails) => {
    return emails.filter((email) => email.read);
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleHideReadChange = () => {
    setHideRead(!hideRead);
  };

  const unreadCount = emails.reduce((count, email) => {
    return count + (email.read ? 0 : 1);
  }, 0);

  const starredCount = getStarredEmails(emails).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "inbox" ? "active" : ""}`}
            onClick={() => handleTabClick("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => handleTabClick("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={handleHideReadChange}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails based on the current tab */}
        <ul className="email-list">
          {(currentTab === "inbox"
            ? hideRead
              ? emails.filter((email) => !email.read)
              : emails
            : getStarredEmails(emails)
          ).map((email, index) => (
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
