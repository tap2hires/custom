const container = document.querySelector(".container1");
const boxContainer = document.getElementById("boxContainer1");
const navigationLeft = container.querySelector(".navigation-left1");
const navigationRight = container.querySelector(".navigation-right1");

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

navigationLeft.addEventListener("click", () => {
  container.scrollTo({
    left: container.scrollLeft - 150,
    behavior: "smooth",
  });
});

navigationRight.addEventListener("click", () => {
  container.scrollTo({
    left: container.scrollLeft + 150,
    behavior: "smooth",
  });
});

boxContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - boxContainer.offsetLeft;
  scrollLeft = container.scrollLeft;
});

boxContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});

boxContainer.addEventListener("mouseup", () => {
  isDragging = false;
});

boxContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - boxContainer.offsetLeft;
  const walk = (x - startX) * 3; // Adjust scrolling speed here
  container.scrollLeft = scrollLeft - walk;
});

boxContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX - boxContainer.offsetLeft;
  scrollLeft = container.scrollLeft;
});

boxContainer.addEventListener("touchend", () => {
  isDragging = false;
});

boxContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].clientX - boxContainer.offsetLeft;
  const walk = (x - startX) * 3; // Adjust scrolling speed here
  container.scrollLeft = scrollLeft - walk;
});