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
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuBtn.classList.toggle("show");
});
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
