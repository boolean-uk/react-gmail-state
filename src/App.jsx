import Header from './components/header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'


function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [emailStarred, setEmailStarred] = useState()
  const [emailRead, setEmailRead] = useState()
  

  const hideRead = emailRead ? emails.filter(email => email.read === true) : emails;
  const emailsStarred = emailStarred ? emails.filter(mail => mail.starred === true) : emails;


  const toggleStarred = (toggleStarredEmail) => {
    console.log(toggleStarredEmail)
    const updatedEmails = emails.map((mappedEmail) => {
      if (mappedEmail === toggleStarredEmail) {
        console.log(emails)
        return {
          ...toggleStarredEmail,
          read: !toggleStarredEmail.read
        }
        
      } else {
        return mappedEmail
      }
    }
    )
    emailStarred(updatedEmails)
  }


  const toggleRead = (toggledEmail) => {
    console.log(toggledEmail)
    const updatedEmails = emails.map((mappedEmail) => {
      if (mappedEmail === toggledEmail) {
        console.log(emails)
        return {
          ...toggledEmail,
          read: !toggledEmail.read
        }
        
      } else {
        return mappedEmail
      }
    }
    )
    setEmails(updatedEmails)
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
            <span className="count">{emails.length}</span>
          </li>
          <li
            className="item"
          // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
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
        {emails.map((email, index) => (
          <li key={index} className="email">
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={email.read}
                onChange={()=> toggleRead(email)} />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
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
