import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  // Use initialEmails for 
  // console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails) 
  const [read, setRead] = useState(false)
  const [tab, setTab] = useState('inbox');  

  const changeTab = (tabName) => {
    setTab(tabName)
  }

  const getReadEmails = (emails) =>{
    return emails.filter((e) => e.read);
  }

  const getStarredEmails = (emails) =>{
    return emails.filter((e) => e.starred)
  }

  const toggleRead = (mail) => {    
    const updatedEmails = emails.map((e) => e === mail ? {...e, read: !e.read} : e)
    setEmails(updatedEmails)   
  }  

  const toggleStar = (mail) => {
    const updatedEmails = emails.map((e) => e === mail ? {...e, starred: !e.starred} : e)
    setEmails(updatedEmails)   
  }

  const hideRead = () =>{
    setRead(!read)
  }  
  
  let emailArray = tab === 'inbox' ? emails : getStarredEmails(emails)
  emailArray = read ? getReadEmails(emailArray) : emailArray 
  const numberOfStarredEmails = emails.filter(mail => mail.starred).length

  console.log(tab)
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={tab === 'inbox' ? "item active" : "item"}
            onClick={() => changeTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={tab === 'starred' ? "item active" : "item"}
            onClick={() => changeTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{numberOfStarredEmails}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={read}
              value={read}
              onChange={hideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
      {emailArray.map((e, index) => (
        <ul className='email' key={index}>          
          <li>
            <input
            type='checkbox'
            key={index}     
            value={e.read}       
            checked={e.read}                    
            onChange={p => toggleRead(e)} 
            /> 
          </li>                         
          <li><img onClick={() => toggleStar(e)} className= { e.starred ? "star-checkbox-checked" : "star-checkbox-unchecked"}/></li>  
          <li>{e.sender}</li>
          <li className='email-title'>{e.title}</li>        
        </ul>
      ))
      /* Render a list of emails here */
      }</main>
    </div>
  )
}

export default App
