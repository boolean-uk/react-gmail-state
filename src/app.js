import Header from './components/Header.js'
import initialEmails from './data/emails.js'
import { useState } from 'react'

import './styles/app.css'

function App() {
  // Use initialEmails for state
  //console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  //console.log("all emails",emails)

  // Checkbox "Read" (per email) function: toggleRead
  const toggleRead = (event, id) => {
    console.log(event.target.checked)
    const emailsClone = [...emails];
    for (let i = 0; i < emailsClone.length; i++) {
      const theEmail = emailsClone[i];

      if (theEmail.id === id) {
        //let testvalue = emails[i].read
        //console.log("read?",testvalue)
        theEmail.read = event.target.checked;
        break;
      }
    }
  setEmails(emailsClone);  
  };

  // Checkbox "Star" (per email) function: toggleStar
  const toggleStar = (event, id) => {
    console.log(event.target.checked)
    const emailsClone = [...emails];
    for (let i = 0; i < emailsClone.length; i++) {
      const theEmail = emailsClone[i];

      if (theEmail.id === id) {
        //let testvalue = emails[i].read
        //console.log("read?",testvalue)
        theEmail.starred = event.target.checked;
        break;
      }
    }
  setEmails(emailsClone);  
  };

  // Select "Inbox:" left-menu: will reset to put all mails in view
  const resetInbox = (event) => {
    setStarred(false)
    setHide(false)
  }

  // Select "Starred" left-menu:
  // Create a state for it: 
  const [show_starred, setStarred] = useState(false)
  // Function:
  const showStarred = (event) => {
    let status = !show_starred
    console.log("starred:",status)
    setStarred(status)
  }

  // Starred counter
  const count_starred = emails.filter((email) => (email.starred)).length
  console.log("starred count:", count_starred)

  // Inbox counter
  const count_inbox = emails.filter((email) => (!email.read)).length
  console.log("inbox count:", count_inbox)

  // Checkbox "Hide Read" left-menu: 
  // Create a state for it:
  const [hide_read, setHide] = useState(false)
  // Function:
  const hideRead = (event) => {
    console.log("hideread:",event.target.checked)
    setHide(event.target.checked)
    //console.log("hide_read:",hide_read) //one render behind?
  }

  // Which emails will render: 
  let toRender = []
  if (show_starred && hide_read) {
    console.log("show starred &  unread")
    // select emails
    const UnreadStarred = emails.filter((email) => (!email.read && email.starred))
    toRender = [...UnreadStarred]
  } else if (show_starred && !hide_read) {
    console.log("show starred emails")
    const starred = emails.filter((email) => (email.starred))
    toRender = [...starred]
  } else if (!show_starred && hide_read) {
    console.log("hide read emails")
    const unread = emails.filter((email) => (!email.read))
    toRender = [...unread]
  }
  else {
    console.log("render all emails")
    toRender = [...emails]
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={!show_starred ? "item active" : "item"}
            onClick={(event) => resetInbox(event)}
          >
            <span className="label">Inbox</span>
            <span className="count">{count_inbox}</span>
          </li>
          <li
            className={show_starred ? "item active" : "item"}
            onClick={(event) => showStarred(event)}
          >
            <span className="label">Starred</span>
            <span className="count">{count_starred}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hide_read}
              onChange={(event) => hideRead(event)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */
        toRender.map((toRender, index) => {
          const isRead = toRender.read //to select class for css
          //console.log(isRead)
          return(
            <div>
              <li className={isRead ? "email read" : "email unread"}>
                <div className="select">
	                <input className="select-checkbox" type="checkbox" onChange={(event) => toggleRead(event, toRender.id)} checked={toRender.read}/>
                </div>
                <div className="star">
	                <input className="star-checkbox" type="checkbox" onChange={(event) => toggleStar(event, toRender.id)} checked={toRender.starred}/>
                </div>
                <div className="sender">{toRender.sender}</div>
                <div className="title">{toRender.title}</div>
              </li>
            </div>

            )
        })
      }</main>

    </div>
  )
}

export default App