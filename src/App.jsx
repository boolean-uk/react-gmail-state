import React, { useState } from 'react';
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

const getReadEmails = emails => emails.filter(email => !email.read) //extension 2
const getStarredEmails = emails => emails.filter(email => email.starred) //extension3


function App() {
  // Use initialEmails for state

  /*useState is called with one argument, which is the initial state value. 
  In this case, initialEmails is passed as the initial state value.
  This means that when the component is first rendered, 
  emails will be initialized with the value of initialEmails.*/
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  console.log(initialEmails)

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  const toggleRead = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? {...email, read: !email.read } :email
      );
      setEmails(updatedEmails)

  };

  const toggleStar = (id) => {
    const updatedEmails = emails.map(email => 
      email.id === id ? {...email, starred: !email.starred } : email
      );
      setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
  filteredEmails = getStarredEmails(filteredEmails)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails here */}
        <ul>
        {filteredEmails.map((email, index) => (
          <li className={`email ${email.read ? 'read' : 'unread'}`} key={index}>
            <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked= {email.read}
              onChange ={() => toggleRead (email.id)}/>
            </div>
            <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred} 
              onChange={() => toggleStar(email.id)}
            />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>))}
        </ul>
      </main>
      
    </div>
  )
}

export default App
