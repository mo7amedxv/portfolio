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
