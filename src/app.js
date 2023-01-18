import { useState } from 'react'
import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'


function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [starOnly, setStarOnly] = useState(false)
  const toggleRead = (email, event) => {
    
     const readEmails = emails.map((other) => {
        const toggleValue = event.target.checked
        if (other === email) {
          console.log("read email", email)
          if (toggleValue) {
            return { ...email, read: true}
          }
          if (!toggleValue){
            return {...email, read: false}
          }

        }
        return other;
      })
      // first way to pass the values
    setEmails(readEmails)
  }
  const toggleStar = (email, event) => {
    // second way see above
    setEmails(
      emails.map((other) => {
        const toggleValue = event.target.checked
        if (other === email) {
          console.log("read email", email)
          if (toggleValue) {
            return { ...email, starred: true}
          }
          if (!toggleValue){
            return {...email, starred: false}
          }

        }
        return other;
      })
    )
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
  const starCount = emailsToRender.forEach((email) => {
    if(email.starred === true){
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
            // onClick={() => { }}
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
            <span className="count"></span>
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
      <main className="emails">{/* Render a list of emails here */}
        <ul>
          {emailsToRender.map((email) => (
            <li className="email" key={email.id}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={(event) => {
                    toggleRead(email, event)
                    console.log(email)
                  }} />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={(event) => {
                    toggleStar(email, event)
                    console.log(email)
                  }}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
