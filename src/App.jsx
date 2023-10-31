import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {

  const [ emails, setEmails ] = useState(initialEmails)
  const [ hideRead , setHideRead ] = useState (false)
  // Use initialEmails for state
  console.log(emails)

  //let emailsToShow;
  //if(hideRead){
  //  //only to show those are unread ,so its 'false'
  //  emailsToShow = emails.filter((email) => email.read === false)
  //}else{
  //  emailsToShow = emails
  //}


  //------or another way
  // let emailsToShow = emails
  // if(hideRead){
  //   emailsToShow = emails.filter((email) => email.read === false)
  // }


  //or another way
// ( condition ? what to do if true : what to do if false )
const emailsToShow = hideRead ? emails.filter((email) => email.read === false) : emails;
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
              //checked={false}   -- we will put 'hideRead' in place of false as above given hideRed = false
              checked = {hideRead}
            onChange={(event) => {setHideRead(event.target.checked)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
        {emailsToShow.map((email) => (
        //{emails.map((email) => (
        //so we now chang here 'emails' to 'emailsToShow'
        
        <li key={email.title}  className="email">
        <div className="select">
        <input
        checked = {email.read}
          className="select-checkbox"
          type="checkbox"/>
        </div>
        <div className="star">
        <input
         checked = {email.starred}
          className="star-checkbox"
          type="checkbox"
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
