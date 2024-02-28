import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'


function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setTab] = useState('inbox')

  let filteredEmails = emails;
  
  const toggleRead = (clickedEmail) => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === clickedEmail.id ? { ...email, read: !email.read } : email
      )
      setEmails(updatedEmails)
  }

  const toggleStar = (clickedEmail) =>{
    const updatedEmails = emails =>
    emails.map(email =>
      email.id === clickedEmail.id ? { ...email, starred: !email.starred } : email
    )
    setEmails(updatedEmails);
  }

  if(hideRead){
    filteredEmails = (emails.filter(e => !e.read))
  }
  if(currentTab === 'starred'){
    filteredEmails = (filteredEmails.filter(e => e.starred))
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {setTab('inbox')}}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter(e=>!e.read).length}</span>
          </li>
          <li
            className="item"
            onClick={() => {setTab('starred') }}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(e=>e.starred).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {setHideRead(!hideRead)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails"><ul>
       {filteredEmails.map((email) => (
        <li key={email.id} id={email.id} className={`email ${email.read ? 'read' : 'unread'}`}
        >
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
        <div className="title" >{email.title}</div>
      </li>
      
        ))}
            </ul></main>
    </div>
  )
}

export default App
