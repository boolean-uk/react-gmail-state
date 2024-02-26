import { useEffect, useState } from 'react';

import Header from './components/Header'
// import emails from './data/emails';
import initialEmails from './data/emails'

import './styles/App.css'

const ContentArea = (emails, setEmails) => {
  return (
    <main className="emails">
      {emails.map((email, index) => (
        <div key={index}>{RenderEmail(emails, setEmails, email)}</div>
      ))}
    </main>
  );
}

const RenderEmail = (emails, setEmails, email) => {
  return (
    <li className={`email ${email.read ? "read" : "unread"}`}>
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onChange={() => ToggleRead(emails, setEmails, email)}
        />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onChange={() => ToggleStar(emails, setEmails, email)}
        />
      </div>
      <div className="sender">{email.sender}</div>
      <div className="title">{email.title}</div>
    </li>
  );
};

const LeftMenu = (currentTab, setCurrentTab, hideRead, setHideRead, numUnreadEmails, numStarredEmails) => {
  return (
    <nav className="left-menu">
      <ul className="inbox-list">
        <li
          className={`item ${currentTab === 'inbox' ? "active" : null}`}
          onClick={() => {setCurrentTab('inbox')}}
        >
          <span className="label">Inbox</span>
          <span className="count">{numUnreadEmails}</span>
        </li>
        <li
          className={`item ${currentTab=== 'starred' ? "active" : null}`}
          onClick={() => {setCurrentTab('starred')}}
        >
          <span className="label">Starred</span>
          <span className="count">{numStarredEmails}</span>
        </li>

        <li className="item toggle">
          <label htmlFor="hide-read">Hide read</label>
          <input
            id="hide-read"
            type="checkbox"
            checked={hideRead}
            onChange={(e) => {
              setHideRead(e.target.checked);
            }}
          />
        </li>
      </ul>
    </nav>
  );
}

const ToggleRead = (emails, setEmails, email) => {
  const updatedEmails = emails.map(e => e.id === email.id ? {...e,read: !e.read} : e)
  setEmails(updatedEmails)
}

const ToggleStar = (emails, setEmails, email) => {
  const updatedEmails = emails.map(e => e.id === email.id ? {...e,starred: !e.starred} : e)
  setEmails(updatedEmails)
}

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [filteredEmails, setFilteredEmails] = useState(emails)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [hideRead, setHideRead] = useState(false)

  useEffect(() => {
    setFilteredEmails(emails);
  }, [emails, hideRead, currentTab])

  useEffect(() => {
    if (currentTab === 'starred') {
      setFilteredEmails(prevFilteredEmails => {
        const updatedFilteredEmails = prevFilteredEmails.filter(email => email.starred);
        return updatedFilteredEmails;
      });
    }
  }, [currentTab]);
  

  useEffect(() => {
    if (hideRead){
      const updatedFilteredEmails = filteredEmails.filter((email) => !email.read);
      setFilteredEmails(updatedFilteredEmails);
    }
  }, [hideRead])
  
  const numUnreadEmails = emails.filter(email => email.read !== true).length;
  const numStarredEmails = emails.filter(email => email.starred !== true).length;

  return (
    <div className="app">
      <Header />

      {LeftMenu(currentTab, setCurrentTab, hideRead, setHideRead, numUnreadEmails, numStarredEmails)}

      {ContentArea(filteredEmails, setEmails)}
      
    </div>
  )
}

export default App
