import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [renderedEmails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [tab, setTab] = useState("Inbox")
  // const [shownEmails, filterForRendering] = useState(initialEmails)

  const getUnreadEmails = renderedEmails.filter(item => item.read === false)
  
  const emailsToShow = () => {
    console.log("filtering", tab)
    let filteredResult
    filteredResult = tab === "Starred" ?  filteredResult.filter(item => item.starred === true) : renderedEmails
    if (hideRead) filteredResult = filteredResult.filter(item => item.read === false) 
    return filteredResult
  }

  const shownEmails = emailsToShow()

  const toggleSelection = (triggerItem) => {
    setEmails(shownEmails.map((item) => {
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

  const toggleStar = (triggerItem) => {
    setEmails(shownEmails.map((item) => {
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
    return(shownEmails.map((item, index) => {
      return Email(item, index)
    }))
  }

  const numStarred = renderedEmails.filter(item => item.starred === true).length

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {setTab("Inbox")}}
          >
            <span className="label">Inbox</span>
            <span className="count">{getUnreadEmails.length}</span>
          </li>
          <li
            className="item"
            onClick={() => {setTab("Starred")}}
          >
            <span className="label">Starred</span>
            <span className="count">{numStarred}</span>
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
