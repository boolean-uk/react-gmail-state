import Header from './components/header'
import { useState } from 'react'
import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  // creating state for emails
  const [emails, setEmail] = useState(initialEmails)
  //toggleStar function
  const toggleStar = (value) => {
    console.log("value", value)
    const starredOrNot = emails.map(email => email === value ? {...email, starred: !email.starred} : email)
    setEmail(starredOrNot)
  }
  const toggleRead = (email) => {
    console.log("read", email)
    const readOrNot = emails.map(email => email === email ? {...email, read: !email.read} : email)
    setEmail(readOrNot)
  }
  // Use initialEmails for state

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
            <span className="count">?</span>
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
      <main className="emails">{ emails.map((email)=>{
        return (
          <li className="email" key={email.id}>
            <div className="select">
            <input onClick={()=>{toggleRead(email)}}
              className="select-checkbox"
              type="checkbox"/>
            </div>
            <div className="star">
            <input onClick={()=>{toggleStar(email)}}
              className="star-checkbox"
              type="checkbox"
            />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        )
      })}</main>
    </div>
  )
}

export default App
