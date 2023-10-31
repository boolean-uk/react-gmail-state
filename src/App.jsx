import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [renderedEmails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)

  const getUnreadEmails = renderedEmails.filter(item => item.read === false)
  
  const emailsToShow = hideRead ? getUnreadEmails : renderedEmails

  const toggleStar = (triggerItem) => {
    setEmails(emailsToShow.map((item) => {
      if (item === triggerItem) {
        return {
          ...item,
          starred: !item.starred
        }
      } else {
        return item
      }
    })
    )
  } 

  const Email = (item, index) => {
    return (
      <li className={item.read ? "email read" : "email unread"} key={index}>
        <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"/>
        </div>
        <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={item.starred}
          onChange={() => toggleStar(item)}
        />
        </div>
        <div className="sender">{item.sender}</div>
        <div className="title">{item.title}</div>
      </li>
    )
  }

  const renderEmails = () => {
    return(emailsToShow.map((item, index) => {
      return Email(item, index)
    }))
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
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onClick={() => {setHideRead(!hideRead)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {renderEmails()}
      </main>
    </div>
  )
}

export default App
