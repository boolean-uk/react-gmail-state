import { useState } from "react";
import Header from "./components/header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
    // Use initialEmails for state
    const [state, setState] = useState(initialEmails);

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
                        <label htmlFor="hide-read">Hide read</label>
                        <input
                            id="hide-read"
                            type="checkbox"
                            checked={false}
                            onChange={() => {}}
                        />
                    </li>
                </ul>
            </nav>
            <main className="emails">
                {state.map((email, index) => (
                    <li className="email" key={index}>
                        <div className="select">
                            <input
                                className="select-checkbox"
                                type="checkbox"
                                checked={email.read}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="star">
                            <input
                                className="star-checkbox"
                                type="checkbox"
                                checked={email.starred}
                                onChange={() => {}}
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
