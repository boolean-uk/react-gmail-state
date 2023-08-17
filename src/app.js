import Header from './components/header'

import initialEmails from './data/emails'

import './styles/app.css'

import { useState } from 'react'

function App() {
  //Get the initail email list
  const [emailList, updateEmailList] = useState(initialEmails)
  //Get the number of initial unread emails 
  const [unreadCounter, updateUnreadCounter] = useState(() => {
    let counter = 0
    for (let i = 0; i < emailList.length; i++) {
      if (emailList[i].read === false){
        counter++
      }
    }
    return counter
  })
  //Get the number of initial starred emails
  const [starCounter, updateStarCounter] = useState(() => {
    let counter = 0
    for (let i = 0; i < emailList.length; i++) {
      if (emailList[i].starred === true){
        counter++
      }
    }
    return counter
  })

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
            <span className="count">{unreadCounter}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starCounter}</span>
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
        <ul>
          {emailList.map((myEmail) => {
            let isRead = 'email unread'
            if (myEmail.read) {
              isRead = 'email read'
            }
            return(
              <li className = {isRead}>
                <div className='select'>
                  <input className="select-checkbox" type="checkbox" defaultChecked={myEmail.read}></input>
                </div>
                <div className='star'>
                  <input className='star-checkbox' type="checkbox" defaultChecked={myEmail.starred}></input>
                </div>
                <div className='sender'>{myEmail.sender}</div>
                <div className='title'>{myEmail.title}</div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
