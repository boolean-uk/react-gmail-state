import Header from './components/Header'
import initialEmails from './data/emails'
import { useState, useEffect } from 'react'
import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)

  const toggleRead = (email) => {
    setEmails(emails.map((e) => 
      e === email ? {...e, read: !e.read} : e
    ))
  }

  const toggleStar = (email) => {
    setEmails(emails.map((e) => 
      e === email ? {...e, starred: !e.starred} : e
    ))
  }

  // Just to verify the changes to the actual state occurs
  useEffect(() => {
    console.log(emails)
  }, [emails])

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
            <span className="count">{emails.filter(email => !email.read).length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              readOnly
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map((email, index) => {
            return(
              <li key={index}>
                  <div className={email.read ? 'email read' : 'email unread'}>
                  <input className="read" type="checkbox" checked={email.read} onChange={() => toggleRead(email)}/>
                  <input className="star-checkbox" type="checkbox" checked={email.starred} onChange={() => toggleStar(email)}/>
                  <p>{email.sender}</p>
                  <p>{email.title}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
