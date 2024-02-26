import { useState } from 'react';

import Header from './components/Header'
// import emails from './data/emails';
import initialEmails from './data/emails'

import './styles/App.css'

const RenderEmails = (emails, setEmails) => {
  return (
    <main className="emails">
      {emails.map((email, index) => (
        <div key={index}>{RenderEmail(emails, setEmails, email)}</div>
      ))}
    </main>
  );
}

const RenderEmail = (emails, setEmails, email) => {
  return (
    <li className="email">
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onClick={() => ToggleRead(emails, setEmails, email)}
        />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onClick={() => ToggleStar(emails, setEmails, email)}
        />
      </div>
      <div className="sender">{email.sender}</div>
      <div className="title">{email.title}</div>
    </li>
  );
};

const ToggleRead = (emails, setEmails, email) => {
  const updatedEmails = emails.map(e => e.id === email.id ? {...e,read: !e.read} : e)
  setEmails(updatedEmails)
}

const ToggleStar = (emails, setEmails, email) => {
  const updatedEmails = emails.map(e => e.id === email.id ? {...e,starred: !e.starred} : e)
  setEmails(updatedEmails)
}

function App() {
  const [emails, setEmails] = useState(initialEmails)

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

      {RenderEmails(emails, setEmails)}
      
    </div>
  )
}

export default App
