import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [hideRead, setHideRead] = useState(false)
  const [emails, setEmails] = useState(initialEmails)
  const [view, setView] = useState("default")

  const star = (target) => {

    let alteredEmails = emails.map(function(email) {
      if ( email == target) return { ...email, starred: !email.starred}
      return email
    })

    setEmails(alteredEmails)
  }

  const read = (target) => {
    setEmails(
      emails.map(function(email) {
        if ( email == target ) return {...email, read: !email.read}
        return email
      })
    )
  }

  const showEmails = () => {
    let relevant =  emails.filter(email => !hideRead || !email.read)
    switch(view){
      case("starred"):
        return relevant.filter(email => email.starred)
      default:
        return relevant
    }
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={view == "default" ? "item active" : "item"}
            onClick={() => setView("default")}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter(e => !e.read).length}</span>
          </li>
          <li
            className={view == "starred" ? "item active" : "item"}
            onClick={() => setView("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(e => e.starred).length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              defaultChecked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */
        showEmails().map(elm => 
          <li className={elm.read ? "email read" : "email"} key={elm.id}>
            <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={elm.read}
              onClick={e => read(elm)}/>
            </div>
            <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={elm.starred}
              onClick={e => star(elm)}
            />
            </div>
            <div className="sender">{elm.sender}</div>
            <div className="title">{elm.title}</div>
          </li>
          )
      }</main>
    </div>
  )
}

export default App
