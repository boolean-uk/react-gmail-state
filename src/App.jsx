import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getReadEmails = emails => emails.filter((email) => !email.read)
const getStarredEmails = emails => emails.filter((email) => email.starred)

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  let filteredEmails = emails

  if(hideRead){
    filteredEmails = getReadEmails(filteredEmails)
  }

  //updating the array to only include not read
  const toggleRead = (target) => {
    const updateEmails = (emails) =>
      emails.map( (email) => 
      email.id === target.id ? {...email, read: !email.read} : email)
    setEmails(updateEmails)
  }
  
  //updating the array to only include starred 
  const toggleStar = (target) => {
    const updateEmails = (emails) =>
      emails.map((email) => 
      email.id === target.id ? {...email, starred: !email.starred} : email)
    setEmails(updateEmails)
  }
  if (currentTab === 'starred') {
    filteredEmails = getStarredEmails(filteredEmails)
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{getReadEmails(emails).length}</span>
          </li>
          <li
            className="item"
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails(emails).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map((email, index) => 
          <li key={index} className={`email ${email.read ? "read" : "unread"}`}>
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
