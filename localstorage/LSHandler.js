export function saveToLS(key, value) {
  if (localStorage.getItem(key)) {
    localStorage.setItem(
      key,
      localStorage.getItem(key) + "," + JSON.stringify(value)
    );
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// export function loadFromLS(key) {
//   JSON.parse(localStorage.getItem(key));
//   console.log(key);
// }
