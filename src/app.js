import { useState } from "react";

import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";

function App() {
	// Use initialEmails for state
	const [emails, setEmails] = useState(initialEmails);
	const [hideRead, setHideRead] = useState(false);

	let starredAmount = 0;

	const toggleRead = (email) => {
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
		// Not actually working since it's not re-rendering, but it was fun so left it
		starredAmount++;
		console.log(email, starredAmount);
	};

	const toggleReadList = () => {
		setHideRead(!hideRead);
	};

	// eslint-disable-next-line array-callback-return
	const unreadEmails = emails.filter((email) => {
		if (email.read === false) return email;
	});

	const emailsList = emails.map((email) => {
		return readOrUnread(email);
	});

	const unreadEmailsList = unreadEmails.map((email) => {
		return readOrUnread(email);
	});

	function readOrUnread(email) {
		return (
			<li key={email.id} className={email.read ? "email read" : "email unread"}>
				<div className="select">
					<input
						onChange={() => toggleRead(email)}
						className="select-checkbox"
						type="checkbox"
					/>
				</div>
				<div className="star">
					<input
						onChange={() => toggleStarred(email)}
						className="star-checkbox"
						type="checkbox"
					/>
				</div>
				<div className="sender">{email.sender}</div>
				<div className="title">{email.title}</div>
			</li>
		);
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
						<span className="count">{unreadEmailsList.length}</span>
					</li>
					<li
						className="item"
						// onClick={() => {}}
					>
						<span className="label">Starred</span>
						<span className="count">{starredAmount}</span>
					</li>

					<li className="item toggle">
						<label htmlFor="hide-read">Hide read</label>
						<input
							id="hide-read"
							type="checkbox"
							onChange={() => toggleReadList()}
						/>
					</li>
				</ul>
			</nav>
			<main className="emails">{hideRead ? unreadEmailsList : emailsList}</main>
		</div>
	);
}

export default App;
