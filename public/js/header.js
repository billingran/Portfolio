// nav backgorund
let navLogo = document.querySelector(".nav_container");
let headerBackground = document.querySelector(".nav_container");

function turnDark() {
  if (window.pageYOffset) {
    navLogo.classList.add("turnblack");
    navLogo.classList.add("active");
    headerBackground.style =
      "background-color:rgba(0,0,0,0.3); box-shadow: 0 8px 6px -6px rgba(0,0,0,0.3);";
  } else {
    navLogo.classList.remove("turnblack");
    navLogo.classList.remove("active");
    headerBackground.style = "";
  }
}

window.addEventListener("scroll", turnDark);

// menutoggle
let menuToggle = document.querySelector(".menuToggle");
let navigation = document.querySelector(".nav_switch_container");
let navigationContent = document.querySelector(".nav_content_container");

menuToggle.addEventListener("click", (e) => {
  navigation.classList.toggle("active");
  navigationContent.classList.toggle("show-menu");
});

//hide menu
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.querySelector(".nav_content_container");
  navMenu.classList.remove("show-menu");
  navigation.classList.toggle("active");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*Scroll section and avtive link mixed*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_icon"
        )
        .classList.add("active-link");
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_text"
        )
        .classList.add("active-link");
    } else {
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_icon"
        )
        .classList.remove("active-link");
      document
        .querySelector(
          ".nav_content_container a[href*=" + sectionId + "] .nav_text"
        )
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);
