import { useState } from "react";
import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emailsState, setEmailState] = useState(initialEmails);
  const [star, setstar] = useState(0);

  const countStarred = () => {
    console.log(emailsState);
    let currentStarred = 0;
    emailsState.forEach(email => {
      if (email.starred) {
        currentStarred++;
      }
    })
      
    setstar(currentStarred);
  };

const unreadEmails = emailsState.filter(function (email){
  return email.read === false
})
    const [unreadEmailState, setunreadEmailState] = useState(unreadEmails)

  // countStarred()

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
            <span className="count">{emailsState.length}</span>
          </li>
          <li
            className="item"
            //  onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{star}</span>
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
        {emailsState.map((thisEmail, index) => (
          <li className="email" key={index} >
           {/* if(thisEmail.read === true){
             
          } } */}
            <div className="select">
              <input className="select-checkbox" type="checkbox" />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                onChange={() => {
                  thisEmail.starred = !thisEmail.starred;
                  countStarred();
                }}
              />
            </div>
            <div className="sender">{thisEmail.sender}</div>
            <div className="title">{thisEmail.title}</div>
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
