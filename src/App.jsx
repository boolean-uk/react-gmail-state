import { useState } from 'react'
import Header from './components/header'
// import initialEmails from './data/emails'
import Emails from './data/emails'


import './styles/App.css'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)
  const [EmailList, setEmailList ] = useState(Emails)
  const [hideRead, setHideRead] = useState(false)
  const [starred, setStarred] = useState(false)






  let emailToShow = hideRead
  if (hideRead) {
     emailToShow = EmailList.filter((email) => email.read === true)
    console.log(emailToShow)

  } else if(starred) {
    emailToShow = EmailList.filter((email) => email.starred === false)
    console.log(emailToShow)

  } else {
    emailToShow = EmailList
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
          
          <li className="item toggle">
            <label htmlFor="hide-read">Starred Read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={starred}
              onChange={(event) => {setStarred(event.target.checked)}}
            />
          </li>
             
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide Rread</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(event) => {setHideRead(event.target.checked)}}
            />
          </li>
        </ul>
      </nav>
    <main className="emails">
       {emailToShow.map((email) => (
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
