import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  // const [hideRead, setHideRead] = useState(false)
  
  const toggleRead = (email) => {
    setEmails(emails.map((eachEmail) => eachEmail === email ? {...eachEmail, read: !eachEmail.read} : eachEmail))
  }

  const toggleStar = (email) => {
    const updatedEmail = emails.map((eachEmail) => eachEmail === email ? {...eachEmail, starred: !eachEmail.starred} : eachEmail )
    setEmails(updatedEmail)
  }

  const getUnReadEmails = emails.filter(email => !email.read)
  const getStarredEmails = emails.filter(email => email.starred)

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
            <span className="count">{getUnReadEmails.length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={(e) => {console.log(e.target.checked)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((email, id) => (
          <li key={id} className={`email ${email.read ? 'read' : 'unread'}`}>
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            // checked={email.read}
            onChange={() => toggleRead(email)}/>
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            onChange={() => toggleStar(email)}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
          
        </li>
        
        ))}
      </main>
    </div>
  )
}

export default App
