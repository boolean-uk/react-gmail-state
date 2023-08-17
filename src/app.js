import Header from "./components/header.js";

import initialEmails from "./data/emails.js";

import { useState } from "react";

import "./styles/app.css";

function App() {
    // Use initialEmails for state
    // console.log(initialEmails);
    const [emails, setEmails] = useState(initialEmails);
    console.log(emails);
    const toggleFunction = (emailId) => {

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
            <main className="emails">
                {emails.map((email,index) => (
                    <li  key={index} className={`email ${email.read ? "read" : "unread"}`}>
                        <div className="select">
                            <input
                                className="select-checkbox"
                                type="checkbox"
                                checked={email.read}
                                onChange={() => toggleFunction(email.id)}
                            />
                        </div>
                        <div className="star">
                            <input className="star-checkbox" type="checkbox" />
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
