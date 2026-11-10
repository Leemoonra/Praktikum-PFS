function DashboardStats({ stats }) {
  const items = [
    {
      title: "Total Pasien",
      value: stats.total,
      description: "Jumlah pasien terdaftar",
      icon: "👥",
    },
    {
      title: "Pasien Baru",
      value: stats.newPatients,
      description: "Pasien yang baru mendaftar",
      icon: "🆕",
    },
    {
      title: "Dalam Penanganan",
      value: stats.inProgress,
      description: "Pasien sedang ditangani",
      icon: "🩺",
    },
    {
      title: "Selesai",
      value: stats.completed,
      description: "Penanganan telah selesai",
      icon: "✅",
    },
  ];

  return (
    <div className="stats-grid">
      {items.map((item) => (
        <article className="stat-card" key={item.title}>
          <div className="stat-icon">{item.icon}</div>
          <p>{item.title}</p>
          <h3>{item.value}</h3>
          <small>{item.description}</small>
        </article>
      ))}
    </div>
  );
}

export default DashboardStats;
