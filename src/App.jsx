import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  const [currentTab, setCurrentTab] = useState('inbox')   // Which tab in the sidebar
  const [hideRead, setHideRead] = useState(false)         // Read or unread?

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
            <span className="count">{emails.length}</span>
          </li>

          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={(e) => {setCurrentTab('starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.length}</span>
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
            key={index}
            className="email">

              {/* Select check box */}
            <div className="select">
              <input
                  className="select-checkbox"
                  type="checkbox"
              />
            </div>
            
            {/* Star check box */}
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
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

