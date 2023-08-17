import React, {useState} from 'react'

import Header from './components/header'
import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  // count unread emails
  let unreadCounter = 0
  let starredCounter = 0
  
  for (let index = 0; index < emails.length; index++) {
      if (!emails[index].read) {
          unreadCounter++
      }
  //count starred emails
      if (emails[index].starred) {
          starredCounter++
      }
  }
  //create toggleRead
  const toggleRead = (id) => {
    const updatedEmail = emails.map(email => {
        if (email.id === id) {
            return { ...email, read: !email.read }
        }
        return email
    })
    setEmails(updatedEmail)
  }
  //create toggleStar
  const toggleStar = (id) => {
    const updatedEmail = emails.map(email => {
      if (email.id === id) {
        return { ...email, starred: !email.starred}
      }
      return email
    })
    setEmails(updatedEmail)
  }
  //-------------------Not used anymore because getFiltered is better-----------
  //create new use state for hide read to check hide read is checked or not
  const [hideRead, setHideRead] = useState(false)
  // function for filtering emails before they are rendered


  // new use state for switching tabs
  const [activeTab, setTab] = useState('Inbox')
  // function for switching tabs
  function getFiltered(list) {
    if (hideRead) {
      list = list.filter(email => !email.read)
    }
    if (activeTab === 'starred') {
      list = list.filter(email => email.starred)
    }
    return list
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className= {activeTab === 'inbox' ? "item active" : "item"} onClick={() => setTab('inbox')}
            // did the change
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCounter}</span>
          </li>
          <li
            className={activeTab === 'starred' ? "item active" : "item" } onClick={() => setTab('starred')}
            // did the change}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCounter}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Evanesco</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
              // did the change
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        getFiltered(emails).map( email => 
          (
            //is it oke to use ternary operation on this or do you prefer I write the if else?
          <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
            <div className="select">
              <input className="select-checkbox" type="checkbox" checked={email.read} onClick={() => toggleRead(email.id)}/>
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox" checked ={email.starred} onChange={() => toggleStar(email.id)}/>

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
