// portfolio
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const hideIframe = document.querySelector(".hide_iframe");

projects.forEach((project) => {
  // inside
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // outside
  project.addEventListener("click", () => {
    if (window.innerWidth > 1100) {
      //iFrame
      const ImageWrapper = document.createElement("div");
      ImageWrapper.className = "project_img_wrapper";
      container.appendChild(ImageWrapper);

      // iImage;
      const InwrapperImg = document.createElement("img");
      InwrapperImg.className = "project_img";

      // find img path and set it in InwrapperImg
      const imgPath = project.firstElementChild
        .getAttribute("src")
        .split(".")[1];

      InwrapperImg.setAttribute("src", `.${imgPath}-big.jpg`);
      ImageWrapper.appendChild(InwrapperImg);

      //hide body scroll bar
      document.body.style.overflow = "hidden";

      // hide entire iframe and show back body scroll bar
      hideIframe.classList.add("show_close_button");

      hideIframe.onclick = () => {
        hideIframe.classList.remove("show_close_button");
        ImageWrapper.remove();
        document.body.style.overflow = "scroll";
      };
    }
  });
});
