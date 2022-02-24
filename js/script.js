"use strict";

// SMOOTH SCROLLING ANIMATIONS
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

//LOGIN WINDOW

const loginLink = document.querySelector(".login-link");
const loginForm = document.querySelector(".login");
const overlay = document.querySelector(".overlay");
const selectionBody = document.body;
const btnCloseModal = document.querySelector(".close-modal");

const openModal = function () {
  loginForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
  selectionBody.classList.add("overflow-body");
};

const closeModal = function () {
  loginForm.classList.add("hidden");
  overlay.classList.add("hidden");
  selectionBody.classList.remove("overflow-body");
};

loginLink.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !loginForm.classList.contains("hidden"))
    closeModal();
});

//STICKY NAVBAR

// const sectionHeroEl = document.querySelector(".main-header");
// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     console.log(ent);
//     if (ent.isIntersecting === false) {
//       document.querySelector(".main-header").classList.add("sticky");
//     }
//   },
//   {
//     root: null,
//     threshold: 0,
//   }
// );
// obs.observe(sectionHeroEl);
