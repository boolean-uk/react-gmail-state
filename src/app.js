import Header from './components/header'

import initialEmails from './data/emails'
import { useEffect, useState } from 'react'

import './styles/app.css'

function App() {
  // Use initialEmails for state

  const [emails, setEmails] = useState(initialEmails)
  const [totalEmails, setTotalEmails] = useState([])

  useEffect(() => {
    setTotalEmails(emails);
  }, [emails]);

  const ReadEmails = (event, emailId) => {
    const isChecked = event.target.checked;
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, read: isChecked } : email
    );
    setEmails(updatedEmails);
  };

  const StarredEmails = (event, emailId) => {
    const isChecked = event.target.checked;
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, starred: isChecked } : email
    );
    setEmails(updatedEmails);
  };

  const reads = totalEmails.filter(email => email.read === true)
  const stars = totalEmails.filter(email => email.starred === true)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => }
          >
            <span className="label">Inbox</span>
            <span className="count">{reads.length}</span>
          </li>
          <li
            className="item"
            // onClick={() => }
          >
            <span className="label">Starred</span>
            <span className="count">{stars.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        emails.map((email) => (
        <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            onChange={(event) => ReadEmails(event, email.id)}/>
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            onChange={(event) => StarredEmails(event, email.id)}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>))
      }</main>
    </div>
  )
}

export default App
