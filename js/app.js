// HTML IDs
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from OMDb API
let getMovie = () => {
  let movieName = movieNameRef.value;
  // Template URL for fetching movie name and API key for OMDb
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // If the input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    // If input field is not empty
  } else {
    fetch(url)
      .then((resp) => resp.json()) // Converting response to JSON
      .then((data) => {
        // If the movie exists in the OMDb database
        if (data.Response == "True") {
          // Displays movie information and details by creating HTML classes
          result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="./images/star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            `;
          // If the movie doesn't exists in the database
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // If error happens
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

// Triggers getMovie function to allow search on click
searchBtn.addEventListener("click", getMovie);
// Starts eventlistener for when the window has loaded, triggers getMovie function
window.addEventListener("load", getMovie);
