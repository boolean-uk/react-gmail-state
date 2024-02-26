import Header from './components/Header'
import initialEmails from './data/emails'
import { useState, useEffect } from 'react'
import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [filteredEmails, setFilteredEmails] = useState(emails)
  const [hideRead, setHideRead] = useState(false)

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

  useEffect(() => {
    let filteredEmails = emails

    if (hideRead) {
      filteredEmails = filteredEmails.filter(e => e.read !== hideRead)
    }  

    setFilteredEmails(filteredEmails)
  }, [emails, hideRead])

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
              checked={hideRead}
              readOnly
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map((email, index) => 
              <li key={index}>
                  <div className={email.read ? 'email read' : 'email unread'}>
                  <input 
                    className="read" 
                    type="checkbox" 
                    checked={email.read} 
                    onChange={() => toggleRead(email)}
                  />
                  <input 
                    className="star-checkbox" 
                    type="checkbox" 
                    checked={email.starred} 
                    onChange={() => toggleStar(email)}
                  />
                  <p>{email.sender}</p>
                  <p>{email.title}</p>
                </div>
              </li>
            )
          }
        </ul>
      </main>
    </div>
  )
}

export default App
