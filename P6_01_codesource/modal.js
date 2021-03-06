let modal = null;
let movieModal = document.getElementById('movieModal')
movieModal.style.display = 'none'

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".jsModalClose").addEventListener("click", closeModal);
  modal
    .querySelector(".jsModalStop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) {
    return;
  }
  e.preventDefault();
  let movieModal = document.getElementById("modalWrapperId");
  let texte = document.querySelector("aside .modalWrapper > p");
  let image = document.querySelector("aside .modalWrapper > img");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("id", "movieModal");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".jsModalClose")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".jsModalStop")
    .removeEventListener("click", stopPropagation);
  movieModal.removeChild(texte);
  movieModal.removeChild(image);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const getInfo = async function (url) {
  const longDescription = document.getElementById(url + "__description");
  const moviePoster = document.getElementById(url + "__image");
  
  
  let response = await fetch(url);
  let Data = await response.json(); 
  let completeGenre = Data.genres
  longDescription.innerHTML = ` <h2>${Data.title}</h2> <br/> <br/>
                                Genre:${completeGenre.join()} <br/> <br/>
                                Date de sortie: ${Data.date_published}  <br/><br/>
                                Score spectateur: ${Data.avg_vote}/10 <br/><br/>
                                Score Imbd: ${Data.imdb_score}/10 <br/><br/>
                                R??alisateur: ${Data.directors} <br/><br/>
                                Liste des acteurs: ${Data.actors} <br/><br/>
                                Dur??e: ${Data.duration} min<br/><br/>
                                Pays: ${Data.countries} <br/><br/>
                                Box Office: ${Data.worldwide_gross_income} <br/><br/>
                                ${Data.long_description}`;
  longDescription.style.width = "80%"
  moviePoster.src = Data.image_url;
  moviePoster.style.height= "auto"
  moviePoster.style.width= "40%"
};
const initialisation = function() {
let children = document.getElementsByClassName("sections");
var liste = [];
for (let cat of children) {
  for (let div of cat.children) {
    if (div.classList.contains('movieItem')){
      liste.push(div);
    }
    
  }
}

for (let movie of liste) {
  movie.children[1].setAttribute(
    "href",
    "#" + movie.getAttribute("id") + "__" + "modal"
  );

  movie.addEventListener("click", function (event) {
    event.currentTarget.children[1].setAttribute("href", "#movieModal");
    const modalWrapper = document.getElementById('modalWrapperId')
    const link = event.currentTarget.children[1].getAttribute("Data");
    const description = document.createElement("p");
    description.setAttribute("id", link + "__description");
    const image = document.createElement("img");
    image.setAttribute("id", link + "__image");
    modalWrapper.appendChild(description);
    modalWrapper.appendChild(image);
    getInfo(link);
    openModal(event);
  });
}
}
initialisation()
const bestMovieDiv = document.getElementById("movieOfTheMoment");

bestMovieDiv.addEventListener("click", function (event) {
  event.currentTarget.setAttribute("href", "#movieModal");
  const modalWrapper = document.getElementById('modalWrapperId');
  const link = event.currentTarget.children[1].getAttribute("Data");
  const description = document.createElement("p");
  description.setAttribute("id", link + "__description");
  const image = document.createElement("img");
  image.setAttribute("id", link + "__image");
  modalWrapper.appendChild(description);
  modalWrapper.appendChild(image);
  getInfo(link);

  openModal(event);
});
