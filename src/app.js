import { useState } from "react";

import React from "react";
import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  //make a const/ useState that will call the emails from emails.js
  const [emails, setEmails] = useState(initialEmails);


    const toggleRead =  (email, event) => {
      
      const readEmails = emails.map((other) => {
        const toggleValue = event.target.checked
        if(other === email) {
          console.log(email)
          if (toggleValue) {
            return{...email, read :true}
          }
          if(!toggleValue){
            return {...email, read: false}
          }
        }
        return other
      })
     setEmails(readEmails)
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
        {emails.map((email) => {
          return (
            <li className="email" key={email.id}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={(event) => {
                    console.log("checked");
                    toggleRead(email, event);
                    console.log(email);
                  }}
                />
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox" checked={email.starred} />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
