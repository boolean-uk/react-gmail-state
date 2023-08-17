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

  const toggleRead = (event) => {
    //Find id of Email
    let myEmailIndex
    for (let i = 0; i < emailList.length; i++) {
      if (emailList[i].id === parseInt(event.target.id)) {
        myEmailIndex = i
        break
      }
    }
    //If Email got Read
    if (event.target.checked) {
      updateUnreadCounter(unreadCounter - 1)
      updateEmailList(() => {
        emailList[myEmailIndex].read = true
        return emailList
      })
    } else {
      updateUnreadCounter(unreadCounter + 1)
      emailList[myEmailIndex].read = false
      return emailList
    }
  }

  const toggleStar = (event) => {
    if (event.target.checked) {
      updateStarCounter(starCounter + 1)
    } else {
      updateStarCounter(starCounter - 1)
    }
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
                  <input id={myEmail.id} className="select-checkbox" type="checkbox" defaultChecked={myEmail.read} onClick={toggleRead}></input>
                </div>
                <div className='star'>
                  <input className='star-checkbox' type="checkbox" defaultChecked={myEmail.starred} onClick={toggleStar}></input>
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
