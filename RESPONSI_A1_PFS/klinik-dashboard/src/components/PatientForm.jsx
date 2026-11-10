import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  medicalRecord: "",
  clinic: "",
  doctor: "",
  visitDate: "",
  status: "Pasien Baru",
};

function PatientForm({ patient, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    setFormData(patient ? { ...patient } : emptyForm);
  }, [patient]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="patient-card patient-form-card">
      <div className="table-heading">
        <div>
          <h3>{patient ? "Edit Data Pasien" : "Tambah Data Pasien"}</h3>
          <p>Lengkapi informasi rekam medis pasien</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="name">Nama Pasien</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div>
            <label htmlFor="medicalRecord">Nomor Rekam Medis</label>
            <input
              id="medicalRecord"
              name="medicalRecord"
              value={formData.medicalRecord}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div>
            <label htmlFor="clinic">Poliklinik Tujuan</label>
            <input
              id="clinic"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
              className="form-control"
              placeholder="Contoh: Poli Umum"
              required
            />
          </div>

          <div>
            <label htmlFor="doctor">Dokter Penanggung Jawab</label>
            <input
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="form-control"
              placeholder="Contoh: Dr. Budi"
              required
            />
          </div>

          <div>
            <label htmlFor="visitDate">Tanggal Kunjungan</label>
            <input
              id="visitDate"
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div>
            <label htmlFor="status">Status Penanganan</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Pasien Baru">Pasien Baru</option>
              <option value="Dalam Penanganan">Dalam Penanganan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Batal
          </button>

          <button type="submit" className="primary-button">
            {patient ? "Simpan Perubahan" : "Tambah Pasien"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
