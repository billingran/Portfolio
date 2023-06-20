//experience
let firstPart = document.querySelector(".experience_content_first");
let secondtPart = document.querySelector(".experience_content_second");
let education = document.querySelector(".education");
let work = document.querySelector(".work");

education.classList.add("orange_color");

education.addEventListener("click", () => {
  secondtPart.classList.add("hide_exp");
  firstPart.classList.remove("hide_exp");
  education.classList.add("orange_color");
  work.classList.remove("orange_color");
});

work.addEventListener("click", () => {
  firstPart.classList.add("hide_exp");
  secondtPart.classList.remove("hide_exp");
  education.classList.remove("orange_color");
  work.classList.add("orange_color");
});
