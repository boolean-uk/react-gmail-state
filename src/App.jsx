import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'


import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)



  const starred = () => emails.filter(emails => emails.starred)
  const read = () => emails.filter(emails => emails.read)

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
            <span className="count">{starred().length}</span>
          </li>
          <li
            className="item"
          // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{read().length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read" >Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
            // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>


      <main className="emails">
        {emails.map((emails) =>
        (<li
          key={emails.id}
          className={`email ${emails.read ? "read" : "unread"}`}
        >
          <div className='select'>
            <input
              className="select-checkbox"
              type="checkbox"
              checked={emails.read}
            />
          </div>
          <div className='star'>
            <input
              className="star-checkbox"
              type="checkbox"
              checked={emails.starred}
            />
          </div>
          <div className='sender'>{emails.sender}</div>
          <div className='title'>{emails.title}</div>

        </li>))

        }</main>
    </div>
  )
}

export default App
