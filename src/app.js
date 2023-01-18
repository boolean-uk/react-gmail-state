import { useState } from 'react'
import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'

function App() {
  // Use initialEmails for state
//   console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [starOnly, setStarOnly] = useState(false)


  const toggleRead = (importedEmail, event) => {
    const readEmails = emails.map((currentEmail) => {
        const toggleValue = event.target.checked
        if(importedEmail === currentEmail){
            if (toggleValue) {
                return {...importedEmail, read: true}
            }
            if (!toggleValue) {
                return {...importedEmail, read: false}
            }
        }
        return currentEmail
    })
    setEmails(readEmails)
  }

  const toggleStar = (importedEmail, event) => {
    const starredEmails = emails.map((currentEmail) => {
        const toggleValue = event.target.checked
        if(importedEmail === currentEmail){
            if (toggleValue) {
                return {...importedEmail, starred: true}
            }
            if (!toggleValue) {
                return {...importedEmail, starred: false}
            }
        }
        return currentEmail
    })
    setEmails(starredEmails)
  }

  const hiddenEmails = emails.filter((email) => {
    if(!hideRead) return true;
    if(hideRead && !email.read) return true;
    return false
  })

  const emailsToRender = hiddenEmails.filter((email) => {
    if(!starOnly) return true;
    if(starOnly && email.starred) return true;
    return false
  })

  let starCount = 0
  emailsToRender.forEach((email) => {
    if(email.starred){
        starCount++
    }
  })
  
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
            <span className="count">{emailsToRender.length}</span>
          </li>
          <li
            className="item"
            onClick={() => {
                setStarOnly(!starOnly)
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead)
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
            {emailsToRender.map((email) => {
                return (
                    <li key={email.id} className="email">
                        <div className="select">
                            <input
                            className="select-checkbox"
                            checked={email.read}
                            type="checkbox" 
                            onChange={(event) => {
                                toggleRead(email, event)
                            }}/>
                        </div>
                        <div className="star">
                            <input
                            className="star-checkbox"
                            type="checkbox"
                            checked={email.starred}
                            onChange={(event) => {
                                toggleStar(email, event)
                            }}
                            />
                        </div>
                        <div className="sender">{email.sender}</div>
                        <div className="title">{email.title}</div>
                    </li>
                )
            })}
        </ul>
      </main>
    </div>
  )
}

export default App
