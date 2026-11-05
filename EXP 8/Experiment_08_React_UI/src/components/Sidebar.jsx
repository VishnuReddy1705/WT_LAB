function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <ul className="sidebar-links">
          <li><a href="#home" onClick={onClose}>📊 Dashboard</a></li>
          <li><a href="#courses" onClick={onClose}>📚 Courses</a></li>
          <li><a href="#tasks" onClick={onClose}>✅ Tasks</a></li>
          <li><a href="#profile" onClick={onClose}>👤 Profile</a></li>
        </ul>
      </aside>
      {open && <div className="overlay" onClick={onClose}></div>}
    </>
  );
}

export default Sidebar;
