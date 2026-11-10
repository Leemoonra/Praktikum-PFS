import { useMemo, useState } from "react";

function PatientTable({ patients, onAdd, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(search) ||
        patient.medicalRecord.toLowerCase().includes(search) ||
        patient.clinic.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "Semua Status" || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchTerm, statusFilter]);

  return (
    <div className="patient-card">
      <div className="table-heading">
        <div>
          <h3>Data Rekam Medis Pasien</h3>
          <p>Kelola informasi pasien dan status penanganan</p>
        </div>

        <button className="primary-button" onClick={onAdd}>
          + Tambah Pasien
        </button>
      </div>

      <div className="table-tools">
        <input
          type="search"
          className="search-input"
          placeholder="Cari nama, nomor RM, atau poliklinik..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>Semua Status</option>
          <option>Pasien Baru</option>
          <option>Dalam Penanganan</option>
          <option>Selesai</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Nama Pasien</th>
              <th>No. Rekam Medis</th>
              <th>Poliklinik</th>
              <th>Dokter</th>
              <th>Tanggal Kunjungan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="patient-name">{patient.name}</td>
                  <td>{patient.medicalRecord}</td>
                  <td>{patient.clinic}</td>
                  <td>{patient.doctor}</td>
                  <td>{patient.visitDate}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        patient.status === "Selesai"
                          ? "status-done"
                          : patient.status === "Dalam Penanganan"
                            ? "status-progress"
                            : "status-new"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => onEdit(patient)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => onDelete(patient.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  Data pasien tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Menampilkan {filteredPatients.length} dari {patients.length} data pasien
      </div>
    </div>
  );
}

export default PatientTable;
