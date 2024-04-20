// Pobieramy kontener dla zdjecia i napisu głównego na starcie żeby zmienić jego overflow przy animacji napisu
const headerStarterContainer = document.querySelector('.mainImageContainer');
// Pobieramy napis z tego konteneru wyżej
const headerDevTitle = document.querySelector('.mainImageContainer h1');


// Animacja wychodzenia napisu i wybijania się na pierwszy plan przy scrollowaniu
window.addEventListener('scroll', () => {
  let scrollValue = window.scrollY;
  if (scrollValue < 100) {
    headerStarterContainer.classList.remove('textHidden');
    headerDevTitle.style.bottom = "-20rem";
  } if (scrollValue > 100) {
    headerDevTitle.style.bottom = "-3.5rem";
  } if (scrollValue > 150) {
    headerDevTitle.style.bottom = "8.5rem";
  } if (scrollValue > 150) {
    headerDevTitle.style.bottom = "8.5rem";
  }  if (scrollValue > 250) {
    headerStarterContainer.classList.add('textHidden');
    headerDevTitle.style.bottom = "-3.5rem";
  } 
  console.log(scrollValue);
});