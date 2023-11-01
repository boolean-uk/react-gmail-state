import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const starredEmail = () => emails.filter(email => email.starred);
  const readEmail = () => emails.filter(email => email.read);

  const toggleRead = (email) => {
    email.read = !email.read

    setEmails([...emails])
  };

  const toggleStar = (email) => {
    email.starred = !email.starred

    setEmails([...emails])
  };

  let filteredEmails = emails;
  if (hideRead) filteredEmails = readEmail();

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
            <span className="count">{readEmail().length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
            <span className="count">{starredEmail().length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}</main>
      <main className="emails">
        <ul>{filteredEmails.map(email =>
         <li key={email.id} className={`email ${email.read ? "read" : "unread"}`}>
          <div className="select">
          <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onChange={() => toggleRead(email)}
          />
          </div>

          <div className="star">
          <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onChange={() => toggleStar(email)}
          />
          </div>

          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
         </li>
         )}
        </ul>
      </main>
    </div>
  )
}
export default App