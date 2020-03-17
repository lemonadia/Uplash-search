const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input"); //just in case we have more input in the page
const accessKey = "tHSICgFNUZYtXRwNcuJY6czODrEbLFE-EXfuYDhfbmc";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=blue";

const searchUnsplash = function(term) {
  return fetch(apiUrl, {
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
          imageSrc: result.urls.regular
        };
      });
    });
};

// when we submit the form get the info from input
formTag.addEventListener("submit", function(event) {
  //get the info from input
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm);
  event.preventDefault();
});
