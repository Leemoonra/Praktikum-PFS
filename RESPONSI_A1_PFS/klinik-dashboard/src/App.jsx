import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import PatientTable from "./components/PatientTable";
import PatientForm from "./components/PatientForm";

const initialPatients = [
  {
    id: 1,
    name: "Andi Saputra",
    medicalRecord: "RM001",
    clinic: "Poli Umum",
    doctor: "Dr. Budi",
    visitDate: "2026-11-01",
    status: "Selesai",
  },
  {
    id: 2,
    name: "Siti Aminah",
    medicalRecord: "RM002",
    clinic: "Poli Gigi",
    doctor: "Dr. Rina",
    visitDate: "2026-11-02",
    status: "Dalam Penanganan",
  },
  {
    id: 3,
    name: "Dewi Lestari",
    medicalRecord: "RM003",
    clinic: "Poli Anak",
    doctor: "Dr. Andi",
    visitDate: "2026-11-03",
    status: "Pasien Baru",
  },
  {
    id: 4,
    name: "Budi Santoso",
    medicalRecord: "RM004",
    clinic: "Poli Jantung",
    doctor: "Dr. Maya",
    visitDate: "2026-11-04",
    status: "Dalam Penanganan",
  },
  {
    id: 5,
    name: "Rina Marlina",
    medicalRecord: "RM005",
    clinic: "Poli Mata",
    doctor: "Dr. Sinta",
    visitDate: "2026-11-05",
    status: "Selesai",
  },
  {
    id: 6,
    name: "Agus Setiawan",
    medicalRecord: "RM006",
    clinic: "Poli Kulit",
    doctor: "Dr. Dimas",
    visitDate: "2026-11-06",
    status: "Dalam Penanganan",
  },
  {
    id: 7,
    name: "Nur Aisyah",
    medicalRecord: "RM007",
    clinic: "Poli Kandungan",
    doctor: "Dr. Maya",
    visitDate: "2026-11-07",
    status: "Pasien Baru",
  },
  {
    id: 8,
    name: "Fajar Ramadhan",
    medicalRecord: "RM008",
    clinic: "Poli Saraf",
    doctor: "Dr. Rina",
    visitDate: "2026-11-08",
    status: "Selesai",
  },
  {
    id: 9,
    name: "Putri Amelia",
    medicalRecord: "RM009",
    clinic: "Poli THT",
    doctor: "Dr. Sinta",
    visitDate: "2026-11-09",
    status: "Dalam Penanganan",
  },
  {
    id: 10,
    name: "Rizky Pratama",
    medicalRecord: "RM010",
    clinic: "Poli Umum",
    doctor: "Dr. Budi",
    visitDate: "2026-11-10",
    status: "Selesai",
  },
];

const clinics = [
  "Poli Umum",
  "Poli Gigi",
  "Poli Anak",
  "Poli Jantung",
  "Poli Mata",
  "Poli Kulit",
  "Poli Kandungan",
  "Poli Saraf",
  "Poli THT",
  "Poli Bedah",
];

const doctors = [
  { name: "Dr. Budi", specialty: "Dokter Umum" },
  { name: "Dr. Rina", specialty: "Dokter Spesialis Anak" },
  { name: "Dr. Andi", specialty: "Dokter Spesialis Anak" },
  { name: "Dr. Maya", specialty: "Dokter Spesialis Jantung" },
  { name: "Dr. Sinta", specialty: "Dokter Spesialis Mata" },
  { name: "Dr. Dimas", specialty: "Dokter Spesialis Kulit" },
  { name: "Dr. Ratna", specialty: "Dokter Spesialis Kandungan" },
  { name: "Dr. Arif", specialty: "Dokter Spesialis Saraf" },
  { name: "Dr. Lina", specialty: "Dokter Spesialis THT" },
  { name: "Dr. Yoga", specialty: "Dokter Spesialis Bedah" },
];

function App() {
  const [patients, setPatients] = useState(initialPatients);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [settings, setSettings] = useState({
    hospitalName: "Medical Center",
    adminName: "Admin Klinik",
    adminRole: "Administrator",
  });

  const stats = useMemo(
    () => ({
      total: patients.length,
      newPatients: patients.filter((p) => p.status === "Pasien Baru").length,
      inProgress: patients.filter((p) => p.status === "Dalam Penanganan")
        .length,
      completed: patients.filter((p) => p.status === "Selesai").length,
    }),
    [patients],
  );

  const handleAdd = () => {
    setEditingPatient(null);
    setShowForm(true);
    setActiveMenu("Data Pasien");
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
    setActiveMenu("Data Pasien");
  };

  const handleSave = (formData) => {
    if (editingPatient) {
      setPatients((current) =>
        current.map((patient) =>
          patient.id === editingPatient.id
            ? { ...formData, id: editingPatient.id }
            : patient,
        ),
      );
    } else {
      setPatients((current) => [...current, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
    setEditingPatient(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus data pasien ini?")) return;

    setPatients((current) => current.filter((patient) => patient.id !== id));
  };

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleSettingsChange = (event) => {
    const { name, value } = event.target;
    setSettings((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const renderContent = () => {
    if (showForm) {
      return (
        <PatientForm
          patient={editingPatient}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingPatient(null);
          }}
        />
      );
    }

    if (activeMenu === "Dashboard") {
      return (
        <>
          <section className="welcome-section">
            <h2>Selamat Datang, Admin!</h2>
            <p>Sistem Informasi Rekam Medis Pasien Klinik / Rumah Sakit</p>
          </section>

          <DashboardStats stats={stats} />

          <PatientTable
            patients={patients}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      );
    }

    if (activeMenu === "Data Pasien") {
      return (
        <PatientTable
          patients={patients}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    }

    if (activeMenu === "Rekam Medis") {
      return (
        <div className="patient-card">
          <div className="table-heading">
            <div>
              <h3>Data Rekam Medis</h3>
              <p>Riwayat kunjungan dan penanganan pasien</p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nomor RM</th>
                  <th>Nama Pasien</th>
                  <th>Poliklinik</th>
                  <th>Dokter</th>
                  <th>Tanggal Kunjungan</th>
                  <th>Status Penanganan</th>
                </tr>
              </thead>

              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td>{index + 1}</td>
                      <td>{patient.medicalRecord}</td>
                      <td>{patient.name}</td>
                      <td>{patient.clinic}</td>
                      <td>{patient.doctor}</td>
                      <td>
                        {new Date(
                          patient.visitDate + "T00:00:00",
                        ).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            patient.status === "Selesai"
                              ? "bg-success"
                              : patient.status === "Dalam Penanganan"
                                ? "bg-warning text-dark"
                                : "bg-info text-dark"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Belum ada data rekam medis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeMenu === "Poliklinik") {
      return (
        <div className="patient-card">
          <div className="table-heading">
            <div>
              <h3>Daftar Poliklinik</h3>
              <p>Daftar layanan poliklinik yang tersedia</p>
            </div>
          </div>

          <div className="simple-list">
            {clinics.map((clinic, index) => (
              <div className="simple-list-item" key={clinic}>
                <span className="simple-list-number">{index + 1}</span>
                <strong>{clinic}</strong>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeMenu === "Dokter") {
      return (
        <div className="patient-card">
          <div className="table-heading">
            <div>
              <h3>Daftar Dokter</h3>
              <p>Informasi dokter dan bidang spesialisasi</p>
            </div>
          </div>

          <div className="doctor-grid">
            {doctors.map((doctor, index) => (
              <div className="doctor-card" key={doctor.name}>
                <div className="doctor-avatar">
                  {doctor.name.replace("Dr. ", "").charAt(0)}
                </div>
                <div>
                  <strong>{doctor.name}</strong>
                  <p>{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeMenu === "Pengaturan") {
      return (
        <div className="patient-card settings-card">
          <div className="table-heading">
            <div>
              <h3>Pengaturan</h3>
              <p>Ubah informasi dasar sistem</p>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              alert("Pengaturan berhasil disimpan.");
            }}
          >
            <div className="settings-form">
              <div>
                <label>Nama Klinik / Rumah Sakit</label>
                <input
                  className="form-control"
                  name="hospitalName"
                  value={settings.hospitalName}
                  onChange={handleSettingsChange}
                  required
                />
              </div>

              <div>
                <label>Nama Administrator</label>
                <input
                  className="form-control"
                  name="adminName"
                  value={settings.adminName}
                  onChange={handleSettingsChange}
                  required
                />
              </div>

              <div>
                <label>Jabatan</label>
                <input
                  className="form-control"
                  name="adminRole"
                  value={settings.adminRole}
                  onChange={handleSettingsChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="app-container">
      <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} />

      <main className="main-content">
        <Navbar activeMenu={activeMenu} />

        <div className="dashboard-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default App;
