import Header from './components/header'
import initialEmails from './data/emails'
import './styles/app.css'

import { useState } from 'react'


function App() {
  // Use initialEmails for state
  // console.log(initialEmails.length)

  const [mails, setMails] = useState(initialEmails)
  const [starred, setStarred] = useState(2)



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
            <span className="count">{mails.length}</span>
          </li>
          <li
            className="item"
          // onClick={() => {}}
          >
            <span className="label" >Starred</span>
            <span className="count">{starred}</span>
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





      <main className="emails">
        {mails.map(mapx =>
          < li className="email" key={mapx.id}

            style={{ backgroundColor: "gray" }}

          >
            {console.log(mapx.read)}
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked={mapx.starred}
              // onClick={starCounter}
              />
            </div>
            <div className="sender">{mapx.sender}</div>
            <div className="title">{mapx.title}</div>
          </li>

        )}

      </main>
    </div >
  )
}

export default App
