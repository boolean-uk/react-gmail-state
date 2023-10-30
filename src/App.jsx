import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  console.log(emails)

  const isStarred= () => emails.filter(email => email.starred)
  const isRead = () => emails.filter(email => email.read)

  const toggleRead = (email) => {
    email.read = !email.read

    setEmails([...emails])
  }

  const toggleStar = (email) => {
    email.starred = !email.starred

    setEmails([...emails])
  }

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
            <span className="count">{isRead().length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{isStarred().length}</span>
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
        <ul>{emails.map(email =>
         <li className="email">
          <div className="select">
          <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onChange={e => toggleRead(email)}
          />
          </div>

          <div className="star">
          <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onChange={e => toggleStar(email)}
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
