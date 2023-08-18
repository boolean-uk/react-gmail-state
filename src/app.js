import Header from "./components/header.js";

import initialEmails from "./data/emails.js";

import { useState } from "react";

import "./styles/app.css";

function App() {
 
    const [emails, setEmails] = useState(initialEmails);
    const [previousState, setPreviousState] = useState([]);
    // const [hideEmails, setHideEmails] = useState(false);

    console.log(emails);
    const toggleFunction = (targetId) => {
        const updatedArray = emails.map((email) =>
            email.id === targetId ? { ...email, read: !email.read } : email
        );
        setEmails(updatedArray);
    };

    const starFunction = (targetId) => {
        const updatedArray = emails.map((email) =>
            email.id === targetId
                ? { ...email, starred: !email.starred }
                : email
        );
        setEmails(updatedArray);
    };
    
    const showAndHideUnreadEmails = (event) => {
        if (event.target.checked) {
            setPreviousState(emails);
            setEmails(emails.filter((e) => !e.read));
        } else {
            setEmails(previousState);
        }
    };

    const viewEmails = (emails) => {
        return emails.map((email) => (
            <li
                key={email.id}
                className={`email ${email.read ? "read" : "unread"}`}
            >
                <div className="select">
                    <input
                        className="select-checkbox"
                        type="checkbox"
                        checked={email.read}
                        onChange={() => toggleFunction(email.id)}
                    />
                </div>
                <div className="star">
                    <input
                        className="star-checkbox"
                        type="checkbox"
                        checked={email.starred}
                        onChange={() => starFunction(email.id)}
                    />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
            </li>
        ));
    };
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
                        <span className="count">

                          {/* this would change to emails.length once I refactor my code */}
                          {initialEmails.length} 

                        </span>
                    </li>
                    <li
                        className="item"
                        // onClick={() => {}}
                    >
                        <span className="label">Starred</span>

                        {/* this would change to filteredEmails.length */}
                        <span className="count">?</span>
                    </li>

                    <li className="item toggle">
                        <label for="hide-read">Hide read</label>
                        <input
                            id="hide-read"
                            type="checkbox"
                            onChange={(event) => {
                                showAndHideUnreadEmails(event);
                            }}
                        />
                    </li>
                </ul>
            </nav>
            <main className="emails">

                {/* {hideEmails
                    ? viewEmails(emails.filter((e) => !e.read))
                    : viewEmails(emails)} */}

                {viewEmails(emails)}
               
            </main>
        </div>
    );
}

export default App;
