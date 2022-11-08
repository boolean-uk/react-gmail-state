import Header from './components/header'
import { useState } from 'react'
import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  const [emails, setEmail] = useState(initialEmails)
  // const [starred, setStarred] = useState()
  // const addEmail = (event) => {
  //   event.preventDefault()
  //   // console.log("event", event)
  //   console.log(initialEmails)
  //   const newMail = event.target[0]
  //   // const country = event.target[1]
  //   // const country = event.t
  //   // TODO update cities
  //   setEmail([
  //     ...emails,
  //     { name: newMail.value, id: id.value, starred: false },
  //   ])
  // }
  const toggleStar = (event) => {
    console.log("target", event)
    const newStar = emails.map(email => email === event ? {...email, starred: !email.starred} : email)
    setEmail(newStar)
  }
  const toggleRead = (event) => {
    console.log("read", event)
    const newRead = emails.map(email => email === email ? {...email, read: true} : email)
    setEmail(newRead)
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
