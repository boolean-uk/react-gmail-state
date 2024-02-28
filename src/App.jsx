import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)

  function getUnreadEmailCount(emailData) {
    return emailData.filter(email => email.read == false).length;
  }
  
  function getStarredEmailCount(emailData) {
    return emailData.filter(email => email.starred == true).length;
  }
  
  function getEmailItems(){
    return emails.map((email, index) => emailItem(email, index))
  }
  
  function toggleStarred(target) {
    const updatedEmails = emails.map( email => email.id === target.id ? {...email, starred: !email.starred} : email
      )
    setEmails(updatedEmails)
  }
  function toggleRead(target) {
    const updatedEmails = emails.map( email => email.id === target.id ? {...email, read: !email.read} : email
      )
    setEmails(updatedEmails)
  }

  function emptyFunc() {
    console.log("what")
  }
  
  function isStarred(id) {
    return emails.find(x => x.id == id).starred
  }
  
  function emailItem(emailData, index) {
    const ClassName = `email ${emailData.read ? 'read' : 'unread'}`
  
    return (
      <li key={index} className={ClassName}>
        <div className="select">
  	      <input className="select-checkbox" 
          type="checkbox"
          checked={emailData.read}
          onChange={() => toggleRead(emailData)}
          />
        </div>
        <div className="star">
  	      <input className="star-checkbox" 
          type="checkbox" 
          checked={emailData.starred} 
          onChange={() => toggleStarred(emailData)}
          />
        </div>
        <div className="sender">{emailData.sender}</div>
        <div className="title">{emailData.title}</div>
      </li>
    )
  }


  // Use initialEmails for state

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => emptyFunc()}
          >
            <span className="label">Inbox</span>
            <span className="count">{getUnreadEmailCount(initialEmails)}</span>
          </li>
          <li
            className="item"
            onClick={() => emptyFunc()}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmailCount(initialEmails)}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => emptyFunc()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{getEmailItems()}</main>
    </div>
  )
}


export default App
