$(document).ready(function () {
  // Menampilkan atau menyembunyikan bio ketika tombol diklik.
  $("#bioButton").click(function () {
    $("#bio").toggle(300);
  });

  // Mengubah teks nama dan perkenalan ketika tombol diklik.
  $("#editButton").click(function () {
    $("#nama").text("Halo, saya Miftahul Jannah!");
    $("#bio").html(
      "Saya sedang belajar <strong>jQuery</strong> untuk membuat halaman web yang interaktif.",
    );
    $("#nama").css("color", "#5544c6");
  });

  // Menampilkan atau menyembunyikan pesan minat dengan efek slide.
  $("#skillsButton").click(function () {
    $("#skillsMessage").slideToggle(350);
  });

  // Mengubah warna dan ukuran avatar ketika kursor diarahkan ke atasnya.
  $("#avatar").hover(
    function () {
      $(this).css({
        "background-color": "#5544c6",
        color: "#ffffff",
        transform: "scale(1.08)",
      });
    },
    function () {
      $(this).css({
        "background-color": "#e8e4ff",
        color: "#4939b8",
        transform: "scale(1)",
      });
    },
  );

  // Menampilkan kartu profil menggunakan efek fadeIn.
  $(".profile-card").hide().fadeIn(700);

  // Memberikan animasi perubahan jarak huruf pada judul.
  $(".hero h1").animate(
    {
      letterSpacing: "1px",
    },
    500,
  );
});
