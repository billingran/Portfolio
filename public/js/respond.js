const answer = document.querySelector("div.answer");
const joke = document.querySelector("div.joke");

fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
  .then(function (j) {
    return j.json();
  })
  .then(function (data) {
    answer.innerHTML = data.delivery;
    joke.innerHTML = data.setup;
  });
