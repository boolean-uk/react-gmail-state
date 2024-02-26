import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";
import { useState } from "react";

function App() {
    const [emails, setEmails] = useState(initialEmails);
    const [hideRead, setHideRead] = useState(false);
    const [onlyStarred, setOnlyStarred] = useState(false);
    console.log(emails);
    const numUnreadEmails = emails.filter((e) => e.read === false).length;
    const numStarredEmails = emails.filter((e) => e.starred === true).length;

    let emailsToDisplay = [...emails];
    if (onlyStarred) emailsToDisplay = emails.filter((e) => e.starred === true);
    if (hideRead)
        emailsToDisplay = emailsToDisplay.filter((e) => e.read === false);

    const setStarred = (email, starred) => {
        const updatedEmails = [...emails];
        for (let i = 0; i < updatedEmails.length; i++) {
            if (updatedEmails[i] === email) {
                updatedEmails[i].starred = starred;
            }
        }
        setEmails(updatedEmails);
    };

    const setRead = (email, read) => {
        const updatedEmails = [...emails];
        for (let i = 0; i < updatedEmails.length; i++) {
            if (updatedEmails[i] === email) {
                updatedEmails[i].read = read;
            }
        }
        setEmails(updatedEmails);
    };

    return (
        <div className="app">
            <Header />
            <nav className="left-menu">
                <ul className="inbox-list">
                    <li
                        className={onlyStarred ? "item" : "item active"}
                        onClick={() => {
                            setOnlyStarred(false);
                        }}
                    >
                        <span className="label">Inbox</span>
                        <span className="count">{numUnreadEmails}</span>
                    </li>
                    <li
                        className={onlyStarred ? "item active" : "item"}
                        onClick={() => {
                            setOnlyStarred(true);
                        }}
                    >
                        <span className="label">Starred</span>
                        <span className="count">{numStarredEmails}</span>
                    </li>

                    <li className="item toggle">
                        <label for="hide-read">Hide read</label>
                        <input
                            id="hide-read"
                            type="checkbox"
                            checked={hideRead}
                            onChange={(event) => {
                                setHideRead(event.target.checked);
                            }}
                        />
                    </li>
                </ul>
            </nav>
            <main className="emails">
                {emailsToDisplay.map((email) => (
                    <li className={email.read ? "email read" : "email"}>
                        <div className="select">
                            <input
                                className="select-checkbox"
                                type="checkbox"
                                checked={email.read}
                                onChange={(event) =>
                                    setRead(email, event.target.checked)
                                }
                            />
                        </div>
                        <div className="star">
                            <input
                                className="star-checkbox"
                                type="checkbox"
                                checked={email.starred}
                                onChange={(event) =>
                                    setStarred(email, event.target.checked)
                                }
                            />
                        </div>
                        <div className="sender">{email.sender}</div>
                        <div className="title">{email.title}</div>
                    </li>
                ))}
            </main>
        </div>
    );
}

export default App;
