import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
	// Use initialEmails for state
	console.log(initialEmails);

	const [emails, setEmails] = useState(initialEmails);
	const [hideRead, setHideRead] = useState(false);
	const [selectedTab, setSelectedTab] = useState("inbox");

	const TabsEnum = Object.freeze({
		INBOX: "inbox",
		STARRED: "starred",
	});

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

	const toggleHideRead = () => {
		setHideRead(!hideRead);
	};

	const getFilteredEmails = () => {
		let filteredEmails = [...emails];

		filteredEmails = filterReadEmails(filteredEmails);
		filteredEmails = filterNotStarredEmails(filteredEmails);

		return filteredEmails;
	};

	const filterReadEmails = (filteredEmails) => {
		if (hideRead) {
			return filteredEmails.filter((email) => email.read === false);
		}
		return filteredEmails;
	};

	const filterNotStarredEmails = (filteredEmails) => {
		if (selectedTab === "starred") {
			return filteredEmails.filter((email) => email.starred === true);
		}
		return filteredEmails;
	};

	const selectTab = (event) => {
		const selectedTabName = event.target.textContent.toLowerCase();
		setSelectedTab(selectedTabName);
	};

	return (
		<div className="app">
			<Header />
			<nav className="left-menu">
				<ul className="inbox-list">
					<li
						className={`item ${selectedTab === TabsEnum.INBOX ? "active" : ""}`}
					>
						<span className="label" onClick={(event) => selectTab(event)}>
							Inbox
						</span>
						<span className="count">{emails.length}</span>
					</li>
					<li
						className={`item ${
							selectedTab === TabsEnum.STARRED ? "active" : ""
						}`}
					>
						<span className="label" onClick={(event) => selectTab(event)}>
							Starred
						</span>
						<span className="count">
							{emails.filter((email) => email.starred === true).length}
						</span>
					</li>

					<li className="item toggle">
						<label htmlFor="hide-read">Hide read</label>
						<input
							id="hide-read"
							type="checkbox"
							checked={hideRead}
							onChange={() => {
								toggleHideRead();
							}}
						/>
					</li>
				</ul>
			</nav>
			<main className="emails">
				{getFilteredEmails().map((email, index) => {
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
