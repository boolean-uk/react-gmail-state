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

  //create list: can use map instead of for each to create the items

//   const toggleRead =  (email) => {
//     if (updatedStatus === email) {
//       return {...updatedStatus, read: !updatedStatus.read}}
// return updatedStatus
//   }


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
                <input className="select-checkbox" type="checkbox"  />
                {/* // working on extension 1 it should be inside the input tag
                // onChange={() => {
                //   console.log("checked")
                //   const updatedRead = emails.map((updatedStatus) => {
                //        if (updatedStatus === email.id) {
                //           return {...initialEmails,read : !initialEmails.read}
                //         }
                //     return updatedStatus
                //         })
                //         setEmails(updatedRead)
                //         // console.log(updatedRead)
                // }} */}
                
              </div>
              <div className="star">
                <input className="star-checkbox" type="checkbox" />
              </div>
              <div className="sender" >
              {email.sender}
              </div>
              <div className="title" >
              {email.title}
              </div>

            </li>
          );
        })
        }
      </main>
    </div>
  );
}

export default App;
