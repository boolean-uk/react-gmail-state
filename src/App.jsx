import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
	// Use initialEmails for state
	console.log(initialEmails);

	const [emails, setEmails] = useState(initialEmails);

	const toggleRead = (clickedEmail) => {
		const updatedEmails = emails.map((email) =>
			email.id === clickedEmail.id ? { ...email, read: !email.read } : email
		);

		setEmails(updatedEmails);
	};

	const toggleStar = (clickedEmail) => {
		const updatedEmails = emails.map((email) =>
			email.id === clickedEmail.id
				? { ...email, starred: !email.starred }
				: email
		);

		setEmails(updatedEmails);
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
						<span className="count">{emails.length}</span>
					</li>
					<li
						className="item"
						// onClick={() => {}}
					>
						<span className="label">Starred</span>
						<span className="count">
							{emails.filter((email) => email.starred === true).length}
						</span>
					</li>

					<li className="item toggle">
						<label htmlFor="hide-read">Hide read</label>
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
				{emails.map((email, index) => {
					return (
						<li
							className={`email ${email.read ? "read" : "unread"}`}
							key={index}
						>
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
					);
				})}
			</main>
		</div>
	);
}

export default App;
