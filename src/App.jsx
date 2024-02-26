import { useState } from 'react'

import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const getReadEmails = emails => emails.filter(email => !email.read)
  const getStarredEmails = emails => emails.filter(email => email.starred)
  
  function toggleStar(email) {
    const updatedEmails = emails =>
      emails.map(em => 
        em.id === email.id ? {...em, starred: !em.starred } : em
      )
    setEmails(updatedEmails)
  }

  function toggleRead(email) {
    const updatedEmails = emails =>
      emails.map(em =>
        em.id === email.id ? {...em, read: !em.read } : em
      )
    setEmails(updatedEmails)
  }

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)
  let filteredEmails = emails

  if (currentTab === 'starred') filteredEmails = getStarredEmails(filteredEmails)
  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => {setCurrentTab('inbox')}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => {setCurrentTab('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label className="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
        <ul>
          {filteredEmails.map((email, index) => (
            <li key={index} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className='select'>
                <input className='select-checkbox' checked={email.read} onChange={() => {toggleRead(email)}} type='checkbox'/>
              </div>
              <div className='star'>
                <input className='star-checkbox' checked={email.starred} onChange={() => {toggleStar(email)}} type='checkbox'/>
              </div>
              <div className='sender'>{email.sender}</div>
              <div className='title'>{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
