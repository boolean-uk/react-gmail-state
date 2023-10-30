import { useState } from 'react'
import Header from './components/header'
// import initialEmails from './data/emails'
import Emails from './data/emails'


import './styles/App.css'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)
  const [EmailList] = useState(Emails)
  const [Main, setMain] = useState([])


  // const ToggleStarred = (emailToToggle) => {
  //   const updatedEmails = EmailList.map((email) =>
  //     email.id === emailToToggle.id
  //       ? { ...email, starred: !email.starred }
  //       : email
  //   );
  //   setMain(updatedEmails);
  // }




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
    <main className="emails"> {Main}
       {EmailList.map((email) => (
         <li  className='email mikel' key={email.id}> 
            <div className="select">
            <input
              className="select-checkbox"
              type="checkbox"
              checked={email.starred}
              />
            </div>

            <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.read}
              // onChange={ToggleStarred(email)}
            />
            </div>

            <div className="sender"> 
              <p>{email.sender}</p>        
            </div>
            <div className="title">
              <p> {email.title}</p>  
            </div>
        </li>
       ))}
      
  
      </main>
    </div>
  )
}

export default App
