import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  //console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

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

  const starredCount = emails.filter(email => email.starred).length
  const unreadCount = emails.filter(email => !email.read).length


  let filteredEmails = emails

  if(hideRead) filteredEmails = emails.filter(email => !email.read)
  if(currentTab === 'starred') filteredEmails = filteredEmails.filter(email => email.starred)
  
  


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
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => {setCurrentTab()}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => {setCurrentTab('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>

          <li className="item toggle">
            <label form="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => {setHideRead(e.target.checked)}}
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
