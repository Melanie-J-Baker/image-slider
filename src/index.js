import "./style.css";

const slides = document.querySelectorAll(".slide");

slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;
let maxSlide = slides.length - 1;
const nextSlide = document.querySelector(".right-arrow");
const circles = document.querySelectorAll(".circle");

const renderCurrentSlide = () => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
  circles.forEach((dot) => {
    if (dot.id == currentSlide) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
};

nextSlide.addEventListener("click", function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  renderCurrentSlide();
});

const prevSlide = document.querySelector(".left-arrow");

prevSlide.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  renderCurrentSlide();
});

circles.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentSlide = dot.id;
    renderCurrentSlide();
  });
});

const play = document.querySelector("#play-btn");
let slideshow = setInterval(() => {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  renderCurrentSlide();
}, 5000);

let playing = true;

play.addEventListener("click", () => {
  if (playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
});

function pauseSlideshow() {
  play.classList.add("pause");
  play.classList.remove("play");
  playing = false;
  clearInterval(slideshow);
}

function playSlideshow() {
  play.classList.add("play");
  play.classList.remove("pause");
  playing = true;
  slideshow = setInterval(() => {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    renderCurrentSlide();
  }, 5000);
}
