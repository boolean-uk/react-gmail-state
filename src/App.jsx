import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [inboxCount, setInboxCount] = useState(emails.filter(e => e.read === false).length)

  function getUnreadEmailCount(emailData) {
    return emailData.filter(email => email.read == false).length;
  }
  function getStarredEmailCount(emailData) {
    return emailData.filter(email => email.starred == true).length;
  }
  
  function toggleStarred(target) {
    let modifiedEmails = [...emails]
    let newEmail = modifiedEmails.find(x => x.id == target.id)
    newEmail.starred = !newEmail.starred

    setEmails(modifiedEmails)
  }
  function toggleRead(target) {
    let modifiedEmails = [...emails]
    let newEmail = modifiedEmails.find(x => x.id == target.id)
    newEmail.read = !newEmail.read

    setEmails(modifiedEmails)
    setInboxCount(emails.filter(e => e.read === false).length)

    console.log(emails)
  }

  function emptyFunc() {
    console.log("what")
  }

  function emailFilter(email){
    if(hideRead) return email.read == false

    return true
  }

  function getEmailItems(){
    return (
      emails.filter(e => emailFilter(e) == true)
        .map((email, index) => emailItem(email, index))
    )
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
            <span className="count">{inboxCount}</span>
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
              checked={hideRead}
              onChange={() => setHideRead(hideRead ? false : true)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{getEmailItems()}</main>
    </div>
  )
  console.log(emails)
}

export default App
