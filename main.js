// Pobieramy kontener dla zdjecia i napisu głównego na starcie żeby zmienić jego overflow przy animacji napisu
const headerStarterContainer = document.querySelector('.mainImageContainer');
// Pobieramy napis z tego konteneru wyżej
const headerDevTitle = document.querySelector('.mainImageContainer h1');
// Pobieramy scrollPrevent 
const scrollPrevent = document.querySelector('.scrollPrevent');
const scrollPreventContainer = document.querySelector('.scrollWindowAnimation');

// Lista ze zdjęciami projektów do naszej sekcji projektowej
const projectsImageList = ['imagelink1', 'imagelink2', 'imagelink3'];
// Lista wykorzystanych technologii do danego projektu
const projetsTechList = ['imagelink1', 'imagelink2', 'imagelink3'];
// Lista opisów dla danego projektu
const projectsDescriptionList = ['opis1', 'opis2', 'opis3'];

const contactShowBtn = document.querySelector('.contactShowBtn');
const contactImages = document.querySelectorAll('.contactShowBtn ~ img');

// Sekcja kontaktów

contactShowBtn.addEventListener('click', () => {
  contactImages.forEach((image) => {
    image.classList.toggle("show");
  });
});


// Pobieranie przycisków lewo prawo i naszych pointów na progress barze oraz bar
const leftBtn = document.querySelector('.leftBtn'); 
const rightBtn = document.querySelector('.rightBtn'); 
const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById("progress-bar");

// Progress bar funkcje
let active = 1;
rightBtn.addEventListener('click', () => {
  active++;
  if (active > steps.length) {
    active = steps.length;
  }
  barUpdate();
});

leftBtn.addEventListener('click', () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  barUpdate();
});

const barUpdate = () => {
    
    steps.forEach((step, i) => {
        if (i < active) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    progressBar.style.width = ((active - 1) / (steps.length - 1)) * 100 + '%';

    if (active === 1) {
        leftBtn.disabled = true;
    } else if (active === steps.length) {
        rightBtn.disabled = true;
    } else {
        leftBtn.disabled = false;
        rightBtn.disabled = false;
    }
};



scrollPreventContainer.addEventListener('scroll', () => {
  console.log(scrollPreventContainer.scrollTop);
  let scrollValue = scrollPreventContainer.scrollTop;

  if (scrollValue < 100) {
    headerStarterContainer.style.overflow = "hidden";
    headerDevTitle.style.bottom = "-20rem";
  } if (scrollValue > 100) {
    headerDevTitle.style.bottom = "-3.5rem";
  } if (scrollValue > 120) {
    headerDevTitle.style.bottom = "20.5rem";
  } if (scrollValue > 120) {
    headerDevTitle.style.bottom = "20.5rem";
  }  if (scrollValue > 220) {
    headerStarterContainer.style.overflow = "visible";
    headerDevTitle.style.bottom = "-3.5rem";
    scrollPreventContainer.style.display = "none";
  } 
});








// Sekcja projektów