import React, {useState} from 'react'

import Header from './components/header'
import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  // Use initialEmails for state
  const [emails] = useState(initialEmails)
  // count unread emails
  let unreadCounter = 0
  let starredCounter = 0
  
  for (let index = 0; index < emails.length; index++) {
      if (!emails[index].read) {
          unreadCounter++
      }
  
      if (emails[index].starred) {
          starredCounter++
      }
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
            <span className="count">{unreadCounter}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCounter}</span>
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
      <main className="emails">{
        emails.map( email => 
          (
            //is it oke to use ternary operation on this or do you prefer I write the if else?
          <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
            <div className="select">
              <input className="select-checkbox" type="checkbox"/>
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox" checked ={email.starred}/>
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
                </li>
          )

        )
      }
      </main>
    </div>
  )
}

export default App
