export function drawFavPlaces(array) {
  const originalContainer = document.querySelector(".container");
  const container = document.createElement("ol");
  container.className = "container";
  originalContainer.replaceWith(container);
  array.forEach((element) => {
    const card = document.createElement("li");

    card.className = "card";

    card.innerHTML = `${element.locationText}`;

    container.appendChild(card);
  });
}
