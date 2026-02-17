document.addEventListener("DOMContentLoaded", function () {

  /* =============================
     LOAD DATA FROM CONFIG
  ============================== */

  // Couple Names
  document.getElementById("coupleNames").innerText =
    CONFIG.couple.groom.shortName + " & " +
    CONFIG.couple.bride.shortName;

  document.getElementById("weddingDate").innerText =
    CONFIG.wedding.dateDisplay;

  document.getElementById("groomName").innerText =
    CONFIG.couple.groom.fullName;

  document.getElementById("brideName").innerText =
    CONFIG.couple.bride.fullName;

  // Event Details
  document.getElementById("akadDate").innerText =
    CONFIG.wedding.akad.date;

  document.getElementById("akadTime").innerText =
    CONFIG.wedding.akad.time;

  document.getElementById("akadLocation").innerText =
    CONFIG.wedding.akad.location;

  document.getElementById("akadMap").href =
    CONFIG.wedding.akad.maps;

  document.getElementById("resepsiDate").innerText =
    CONFIG.wedding.resepsi.date;

  document.getElementById("resepsiTime").innerText =
    CONFIG.wedding.resepsi.time;

  document.getElementById("resepsiLocation").innerText =
    CONFIG.wedding.resepsi.location;

  document.getElementById("resepsiMap").href =
    CONFIG.wedding.resepsi.maps;

  // Gift
  document.getElementById("bankNumber").innerText =
    CONFIG.gift.accountNumber;


  /* =============================
     AUTO GUEST NAME FROM URL
  ============================== */

  const urlParams = new URLSearchParams(window.location.search);
  const guest = urlParams.get("to");

  if (guest) {
    document.getElementById("guestName").innerText =
      decodeURIComponent(guest);
  }


  /* =============================
     COUNTDOWN
  ============================== */

  const countdownDate = new Date(CONFIG.wedding.countdownDate).getTime();

  const timer = setInterval(function () {

    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
      `<div class="time-box">${days}<span>Hari</span></div>
       <div class="time-box">${hours}<span>Jam</span></div>
       <div class="time-box">${minutes}<span>Menit</span></div>
       <div class="time-box">${seconds}<span>Detik</span></div>`;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Acara Sedang Berlangsung";
    }

  }, 1000);


  /* =============================
     OPEN INVITATION
  ============================== */

  const openBtn = document.getElementById("openInvitation");
  const cover = document.getElementById("cover");
  const mainContent = document.getElementById("mainContent");
  const music = document.getElementById("bgMusic");

  mainContent.style.display = "none";

  openBtn.addEventListener("click", function () {

    cover.style.opacity = "0";
    cover.style.transition = "1s ease";

    setTimeout(() => {
      cover.style.display = "none";
      mainContent.style.display = "block";

      if (CONFIG.music.autoplay) {
        music.play();
      }

    }, 1000);

  });


  /* =============================
     RSVP WHATSAPP
  ============================== */

  document.getElementById("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const status = document.getElementById("status").value;
    const ucapan = document.getElementById("ucapan").value;

    const pesan =
      `Assalamu'alaikum.%0A%0A` +
      `Konfirmasi Kehadiran:%0A` +
      `Nama: ${nama}%0A` +
      `Status: ${status}%0A` +
      `Ucapan: ${ucapan}`;

    const url =
      `https://wa.me/${CONFIG.rsvp.phoneNumber}?text=${pesan}`;

    window.open(url, "_blank");
  });

});


/* =============================
   COPY REKENING
============================== */

function copyRek() {

  const rek = CONFIG.gift.accountNumber;

  navigator.clipboard.writeText(rek).then(function () {
    alert("Nomor rekening berhasil disalin");
  });

}