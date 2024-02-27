import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'
import PropTypes from 'prop-types'

import './styles/App.css'

function App() {


  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [starred, setStarred] = useState(false)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={starred ? "item" : "item active"}
            onClick={() => { setStarred(!starred) }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={starred ? "item active" : "item"}
            onClick={() => { setStarred(!starred) }}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>

          <li className="item toggle"
            onClick={() => { setHideRead(!hideRead) }}
          >
            <label form="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => { setHideRead(!hideRead) }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <
          RenderEmails emailsState={emails}
          setEmailsState={setEmails}
          hideReadState={hideRead}
          starredState={starred}
        />
      </main>
    </div>
  )
}

function RenderEmails({ emailsState, setEmailsState, hideReadState, starredState }) {

  const toggleRead = (id) => {
    setEmailsState(currentEmails =>
      currentEmails.map(email =>
        email.id === id ? { ...email, read: !email.read } : email
      )
    )
  }
  const toggleStarred = (id) => {
    setEmailsState(currentEmails =>
      currentEmails.map(email =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    )
  }

  let selectedEmails = (hideReadState ?
    Object.assign(emailsState.filter(e => e.read)) :
    Object.assign(emailsState))

  selectedEmails = starredState ?
    selectedEmails.filter(e => e.starred) :
    selectedEmails


  return (
    <ul>
      {selectedEmails.map((email) => (
        <li key={email.id} className="email">
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
              onChange={() => toggleRead(email.id)}
            />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={() => toggleStarred(email.id)}
            />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
      ))}
    </ul>
  )
}

RenderEmails.propTypes = {
  emailsState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      sender: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      starred: PropTypes.bool.isRequired,
      read: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setEmailsState: PropTypes.func.isRequired,
  hideReadState: PropTypes.bool.isRequired,
  starredState: PropTypes.bool.isRequired
}
export default App
