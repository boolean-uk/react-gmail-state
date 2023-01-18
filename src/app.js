import React from 'react'
import Header from './components/header'

import initialEmails from './data/emails'

import { useState } from 'react'
import './styles/app.css'


function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  //make a const/ useState that will call the emails from emails.js
  const [emails, setEmails] = useState(initialEmails);

  //create list: can use map instead of for each to create the items
  const renderEmailsInMain = (emails) => {

    { emails.map((email) => {
        return (
          <li className="email" key={email.id}>
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox" />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
              />
            </div>
            <div className="sender"  key={email.sender}></div>
            <div className="title" key={email.title}></div>
          </li>
        )
      });
    }

    // initialEmails(emails.map((email) => {
    //   return (
    //     <div>
    //       <li className="email" key= {email.id}>
    //         <div className="select">
    //           <input
    //             className="select-checkbox"
    //             type="checkbox" />
    //         </div>
    //         <div className="star">
    //           <input
    //             className="star-checkbox"
    //             type="checkbox"
    //           />
    //         </div>
    //         <div className="sender">

    //         </div>
    //         <div className="title"> {emails.title}</div>
    //       </li>
    //     </div>
    //   )
    // })
    // );
    // setEmails(initialEmails)
  };

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
      <main className="emails">{renderEmailsInMain()}</main>
    </div>
  )
}

export default App
