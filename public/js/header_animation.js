const lastWord = document.querySelector("#numa");
const animation = document.querySelector("div.animation");
// const text = document.querySelectorAll(".thePast");

// // get text length
// for (let i = 0; i < text.length; i++) {
//   console.log(`text number ${i} length is ${text[i].getTotalLength()}`);
// }

// hide ctn animation
lastWord.addEventListener("animationend", () => {
  animation.style = "transition:all 1s ease; opacity:0; pointer-events:none;";
});

// responsive
if (window.innerWidth < 790) {
  animation.style =
    " height: 0vh; z-index: -1000; opacity:0; pointer-events:none;";
}
