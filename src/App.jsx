import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'
import { useEffect } from 'react';

function App() {
  // Arrays in state
  const [emails, setEmails] = useState(initialEmails)
  const [starred, setStarred] = useState([])
  const [current, setCurrent] = useState(emails)

  const [active, setActive] = useState('inbox')
  const [showRead, setShowRead] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')

  // Updating email in initialemails
  const handleReadToggle =  (target) => {
    const updatedEmails = emails.map(function(email) {
      if (email === target) {
        return {...email, read: !email.read}
      }
      return email
    })
    setEmails([...updatedEmails])
  }

  // Updating email in initialemails
  const handleStarToggle = (target) => {
    const updatedEmails = emails.map(function(email) {
      if (email === target) {
        return {...email, starred: !email.starred}
      }
      return email
    })
    setEmails([...updatedEmails])
  }

  useEffect(() => {
    setStarred([...emails.filter(e => e.starred === true)])
  }, [emails])

  // Setting current based on state on active and showread if showread
  useEffect(() => {
    setCurrent(showRead ? current.filter(e => e.read === false) : active === 'inbox' ? emails : starred )
  }, [emails, showRead, active]);

  // Setting current based on state active when showread is false 
  const changeActive = (option) => {
    setActive(option)
    if (option === 'inbox'){
      setCurrent([...emails])
    } else if (option === 'starred'){
      setCurrent([...starred])
    }
  } 

  const handleShowRead = () => {
    setShowRead(!showRead)
  } 

  const renderEmail = (email, index) => {
    return (
      <li key={index} className={email.read ? "email read" : "email unread"}>
        <div className="select">
        <input
          onClick={() => handleReadToggle(email)}
          className="select-checkbox"
          type="checkbox"
          defaultChecked={email.read}
          />
        </div>
        <div className="star">
        <input
          onClick={() => handleStarToggle(email)}
          className="star-checkbox"
          type="checkbox"
          defaultChecked={email.starred}
        />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
        </li>
    )
  }

  const handleSearch = (query) => {
    if (query === ''){
      setSearchQuery('')
    }
    setSearchQuery(query)
  }

  return (
    <div className="app">
      <Header handleSearch={handleSearch} />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={active === 'inbox' ? "item active" : "item"}
            onClick={() => changeActive('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={active === 'starred' ? "item active" : "item"}
            onClick={() => changeActive('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starred.length}</span>
          </li>

          <li className="item toggle" >
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              defaultChecked={false}
              onChange={handleShowRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {active === 'inbox' ? current.map((email, index) => (
          renderEmail(email, index)
        )) : active === 'starred' ? current.map((email, index) => (
          renderEmail(email, index)
        )) : showRead && current.map((email, index) => (
          renderEmail(email, index)
        ))
        }
      </main>
    </div>
  )
}

export default App
