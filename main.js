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

// let isScrolling = false;
// let lastScrollY = 0;


// window.addEventListener('scroll', () => {

//     let currentScrollY = window.scrollY;

//     if( currentScrollY > lastScrollY) {
//         isScrolling = true;
//     } else {
//         isScrolling = false;
//     }

//     lastScrollY = currentScrollY;
// });

// window.addEventListener('wheel', (e) => {
//   if (isScrolling) {
//     e.preventDefault();
//     return false;
//   }
// }, {passive:false});

// window.addEventListener('touchmove',(e) => {
//   if (isScrolling) {
//     e.preventDefault();
//     return false;
//   }
// });

// window.addEventListener('scroll', () => {
  
//     if (window.scrollY > 100) {
//         headerDevTitle.style.bottom = "-3.5rem";
//     }
// });




// Animacja wychodzenia napisu i wybijania się na pierwszy plan przy scrollowaniu
// window.addEventListener('scroll', () => {
//   let scrollValue = window.scrollY;
//   if (scrollValue < 100) {
//     headerStarterContainer.style.overflow = "hidden";
//     headerDevTitle.style.bottom = "-20rem";
//   } if (scrollValue > 100) {
//     headerDevTitle.style.bottom = "-3.5rem";
//   } if (scrollValue > 150) {
//     headerDevTitle.style.bottom = "8.5rem";
//   } if (scrollValue > 150) {
//     headerDevTitle.style.bottom = "8.5rem";
//   }  if (scrollValue > 250) {
//     headerStarterContainer.style.overflow = "visible";
//     headerDevTitle.style.bottom = "-3.5rem";
//   } 
// });

scrollPreventContainer.addEventListener('scroll', () => {
  console.log(scrollPreventContainer.scrollTop);
  let scrollValue = scrollPreventContainer.scrollTop;

  if (scrollValue < 100) {
    headerStarterContainer.style.overflow = "hidden";
    headerDevTitle.style.bottom = "-20rem";
  } if (scrollValue > 100) {
    headerDevTitle.style.bottom = "-3.5rem";
  } if (scrollValue > 120) {
    headerDevTitle.style.bottom = "8.5rem";
  } if (scrollValue > 120) {
    headerDevTitle.style.bottom = "8.5rem";
  }  if (scrollValue > 220) {
    headerStarterContainer.style.overflow = "visible";
    headerDevTitle.style.bottom = "-3.5rem";
    scrollPreventContainer.style.display = "none";
  } 
});




// document.addEventListener('wheel', (e) => {

//     console.log(e.deltaY);
// });



// Sekcja projektów