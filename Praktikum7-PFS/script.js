const API_URL = "backend";

const form = document.getElementById("mahasiswa-form");
const idInput = document.getElementById("id");
const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const mahasiswaList = document.getElementById("mahasiswa-list");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Menampilkan data mahasiswa
async function loadMahasiswa() {
  try {
    const response = await fetch(`${API_URL}/read.php`);
    const result = await response.json();

    mahasiswaList.innerHTML = "";

    if (!result.success || result.data.length === 0) {
      mahasiswaList.innerHTML = `
                <tr>
                    <td colspan="5">Belum ada data mahasiswa</td>
                </tr>
            `;
      return;
    }

    result.data.forEach((mahasiswa, index) => {
      const row = document.createElement("tr");

      const values = [
        index + 1,
        mahasiswa.nama,
        mahasiswa.nim,
        mahasiswa.created_at,
      ];

      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value ?? "";
        row.appendChild(cell);
      });

      const actionCell = document.createElement("td");

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => editMahasiswa(mahasiswa);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Hapus";
      deleteButton.style.backgroundColor = "#e74c3c";
      deleteButton.onclick = () => deleteMahasiswa(mahasiswa.id);

      actionCell.append(editButton, deleteButton);
      row.appendChild(actionCell);

      mahasiswaList.appendChild(row);
    });
  } catch (error) {
    mahasiswaList.innerHTML = `
            <tr>
                <td colspan="5">Gagal mengambil data mahasiswa</td>
            </tr>
        `;
    console.error(error);
  }
}

// Menambahkan dan mengubah data mahasiswa
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const id = idInput.value;
  const nama = namaInput.value.trim();
  const nim = nimInput.value.trim();

  if (!nama || !nim) {
    alert("Nama dan NIM harus diisi!");
    return;
  }

  const isEdit = Boolean(id);

  try {
    const response = await fetch(
      `${API_URL}/${isEdit ? "update" : "create"}.php`,
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, nama, nim }),
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Gagal menyimpan data");
    }

    alert(result.message);
    resetForm();
    loadMahasiswa();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

// Mengisi form untuk mengedit data
function editMahasiswa(mahasiswa) {
  idInput.value = mahasiswa.id;
  namaInput.value = mahasiswa.nama;
  nimInput.value = mahasiswa.nim;

  formTitle.textContent = "Edit Mahasiswa";
  submitBtn.textContent = "Update Data";
  cancelBtn.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Menghapus data mahasiswa
async function deleteMahasiswa(id) {
  if (!confirm("Apakah kamu yakin ingin menghapus data ini?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/delete.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Gagal menghapus data");
    }

    alert(result.message);
    loadMahasiswa();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

// Mengosongkan form
function resetForm() {
  form.reset();
  idInput.value = "";

  formTitle.textContent = "Tambah Mahasiswa";
  submitBtn.textContent = "Simpan Data";
  cancelBtn.hidden = true;
}

// Tombol batal edit
cancelBtn.addEventListener("click", resetForm);

// Memuat data saat halaman dibuka
loadMahasiswa();
