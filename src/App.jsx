import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getUnReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")

  const starredEmails = emails.filter(email => email.starred)
  const unReadEmails = emails.filter(email => !email.read)

  const toggleRead = targetMail => {
    const updatedEmails = emails =>
    emails.map(email =>
      email.id === targetMail.id ? {...email, read: !email.read } : email
      )  
    setEmails(updatedEmails)  
  }

  const toggleStar = targetMail => {
    const updatedEmails = emails =>
    emails.map(email =>
      email.id === targetMail.id ? {...email, starred: !email.starred } : email
      )  
    setEmails(updatedEmails)  
  }

  let filteredEmails = emails

  if(hideRead) {
    filteredEmails = getUnReadEmails(filteredEmails)
  } 

  if(currentTab === "starred"){
    filteredEmails = getStarredEmails(filteredEmails)
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "all" ? "active" : ""}`}
            onClick={() => setCurrentTab("all")}
          >
            <span className="label">Inbox</span>
            <span className="count">{unReadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => {setHideRead(e.target.checked)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{filteredEmails.map((email, index) => (
        <li key={index} className= {`email ${email.read ? 'read': 'unread'}`}>
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={() => toggleRead(email)}/>
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => toggleStar(email)}
          />
          </div>
          <div  className ="sender">{email.sender}</div>
          <div  className= "title">{email.title}</div>
        </li>
      ))}</main>
    </div>
  )
}

export default App
