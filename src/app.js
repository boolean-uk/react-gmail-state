import {  useEffect ,useState } from 'react';
import clsx from 'clsx';
import Header from './components/header';
import initialEmails from './data/emails';
import './styles/app.css';

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [unreadMessageCount, setUnreadMessageCount] = useState(emails.filter(email => !email.read).length);
  const [starredCount, setStarredCount] = useState(emails.filter(email => email.starred).length);
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState(emails)
  const [active, setActive] = useState('inbox')

  const readMessageFunction = (id) => {
    setEmails(prevEmails => {
      const updatedEmails = prevEmails.map(email => {
        if (email.id === id) {
          return {...email, read: !email.read}
        }
        return email
      })
      setUnreadMessageCount(updatedEmails.filter(email => !email.read).length);
      return updatedEmails;
    });
  };

  const starredMessageFunction = (id) => {
    setEmails(prevEmails => {
      const updatedEmails = prevEmails.map(email => {
        if (email.id === id) {
          return {...email, starred: !email.starred}
        }
        return email
      })
      setStarredCount(updatedEmails.filter(email => email.starred).length);
      return updatedEmails;
    });
  };

  const handleHideReadChange = (e) => {
    setHideRead(e.target.checked)
    setActive('hideRead')
  }

  useEffect(() => {
    const displayedEmails = hideRead ? emails.filter(email => !email.read) : emails;
    setCurrentTab(displayedEmails);
  }, [hideRead, emails]);

  const showStarredEmails = () => {
    const starredEmails = emails.filter(email => email.starred)
    setCurrentTab(starredEmails)
    setActive('starred')
    setHideRead(false)
  }

  const showInboxEmails = () => {
    setCurrentTab(emails)
    setActive('inbox')
    setHideRead(false)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className={clsx('item', { active: active === 'inbox' })} onClick={showInboxEmails}>
            <span className="label">Inbox</span>
            <span className="count">{unreadMessageCount}</span>
          </li>
          <li className={clsx('item', { active: active === 'starred' })} onClick={showStarredEmails}>
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>
          <li className={clsx('item', 'toggle', { active: active === 'hideRead' })}>
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={handleHideReadChange}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {currentTab.map((email) => (
            <li
              key={email.id}
              className={clsx('email', { 'read': email.read, 'unread': !email.read })}
            >
              <div className="select">
                <input
                  type="checkbox"
                  checked={email.read}
                  onChange={() => readMessageFunction(email.id)}
                  className="select-checkbox"
                />
              </div>
              <div className="star">
                <input
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => starredMessageFunction(email.id)}
                  className="star-checkbox"
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
