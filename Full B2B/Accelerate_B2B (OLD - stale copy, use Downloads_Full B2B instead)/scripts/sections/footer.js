
const yearTarget = document.querySelector(".footer__year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
