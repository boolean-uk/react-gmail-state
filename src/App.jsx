import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  //console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)

  const toggleRead = (target) => {
    const updatedEmails = emails.map(email => 
      email === target ? { ...email, read: !email.read} : email
    )
    console.log(updatedEmails)
    setEmails(updatedEmails)
  }

  const toggleStarred = (target) => {
    const updatedEmails = emails.map(email => 
      email === target ? { ...email, starred: !email.starred} : email
    )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  const listItems = filteredEmails.map(email => 
      <li className={'email'+(email.read ? " read" : " unread")} key={email.id}>
        <div className='select'>
          <input className='select-checkbox' type='checkbox' onChange={() => toggleRead(email)}/>
        </div>
        <div className='star'>
          <input className='star-checkbox' type='checkbox' onChange={() => toggleStarred(email)} checked={email.starred}/>
        </div>
        <div className='sender'>{email.sender}</div>
        <div className='title'>{email.title}</div>
      </li>
  ) 
  

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
              onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
        {listItems}
      </main>
    </div>
  )
}

export default App
