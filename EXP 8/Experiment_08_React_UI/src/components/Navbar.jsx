function Navbar({
  darkMode,
  toggleTheme,
  search,
  onSearchChange,
  notifications = [],
  showNotifications,
  toggleNotifications,
  toggleSidebar,
}) {
  return (
    <nav className="navbar">
      <div className="nav-brand-container">
        <button className="menu-btn" onClick={toggleSidebar} title="Toggle Sidebar">
          ☰
        </button>
        <h2>EduDashboard URK24CS1163</h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#courses">Courses</a>
        <a href="#tasks">Tasks</a>
        <a href="#profile">Profile</a>
      </div>

      <div className="nav-actions">
        <div className="notification-wrapper">
          <button className="icon-btn" onClick={toggleNotifications} title="Notifications">
            🔔 {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>
          {showNotifications && (
            <div className="notifications-dropdown">
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                <ul>
                  {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button className="btn theme-btn" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="profile-wrapper" title="Student URK24CS1163">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=URK24CS1163"
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
