import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

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
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
      {initialEmails.map((email, index) => (
        <li
            key={index}
            className={`email ${email.read ? 'read' : 'unread'}`}
        >
          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.read}
              // onChange={() => toggleRead(email)}
            />
          </div>
          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              // onChange={() => toggleStar(email)}
            />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
          {/* <button onClick={() => OpenEmail(email)}>Open</button> */}
      </li>
      )
      )}
      </main>
    </div>
  )
}

export default App
