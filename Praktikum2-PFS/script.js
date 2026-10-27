console.log("Praktikum JavaScript dimulai");

// 1. Ubah Warna Judul menggunakan getElementById()
const btnWarna = document.getElementById("btnWarna");

btnWarna.addEventListener("click", function () {
    const judul = document.getElementById("judul");
    judul.style.color = "#e63946";
});

// 2. Tampilkan Pesan Baru menggunakan getElementsByClassName()
const btnPesan = document.getElementById("btnPesan");

btnPesan.addEventListener("click", function () {
    const pesan = document.getElementsByClassName("pesan")[0];
    pesan.textContent = "Terima kasih telah mengunjungi halaman biodata!";
});

// 3. Ubah Nama Elemen Tag <p> menggunakan getElementsByTagName()
const btnParagraf = document.getElementById("btnParagraf");

btnParagraf.addEventListener("click", function () {
    const paragraf = document.getElementsByTagName("p");

    paragraf[0].textContent =
        "Biodata Mahasiswa Program Studi Teknologi Informasi";
});

// 4. Ubah Nilai Input Nama menggunakan getElementsByName()
const btnNama = document.getElementById("btnNama");

btnNama.addEventListener("click", function () {
    const inputNama = document.getElementsByName("namaMahasiswa")[0];

    inputNama.value = "Miftahul Jannah Az-Zahra";
});

// 5. Ubah Semua Elemen Sekaligus menggunakan querySelectorAll()
const btnSemua = document.getElementById("btnSemua");

btnSemua.addEventListener("click", function () {
    const semuaElemen = document.querySelectorAll(
        "h1, .deskripsi, .biodata p, label"
    );

    semuaElemen.forEach(function (elemen) {
        elemen.style.color = "#008000";
    });

    const judul = document.querySelectorAll("h1");
    judul[0].textContent = "Biodata Mahasiswa - Diubah";

    const pesan = document.querySelectorAll(".pesan");
    pesan[0].textContent = "Semua elemen berhasil diubah!";
});
