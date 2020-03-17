const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input"); //just in case we have more input in the page
const resultsTag = document.querySelector("section.results");

const accessKey = "tHSICgFNUZYtXRwNcuJY6czODrEbLFE-EXfuYDhfbmc";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

const searchUnsplash = function(term) {
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
      Authorization: "Client-ID " + accessKey
    }
  })
    .then(response => response.json())
    .then(data => {
      //formating the results to suit the needs
      return data.results.map(result => {
        return {
          imageSrc: result.urls.regular,
          width: result.width,
          height: result.height,
          name: result.user.name,
          title: result.description || "Untitled",
          color: (result.color || "#cccccc") + "33"
        };
      });
    });
};

// add result to the page

const addResults = function(results) {
  //remve all the loadin tags
  resultsTag.innerHTML = "";
  //loop over each individual result and add the result tag
  results.forEach(result => {
    resultsTag.innerHTML =
      resultsTag.innerHTML +
      `
      <div class="single-result">
        <div class="image" style="background-color: ${result.color}">
          <img src="${result.imageSrc}">
        </div>
        <h2>${result.title}</h2>
        <p>by ${result.name} - ${result.width} x ${result.height}</p>
      </div>

    `;
  });
};

// when we submit the form get the info from input
formTag.addEventListener("submit", function(event) {
  //get the info from input
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm).then(results => {
    addResults(results);
  });
  event.preventDefault();
});
