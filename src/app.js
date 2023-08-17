import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'

import {useState} from 'react'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails,setEmails] = useState(initialEmails)
  const [mailList,setMailList] = useState(initialEmails)

  const getUnRead = () => {
    let counter = 0
    emails.map((email) => {
      if (email.read === false) {
        counter++
      }
    })
    return counter
  }

  const getStarred = () => {
    let counter = 0
    emails.map((email) => {
      if(email.starred === true) {
        counter++
      }
    })
    return counter
  }

  const getUnReadEmails = () => {
    const temp = []
    emails.map((mail) => {
      if (mail.read === false) {
        temp.push(mail)
      }
    })
    return temp
  }

  const getStarredEmails = () => {
    const temp = []
    emails.map((mail) => {
      if (mail.starred === true) {
        temp.push(mail)
      }
    })
    return temp
  }

  const toggleRead = (mail) => {
    mail.read = !mail.read
    const temp = []
    emails.map(email => {
      if (mail.id === email.id) {
        mail.read = email.read
      }
      temp.push(email)
    })
    setEmails(temp)
  }

  const toggleStar = (mail) => {
    mail.starred = !mail.starred
    const temp = []
    emails.map(email => {
      if (mail.id === email.id) {
        mail.starred = email.starred
      }
      temp.push(email)
    })
    setEmails(temp)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {setMailList(emails)}}
          >
            <span className="label">Inbox</span>
            <span className="count">{getUnRead()}</span>
          </li>
          <li
            className="item"
            onClick={() => {setMailList(getStarredEmails())}}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarred()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              // checked = {}
              onChange={(event) => {
                if (event.target.checked) {
                  setMailList(getUnReadEmails())
                } else {
                  setMailList(emails)
                }
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{mailList.map(mail => {
        return (
          <li key={mail.id} className="email">
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                onChange={() => toggleRead(mail)}
                checked={mail.read}
                />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                onChange={() => toggleStar(mail)}
                checked={mail.starred}
              />
            </div>
            <div className="sender">{mail.sender}</div>
            <div className="title">{mail.title}</div>
          </li>
        )
      })}</main>
    </div>
  )
}

export default App
