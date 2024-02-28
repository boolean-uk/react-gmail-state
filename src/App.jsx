import { useState } from 'react';
import Header from './components/Header';
import initialEmails from './data/emails';
import './styles/App.css';

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email.id === targetEmail.id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  };

  const getReadEmails = (emails) => emails.filter((email) => !email.read);

  const filteredEmails = hideRead ? getReadEmails(emails) : emails;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">{filteredEmails.length}</span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">{filteredEmails.filter((email) => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map((email) => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
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
