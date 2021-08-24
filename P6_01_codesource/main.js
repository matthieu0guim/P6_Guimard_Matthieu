function createAMovie(id = "") {
  async function getURL(cat, url = "") {
    if (cat == "bestMovie") {
      let section = document.getElementById(`${id}`);
      let response = await fetch(
        "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
      );
      let Data = await response.json();
      let deepResponse = await fetch(Data.results[0].url);
      let deepData = await deepResponse.json();
      section.children[0].children[0].innerHTML = deepData.title;
      section.children[0].children[0].setAttribute('Data', Data.results[0].url)
      section.children[0].children[1].innerHTML = deepData.description;
      section.children[0].children[1].setAttribute('Data', Data.results[0].url)
      section.children[1].src = deepData.image_url;
      section.children[1].setAttribute('Data', Data.results[0].url)
    } else if (cat == "bestMovies") {
      let section = document.getElementById(`${id}`);
      let response = await fetch(
        "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"
      );
      let Data = await response.json();
      let i = 0;
      for (let movie of section.children[0].children[0].children) {
        if (i == 0) {
          i = i + 1;
          continue
        } else {
          movie.children[0].children[0].innerHTML = Data.results[i-1].title;
          movie.children[0].children[1].src = Data.results[i-1].image_url;
          movie.children[0].children[1].setAttribute("data", Data.results[i-1].url);
        }
        // cet algo permet d'avoir une seule variable en entrée quand celui de main.js doit en avoir 14
        
        i = i + 1;
      }
    } else if (cat == "Biographie") {
      const bio = document.getElementById(`${id}`);
      let response = await fetch(
        "http://localhost:8000/api/v1/titles/?genre=Biography&sort_by=-imdb_score&page_size=7"
      );
      let Data = await response.json();
      let i = 0;
      for (let movie of bio.children[0].children[0].children) {
        if (i == 0) {
          i = i + 1;
          continue
        } else {
          movie.children[0].children[0].innerHTML = Data.results[i-1].title;
          movie.children[0].children[1].src = Data.results[i-1].image_url;
          movie.children[0].children[1].setAttribute("data", Data.results[i-1].url);
          i = i + 1;
        }
        
      }
    } else if (cat == "Adventure") {
      const aventure = document.getElementById(`${id}`);
      let response = await fetch(
        "http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score&page_size=7"
      );
      let Data = await response.json();
      let i = 0;
      for (let movie of aventure.children[0].children[0].children) {
        if (i == 0) {
          i = i + 1;
          continue
        } else {
          movie.children[0].children[0].innerHTML = Data.results[i-1].title;
          movie.children[0].children[1].src = Data.results[i-1].image_url;
          movie.children[0].children[1].setAttribute("data", Data.results[i-1].url);
        }
        i = i + 1;
      }
    } else if (cat == "War") {
      const war = document.getElementById(`${id}`);
      let response = await fetch(
        "http://localhost:8000/api/v1/titles/?genre=war&sort_by=-imdb_score&page_size=7"
      );
      let Data = await response.json();
      let i = 0;
      for (let movie of war.children[0].children[0].children) {
        if (i == 0) {
          i = i + 1;
          continue
        } else {
          movie.children[0].children[0].innerHTML = Data.results[i-1].title;
          movie.children[0].children[1].src = Data.results[i-1].image_url;
          movie.children[0].children[1].setAttribute("data", Data.results[i-1].url);
        }
        i = i + 1;
      }
    }
  }

  return {
    getURL,
  };
}

const movieOfTheMoment = createAMovie("movieOfTheMoment").getURL(
  "bestMovie"
);
const bestMovies = createAMovie("bestMovies").getURL("bestMovies");
const Biography = createAMovie("cat1").getURL("Biographie");
const Aventure = createAMovie("cat2").getURL("Adventure");
const War = createAMovie("cat3").getURL("War");
