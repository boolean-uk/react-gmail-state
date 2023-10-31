import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const allEmails = initialEmails
  const [renderedEmails, setEmails] = useState(allEmails)
  const [hideRead, setHideRead] = useState(false)

  const toggleStar = (triggerItem) => {
    setEmails(renderedEmails.map((item) => {
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

  const getUnreadEmails = () => renderedEmails.filter(item => item.read === false)
  
  hideRead ? setEmails(getUnreadEmails()) : setEmails(allEmails)
  
  const renderEmails = () => {
    return(renderedEmails.map((item, index) => {
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
              onChange={(e) => setHideRead(e.target.checked)}
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
