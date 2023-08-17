import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="left-menu">
      <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>

        <div className="logo-img">
        <img
          src="/voldemort.png"
          alt="VoldEmail logo"
        />
        <span className="logo-text">VoldEmail</span>
      </div>
      </div>
      <div className="search">
        <input className="search-bar" placeholder="Harry Potter. The boy who lived, come to die. Avada KedavrO" />
      </div>
    </header>
  )
}

export default Header
