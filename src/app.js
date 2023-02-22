import { useState } from "react";

import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";

function App() {
	// Use initialEmails for state
	console.log(initialEmails);
	const [emails, setEmails] = useState(initialEmails);

	const toggleRead = (email) => {
		console.log(email);
		const read = emails.map((currentEmail) => {
			if (currentEmail === email) {
				const emailCopy = { ...email, read: !email.read };
				return emailCopy;
			} else {
				return currentEmail;
			}
		});
		setEmails(read);
	};

	const toggleStarred = (email) => {
		console.log(email);
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
				{emails.map((email) => {
					return (
						<li
							key={email.id}
							className={email.read ? "email read" : "email unread"}
						>
							<div className="select">
								<input
									onChange={() => toggleRead(email)}
									className="select-checkbox"
									type="checkbox"
								/>
							</div>
							<div className="star">
								<input
									className="star-checkbox"
									type="checkbox"
									onChange={() => toggleStarred(email)}
								/>
							</div>
							<div className="sender">{email.sender}</div>
							<div className="title">{email.title}</div>
						</li>
					);
				})}
			</main>
		</div>
	);
}

export default App;
