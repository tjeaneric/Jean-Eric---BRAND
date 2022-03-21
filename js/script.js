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

const sectionHeroEl = document.querySelector(".hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    //when 0% of the hero section is in the viewport
    threshold: 0,
    rootMargin: "-40px",
  }
);
obs.observe(sectionHeroEl);

//ACTIVE NAV LINK ON SCROLL

const sections = document.querySelectorAll("section");

const nav = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY > sectionTop) {
      current = section.getAttribute("id");
    }
  });
  nav.forEach((a) => {
    a.classList.remove("active");
    if (a.classList.contains(current)) {
      a.classList.add("active");
    }
  });
});

// FIREBASE INTEGRATION

const form = document.querySelector(".login-form");
const messageForm = document.querySelector(".contact-form");
console.log(messageForm.name.value);

const firebaseConfig = {
  apiKey: "AIzaSyAZtamg7ALb_AZ4mDFwSJ7ld9p7O0R-3os",
  authDomain: "jean-eric-brand.firebaseapp.com",
  projectId: "jean-eric-brand",
  storageBucket: "jean-eric-brand.appspot.com",
  messagingSenderId: "210719210014",
  appId: "1:210719210014:web:18abc9d2f5b01745dc4c0f",
  measurementId: "G-8HW0N7MV50",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// USER AUTHENTICATION

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = form.email.value;
  let password = form.password.value;

  fetch("https://jean-eric-brand-api.herokuapp.com/api/v1/users/login", {
    method: "POST",
    headers: {
      Accept: "application/JSON,text/plain,*/*,",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(data);
        window.location.href = "/dashboard/dashboard.html";
        // window.localStorage.setItem("access_token", data.token);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // app
  //   .auth()
  //   .signInWithEmailAndPassword(form.email.value, form.••••••••••password.value)
  //   .then((userCredential) => {
  //     // Signed in
  //     var user = userCredential.user;
  //     console.log("logged in");

  //     window.location.href = "/dashboard/dashboard.html";
  //     // ...
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     alert(errorMessage);
  //   });
});

// FORM SUBMISSION

// const db = app.firestore();

// const postMessage = async (url = "", data = {}) => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/JSON,text/plain,*/*,",
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   return response;
// };

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  fetch("https://jean-eric-brand-api.herokuapp.com/api/v1/messages", {
    method: "POST",
    headers: {
      Accept: "application/JSON,text/plain,*/*,",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      subject: subject,
      message: message,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == 200) {
        alert("Message sent");
        console.log(data);
      } else {
        alert(data.error);
      }
    });

  messageForm.reset();
});

// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let name = document.getElementById("name").value;
//   let email = document.getElementById("email").value;
//   let subject = document.getElementById("subject").value;
//   let message = document.getElementById("message").value;

//   const messageData = {
//     name: name,
//     email: email,
//     subject: subject,
//     message: message,
//   };

//   postMessage(
//     "https://jean-eric-brand-api.herokuapp.com/api/v1/messages",
//     messageData
//   ).then((data) => {
//     if (data.status == 201) {
//       alert("Message sent");
//     } else {
//       alert("Message not sent");
//     }
//   });

// db.collection("Messages")
//   .add({
//     Name: name,
//     Email: email,
//     Subject: subject,
//     Message: message,
//   })
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//     alert("Message sent");
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//     alert(error);
//   });

//   messageForm.reset();
// });

// RENDER BLOG POSTS

const blogPost = document.querySelector("#blog-post");

function renderArticle(doc) {
  let figure = document.createElement("figure");
  let image = document.createElement("img");
  let cardBox = document.createElement("div");
  let articleTitle = document.createElement("h3");
  let articleDetails = document.createElement("p");
  let blogDate = document.createElement("div");
  let dateValue = document.createElement("strong");
  let readMore = document.createElement("a");

  figure.className = "blog-card";
  figure.setAttribute("article_id", doc._id);
  console.log(doc._id);
  image.src = doc.photo;
  articleTitle.textContent = doc.title;
  articleDetails.textContent = doc.preview;
  dateValue.textContent = doc.createdAt;

  blogDate.className = "blog-date";
  readMore.setAttribute("href", "");
  readMore.className = "read-more";
  readMore.textContent = "Read more >";
  blogDate.appendChild(dateValue);
  blogDate.appendChild(readMore);

  cardBox.className = "card-box";
  cardBox.appendChild(articleTitle);
  cardBox.appendChild(articleDetails);
  cardBox.appendChild(blogDate);
  figure.appendChild(image);
  figure.appendChild(cardBox);

  blogPost.appendChild(figure);

  readMore.addEventListener("click", function (e) {
    e.preventDefault();
    let id =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "article_id"
      );

    window.location.href = `/blog-detail/detail.html?article_id=${id}`;
  });
}

// db.collection("Posts")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       renderMessage(doc);
//     });
//   });

const fetchArticles = function () {
  fetch("https://jean-eric-brand-api.herokuapp.com/api/v1/articles")
    .then((response) => response.json())
    .then((data) => {
      const articles = data.data.data;
      console.log(articles);
      articles.forEach((article) => {
        renderArticle(article);
      });
    });
};

fetchArticles();
