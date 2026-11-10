const menus = [
  { icon: "⌂", label: "Dashboard" },
  { icon: "♙", label: "Data Pasien" },
  { icon: "▤", label: "Rekam Medis" },
  { icon: "✚", label: "Poliklinik" },
  { icon: "⚕", label: "Dokter" },
  { icon: "⚙", label: "Pengaturan" },
];

function Sidebar({ activeMenu, onMenuChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">+</div>
        <div>
          <h2>MedCare</h2>
          <p>Healthcare Management</p>
        </div>
      </div>

      <div className="sidebar-profile">
        <div className="profile-icon">M</div>
        <div>
          <strong>Medical Center</strong>
          <span>Administrator Panel</span>
        </div>
      </div>

      <p className="menu-title">MENU UTAMA</p>

      <nav className="sidebar-menu">
        {menus.map((menu) => (
          <button
            type="button"
            key={menu.label}
            className={
              activeMenu === menu.label ? "menu-item active" : "menu-item"
            }
            onClick={() => onMenuChange(menu.label)}
          >
            <span className="menu-icon">{menu.icon}</span>
            <span>{menu.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="online-dot"></span>
        <span>System Online</span>
      </div>
    </aside>
  );
}

export default Sidebar;
