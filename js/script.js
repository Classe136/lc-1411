import { slides } from "./db.js";

/*
{
    image: "img/01.jpg",
    title: "Svezia",
    text: "Scandinavia's blend of nature and innovation.",
  },

*/

//contenitori
const elSlider = document.querySelector(".slider");
const elThumbs = document.querySelector(".thumbs");
let activeIndex = 0;

drawCarousel();

//prendo tutte le slide
const elSlides = document.querySelectorAll(".slide");
//alla prima slide aggiungo la classe active
elSlides[activeIndex].classList.add("active");

//rifaccio la stessa cosa per le thumbnails
const thumbs = document.querySelectorAll("#thumbnails img");
thumbs[activeIndex].classList.add("active");

for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].addEventListener("click", () => {
    elSlides[activeIndex].classList.remove("active");
    thumbs[activeIndex].classList.remove("active");
    activeIndex = i;
    elSlides[activeIndex].classList.add("active");
    thumbs[activeIndex].classList.add("active");
  });
}

const btnNext = document.getElementById("next");
btnNext.addEventListener("click", nextSlide);

function nextSlide() {
  //rimuovo la classe actve dall'attuale slide
  elSlides[activeIndex].classList.remove("active");
  thumbs[activeIndex].classList.remove("active");

  //controllo se l'indice attivo è compreso tra 0 e la lunghezza array
  if (activeIndex === slides.length - 1) {
    activeIndex = 0;
  } else {
    //incremento indice attivo
    activeIndex++;
  }
  //assegno la classe active alla slide successiva
  elSlides[activeIndex].classList.add("active");
  thumbs[activeIndex].classList.add("active");
}

const btnPrev = document.getElementById("prev");
btnPrev.addEventListener("click", () => {
  //rimuovo la classe actve dall'attuale slide
  elSlides[activeIndex].classList.remove("active");
  thumbs[activeIndex].classList.remove("active");

  //controllo se l'indice attivo è compreso tra 0 e la lunghezza array
  if (activeIndex === 0) {
    activeIndex = slides.length - 1;
  } else {
    //incremento indice attivo
    activeIndex--;
  }
  //assegno la classe active alla slide successiva
  elSlides[activeIndex].classList.add("active");
  thumbs[activeIndex].classList.add("active");
});
function drawCarousel() {
  //variabili accumulo
  let tempSlide = "";
  let tempThumb = "";

  for (let i = 0; i < slides.length; i++) {
    const { image, title, text } = slides[i]; //destrutturazione oggetto
    tempSlide += `
    <div class="slide">
        <img src="${image}" alt="${title}" class="img-fluid">
        <div class="text-content">
            <h5>${title}</h5>
            <p>${text}</p>
        </div>
    </div>
`;
    tempThumb += `
    <div class="col">
        <img src="${image}" alt="${title}" class="img-fluid">
    </div>
`;

    //inseriamo l'html nei contenitori
    elSlider.innerHTML = tempSlide;
    elThumbs.innerHTML = tempThumb;
  }
}

let timer = setInterval(nextSlide, 2000);

elSlider.addEventListener("mouseover", () => {
  clearInterval(timer);
});
elThumbs.addEventListener("mouseover", () => {
  clearInterval(timer);
});

elSlider.addEventListener("mouseout", () => {
  timer = setInterval(nextSlide, 2000);
});
elThumbs.addEventListener("mouseout", () => {
  timer = setInterval(nextSlide, 2000);
});
