
const faqItems = document.querySelectorAll(".faqs__item");
const faqHeads = document.querySelectorAll(".faqs__head");

faqHeads.forEach((head) => {
  head.addEventListener("click", () => {
    const item = head.closest(".faqs__item");
    const isOpen = item.classList.contains("faqs__item--open");

    faqItems.forEach((other) => other.classList.remove("faqs__item--open"));

    if (!isOpen) {
      item.classList.add("faqs__item--open");
    }
  });
});
