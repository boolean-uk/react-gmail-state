import { useState } from 'react';
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state


  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("Inbox");

  let filteredEmails = emails;

  console.log(emails)

  const toggleRead = (e) => {
    const updatedEmails = emails.map(
      email => email.id === e.id ? {...email, read: !email.read} : email)

    setEmails(updatedEmails)
  }

  const toggleStar = (e) => {

    const updatedEmails = emails.map(
      email => email.id === e.id ? {...email, starred: !email.starred} : email)
    setEmails(updatedEmails)

  }

  const getReadEmails = (emails) => emails.filter((email) => email.read);

  const getStarredEmails = (emails) => emails.filter((email) => email.starred);

  if(hideRead) {
    filteredEmails = getReadEmails(filteredEmails);
  }

  if(currentTab === "Starred") {
    filteredEmails = getStarredEmails(filteredEmails)
  } 


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className= {`item ${currentTab === "Inbox" ? "active" : "toggle"}`}
            onClick={() => {
              setCurrentTab("Inbox")
          }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className= {`item ${(currentTab === "Starred") ? "active" : "toggle"}`}
            onClick={() => {setCurrentTab("Starred")}}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails(emails).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
                
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>

         {
        filteredEmails.map((email, index) => (
        <li key={index} className="email" >
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={() => toggleRead(email)}
            />
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => toggleStar(email)}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
        ) 
       ) 
      }
       </ul>
       </main>
    </div>
  )
}

export default App
