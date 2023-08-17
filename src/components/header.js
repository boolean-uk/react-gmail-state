import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="left-menu">
        <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
        <img
          src="https://www.pngkey.com/png/detail/15-150195_gmail-comments-google-mail-logo-black-and-white.png"
          width= '25px'
          alt="gmail logo"
        />
      </div>
      <div className="search">
        <input className="search-bar" placeholder="Search mail" />
      </div>
    </header>
  )
}

export default Header;