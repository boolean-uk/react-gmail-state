
function EmailRender (){
    
    
    {initialEmails.map((email) => (
        <li className="email" key={email.id}>
        <div className="select">
          <input
            className="select-checkbox"
            type="checkbox" />
        </div>
        <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    ))}
}