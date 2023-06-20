// Progress button
const progressBar = document.querySelector(".progress_bar");
const halfCircles = document.querySelectorAll(".half_circle");
const halfCircleTop = document.querySelector(".half_circle_top");
const progressBarCircle = document.querySelector(".progress_bar_circle");

function progressBarSet() {
  const pageHeight = document.documentElement.scrollHeight;
  const pageViewportHeight = window.innerHeight;
  const scrolledPortion = window.pageYOffset;

  if (scrolledPortion >= 750) {
    progressBar.style.bottom = `29.5%`;
  } else {
    progressBar.style.bottom = `-20%`;
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  if (scrolledPortionDegree >= 359) {
    progressBarCircle.classList.add("progress_turn_up");
  } else {
    progressBarCircle.classList.remove("progress_turn_up");
  }

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = `rotate(180deg)`;
      halfCircleTop.style.opacity = "0";
    } else {
      halfCircleTop.style.opacity = "1";
    }
  });
}

document.addEventListener("scroll", progressBarSet);
