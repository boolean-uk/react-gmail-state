import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";
import "./styles/App.css";

function App() {
	const [emails, setEmails] = useState(initialEmails);
	const [countStarred, setCountStarred] = useState(
		emails.filter((email) => email.starred).length
	);
	const [countUnread, setCountUnread] = useState(
		emails.filter((email) => !email.read).length
	);

	const [hideRead, setHideRead] = useState(false);

	const toggleRead = (id) => {
		const updatedEmails = emails.map((email) => {
			if (email.id === id) {
				email.read = !email.read;
			}
			return email;
		});
		if (hideRead) {
			setEmails(updatedEmails.filter((email) => !email.read));
		} else {
			setEmails(updatedEmails);
		}
		setCountUnread(updatedEmails.filter((email) => !email.read).length);
	};

	const toggleStar = (id) => {
		const updatedEmails = emails.map((email) => {
			if (email.id === id) {
				email.starred = !email.starred;
			}
			return email;
		});
		setEmails(updatedEmails);
		setCountStarred(updatedEmails.filter((email) => email.starred).length);
	};

	console.log(initialEmails);

	return (
		<div className="app">
			<Header />
			<nav className="left-menu">
				<ul className="inbox-list">
					<li className="item active" onClick={() => {}}>
						<span className="label">Inbox</span>
						<span className="count">{countUnread}</span>
					</li>
					<li className="item" onClick={() => {}}>
						<span className="label">Starred</span>
						<span className="count">{countStarred}</span>
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
				{emails
					.filter((email) => !hideRead || !email.read)
					.map((email, index) => (
						<li className="email" key={index}>
							<div className="select">
								<input
									className="select-checkbox"
									type="checkbox"
									checked={email.read}
									onClick={() => toggleRead(email.id)}
								/>
							</div>
							<div className="star">
								<input
									className="star-checkbox"
									type="checkbox"
									checked={email.starred}
									onClick={() => toggleStar(email.id)}
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
