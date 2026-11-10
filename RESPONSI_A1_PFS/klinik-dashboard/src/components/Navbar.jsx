function Navbar({ activeMenu }) {
  return (
    <header className="topbar">
      <div>
        <h5>{activeMenu}</h5>
        <p>Ringkasan informasi pelayanan pasien</p>
      </div>

      <div className="admin-profile">
        <div className="admin-avatar">A</div>
        <div>
          <strong>Admin Klinik</strong>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
