import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'



// This sort of works but, and I'm not sure why, we need to double click on 'inbox' or 'starred' for the changes to be rendered. 
//Furthermore, it is at first seemingly impossible to toggle an email's starred or read status
// In fact, it does sort of work, but this only becomes apparent once we have clicked on inbox, starred or hide reads (after having selected or unselected said email).
// Basically, it feels as if the individual functions do their job properly, but it is their interactions and the order of which they are executed with is the issue. 
// I'm not quite sure how to sort this out. Since we're now out of hours, I'm dropping this here as a comment. 

function App() {


  const [emails, setEmails] = useState(initialEmails)
  const [unreadEmails, setUnreadEmails] = useState([])
  const [hideRead, setHideRead] = useState(false)
  const [display, setDisplay] = useState(emails)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [starredCount, setStarredCount] = useState(0)
  const [starredEmails, setStarredEmails] = useState([])
  const [inboxCount, setInboxCount] = useState(emails.length)

  

  const setEmailClassName = (email) => {
    if(email.read === true) {
      return "email read"
    } else {
      return "email unread"
    }
  }

  const setInboxClassName = () => {
    if (currentTab === 'inbox') {
      return 'item active'
    } else {
      return 'item'
    }
  }

  const setStarredClassName = () => {
    if (currentTab === 'starred') {
      return 'item active'
    } else {
      return 'item'
    }
  }


  const toggleRead = email => {
    const updatedEmails = emails.map(
      em => em === email ? {...em, read: !em.read}: em
    )
    setEmails(updatedEmails)
  }

  const toggleStarred = email => {
    const updatedEmails = emails.map(
      em => em === email ? {...em, starred: !em.starred}: em
    )
    setEmails(updatedEmails)
  }

  const filterOutReadEmails = () => {
      const currentUnread = emails.filter(em => em.read === false)
      setUnreadEmails(currentUnread)
  }


  const filterStarredEmails = () => {
    const currentStarredEmails = emails.filter(em => em.starred === true)
    setStarredEmails(currentStarredEmails)
    setStarredCount(currentStarredEmails.length)
}


  const toggleHideRead = () => {
    if (hideRead === true) {
      setDisplay(unreadEmails)
    } else {
      setDisplay(emails)
    }
  }

  const toggleTabs = () => {
    if (currentTab === 'starred'){
      setDisplay(starredEmails)
    } else {
      setDisplay(emails)
    }
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={setInboxClassName()}
            onClick={() => {
              setCurrentTab('inbox')
              toggleTabs()
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxCount}</span>
          </li>
          <li
            className={setStarredClassName()}
            onClick={() => {
              setCurrentTab('starred')
              filterStarredEmails()
              toggleTabs()
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={!hideRead}
              onChange={() => {
                setHideRead(!hideRead)
                filterOutReadEmails()
                toggleHideRead()
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        <ul> {display.map((email, index) => (
          <li key={index} className={setEmailClassName(email)}>
          <div className="select">
            <input
            className="select-checkbox"
            type="checkbox" 
            checked={email.read}
            onChange={() => toggleRead(email)} />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              checked={email.starred}
              type="checkbox"
              onChange={() => toggleStarred(email)}
            />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
        )
        )}
        </ul>
      }</main>
    </div>
  )
}

export default App
