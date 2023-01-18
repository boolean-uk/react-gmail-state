import './styles/app.css'
import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'


function App() {
  // Use initialEmails for state
  const [allMails, setAllMails] = useState(initialEmails)
  const [showRead, setShowRead] = useState(true)
  const [inboxType, setInboxType] = useState('inbox')

  const isRead = ({read}) => read ? 'email read' : 'email unread'

  const toggleRead = (mail) => {
    if (!mail.read) {
      mail.read = !mail.read
      setAllMails([...allMails])
    }
  }

  const toggleStarred = (mail) => {
    mail.starred = !mail.starred
    setAllMails([...allMails])
    console.table(allMails)
  }

  const starredMails = allMails.filter((mail) => mail.starred)
  const otherMails = allMails.filter((mail) => !mail.starred)

  const getMailsToRender = () => {
    let mailsToRender = []
    switch (inboxType) {
      case 'inbox': {
        mailsToRender = [...starredMails, ...otherMails].filter((mail) => {
          if(showRead) return true
          if(!showRead && mail.read) return false
          return true
        })
        break
      }
      case 'starred': {
        mailsToRender = [...starredMails].filter((mail) => {
          if(showRead) return true
          if(!showRead && mail.read) return false
          return true
        })
        break
      }
      default: console.log('yep broken')
    }
    return mailsToRender
  }

  const getActiveTab = (event) => {
    console.log(event.target)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={'inbox' === inboxType ? 'item active' : 'item'}
            onClick={() => {setInboxType('inbox')}}
          >
            <span className="label">Inbox</span>
            <span className="count">{allMails.length}</span>
          </li>
          <li
            className={'starred' === inboxType ? 'item active' : 'item'}
            onClick={() => {setInboxType('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredMails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              defaultChecked={false}
              onChange={() => {setShowRead(!showRead)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {getMailsToRender().map((mail) => (
          <li className={isRead(mail)} onClick={()=>toggleRead(mail)}>
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"/>
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={mail.starred}
            onChange={()=>toggleStarred(mail)}
          />
          </div>
          <div className="sender">{mail.sender}</div>
          <div className="title">{mail.title}</div>
        </li>
        ))}
      </main>
    </div>
  )
}

export default App
