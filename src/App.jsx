import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'
import {ToggleRead, ToggleStar} from './functions/Functions.jsx'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)    // Why rendering 2 times???
  const [emails, setEmails] = useState(initialEmails)
  const [currentTab, setCurrentTab] = useState('inbox')   // Which tab in the sidebar
  const [hideRead, setHideRead] = useState(false)         // Read or unread?


  // Extension1:
  // Filtering read/unread & starred/unstarred
  const unreadEmails = emails.filter((email) => !email.read)
  const starredEmails = emails.filter((email) => email.starred)


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={(e) => {setCurrentTab('inbox')}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>

          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={(e) => {setCurrentTab('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}   //depends on hideRead State
              //onChange={(e) => {setHideRead(true)}}
              onChange={(e) => {setHideRead(e.target.checked)}}        //e.target refers to the element that triggered the event -> in this case the checkbox -> since checkbox, we can do .checked
            />
          </li>
        </ul>
      </nav>


      <main className="emails">
        <ul>
          {/* Iterates through each email */}
          {emails.map((email, index) => (
            <li 
              // Remember to yuse the "key" attribute when rendering lists in react. 
              // Necessary when rendering lists. Helps React identify which items have changed.
              key={index}   
              className={`email ${email.read ? 'read' : 'unread'}`}>

                {/* Select check box */}
              <div className="select">
                <input
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read}      // Determined if the checkbox is checked or not -> the attribute = checked if true and v.v.
                    onChange={() => {ToggleRead({emails, setEmails,  target: email})} }   // Handling toggleRead
                />
              </div>
              
              {/* Star check box */}
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred} 
                  onChange={(e) => {ToggleStar({emails, setEmails, target: email})} }   // Handling toggleStar
                />
              </div>

              {/* Display sender and title */} 
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

