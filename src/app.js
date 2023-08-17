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
  const [currentTab, setCurrentTab] = useState('inbox')

  const toggleRead = (myEmail) => {
    //If Email got Read   
    if (!myEmail.read) {
      updateUnreadCounter(unreadCounter - 1)
      updateEmailList(() => {
        myEmail.read = true
        return emailList
      })
    } else {
      updateUnreadCounter(unreadCounter + 1)
      myEmail.read = false
      return emailList
    }
  }

  const toggleStar = (myEmail) => {
    //If Email got Starred
    if (!myEmail.starred) {
      updateStarCounter(starCounter + 1)
      updateEmailList(() => {
        myEmail.starred = true
        return emailList
      })
    } else {
      updateStarCounter(starCounter - 1)
      updateEmailList(() => {
        myEmail.starred = false
        return emailList
      })
    }
  }

  const displayInbox = () => {
    setCurrentTab('inbox')
    updateEmailList(initialEmails)
  }

  const getStarEmails = () => {
    const starEmails = []
    initialEmails.map((myEmail) => {
      if (myEmail.starred) {
        starEmails.push(myEmail)
      }
    })
    setCurrentTab('star')
    updateEmailList(starEmails)
  }

  const filterReadEmails = (event) => {
    if (event.target.checked) {
      const unreadEmails = []
      emailList.map((myEmail) => {
        if (!myEmail.read) {
          unreadEmails.push(myEmail)
        }
      })
      updateEmailList(unreadEmails)
    } else {
      if (currentTab === 'inbox'){
        displayInbox()
      } else if (currentTab === 'star') {
        getStarEmails()
      }
    }
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={displayInbox}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCounter}</span>
          </li>
          <li
            className="item"
            onClick={getStarEmails}
          >
            <span className="label">Starred</span>
            <span className="count">{starCounter}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              onChange={filterReadEmails}
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
              <li className = {isRead} key={myEmail.id}>
                <div className='select'>
                  <input className="select-checkbox" type="checkbox" defaultChecked={myEmail.read} onChange={() => toggleRead(myEmail)}></input>
                </div>
                <div className='star'>
                  <input className='star-checkbox' type="checkbox" defaultChecked={myEmail.starred} onChange={() => toggleStar(myEmail)}></input>
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
