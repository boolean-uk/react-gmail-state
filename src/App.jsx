import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [renderedEmails, setEmails] = useState(initialEmails)

  const Email = (item) => {
    return (
      <li className="email">
        <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"/>
        </div>
        <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
        />
        </div>
        <div className="sender">{item.item.sender}</div>
        <div className="title">{item.item.title}</div>
      </li>
    )
  }

  const renderEmails = () => {
    return(renderedEmails.map((item, index) => <Email key={index} item={item}/>))
  }

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
              checked={false}
              onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {renderEmails()}
      </main>
    </div>
  )
}

export default App
