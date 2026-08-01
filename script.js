const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;
themeBtn.addEventListener("click", (e) => {
  let next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});
const savedItem = localStorage.getItem("theme");
if (savedItem) {
  root.dataset.theme = savedItem;
}
const menuBtn = document.getElementById("navToggle");
const navLinksContainer = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("show");
  menuBtn.classList.toggle("show");
});
const navSections = document.querySelectorAll("section[id]");
const navAnchorLinks = document.querySelectorAll("header a[href^='#']");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navAnchorLinks.forEach((link) => {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-link");
          }
        });
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
);
navSections.forEach((section) => navObserver.observe(section));
const sections = document.querySelectorAll(".container");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hide-up");
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
        if (entry.boundingClientRect.top < 0) {
          entry.target.classList.add("hide-up");
        } else {
          entry.target.classList.remove("hide-up");
        }
      }
    });
  },
  { threshold: 0.1 },
);
const footer = document.querySelector("footer");
if (footer) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchorLinks.forEach((link) =>
            link.classList.remove("active-link"),
          );
        }
      });
    },
    { threshold: 0.5 },
  );
  footerObserver.observe(footer);
}
sections.forEach((section) => {
  observer.observe(section);
});
(function () {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const preview = document.getElementById("project-preview");
  const previewImg = preview.querySelector("img");
  const projects = document.querySelectorAll(".project[data-preview-image]");
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;
  const ease = 0.15;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX + 28;
    mouseY = e.clientY - 90;
  });
  function animate() {
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    preview.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  projects.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      const src = project.dataset.previewImage;
      if (previewImg.getAttribute("src") !== src) {
        previewImg.setAttribute("src", src);
      }
      preview.classList.add("is-visible");
    });
    project.addEventListener("mouseleave", () => {
      preview.classList.remove("is-visible");
    });
  });
})();
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact form");
  const popup = document.getElementById("form-error-popup");
  const popupMessage = document.getElementById("form-error-message");
  let hideTimeout;
  form.setAttribute("novalidate", "");
  function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove("invisible", "opacity-0");
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function () {
      popup.classList.add("invisible", "opacity-0");
    }, 3000);
  }
  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  }
  const focusableFields = Array.from(
    form.querySelectorAll("input, textarea, select"),
  );
  focusableFields.forEach(function (field, index) {
    field.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && field.tagName !== "TEXTAREA") {
        e.preventDefault();
        const next = focusableFields[index + 1];
        if (next) {
          next.focus();
        } else {
          form.requestSubmit();
        }
      }
    });
  });
  form.addEventListener("submit", function (e) {
    const fields = form.querySelectorAll("[required]");
    let firstEmpty = null;
    fields.forEach(function (field) {
      if (!field.value.trim() && !firstEmpty) {
        firstEmpty = field;
      }
    });
    if (firstEmpty) {
      e.preventDefault();
      showPopup("Please fill in all fields before sending.");
      firstEmpty.focus();
      return;
    }
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !isValidEmail(emailField.value)) {
      e.preventDefault();
      showPopup("Please enter a valid email address.");
      emailField.focus();
      return;
    }
  });
});
