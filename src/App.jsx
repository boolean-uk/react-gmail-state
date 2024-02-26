import { useState } from "react"
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)
  // Use initialEmails for state

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)


  const toggleRead = (email) => {
    const updatedEmails = emails.map(e =>
      e === email ? { ...e, read: !e.read } : e
      )
      
      setEmails(updatedEmails)
    console.log("completeWorkout:", email)
  }

  const toggleStar = (email) => {
    const updatedEmails = emails.map(e =>
      e === email ? { ...e, starred: !e.starred } : e
      )
      
      setEmails(updatedEmails)
    console.log("completeWorkout:", email)
  }



  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
      {filteredEmails.map((email, index) => (
          <li 
          key ={email.id}
          className={`email ${email.read ? 'read' : 'unread'}`}  
          >
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
              onClick={e=>toggleRead(email)}
            />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onClick={e=>toggleStar(email)}
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
