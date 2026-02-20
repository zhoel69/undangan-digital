// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      document.getElementById("cover").classList.add("active");
    }, 1000);
  }, 2000);
});

// NAVIGATION SYSTEM
const menuItems = document.querySelectorAll(".side-menu li");
const sections = document.querySelectorAll(".section");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target");

    sections.forEach(sec => {
      sec.classList.remove("active");
    });

    document.getElementById(target).classList.add("active");
  });
});

// OPEN INVITATION BUTTON
document.getElementById("openInvitation").addEventListener("click", () => {
  document.getElementById("prolog").classList.add("active");
});