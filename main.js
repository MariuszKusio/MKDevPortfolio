// Pobieramy kontener dla zdjecia i napisu głównego na starcie żeby zmienić jego overflow przy animacji napisu
const headerStarterContainer = document.querySelector('.mainImageContainer');
// Pobieramy napis z tego konteneru wyżej
const headerDevTitle = document.querySelector('.mainImageContainer h1');
// Pobieramy scrollPrevent 
const scrollPrevent = document.querySelector('.scrollPrevent');
const scrollPreventContainer = document.querySelector('.scrollWindowAnimation');


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

  nextProjectHandle();

  // console.log(active);
});

leftBtn.addEventListener('click', () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  barUpdate();

  prevProjectHandle();
  // console.log(active);
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


// scrollPreventContainer.addEventListener('scroll', () => {
//   console.log(scrollPreventContainer.scrollTop);
//   let scrollValue = scrollPreventContainer.scrollTop;

//   if (scrollValue < 100) {
//     headerStarterContainer.style.overflow = "hidden";
//     headerDevTitle.style.bottom = "-20rem";
//   } if (scrollValue > 100) {
//     headerDevTitle.style.bottom = "-3.5rem";
//   } if (scrollValue > 120) {
//     headerDevTitle.style.bottom = "20.5rem";
//   } if (scrollValue > 120) {
//     headerDevTitle.style.bottom = "20.5rem";
//   }  if (scrollValue > 220) {
//     headerStarterContainer.style.overflow = "visible";
//     headerDevTitle.style.bottom = "-3.5rem";
//     scrollPreventContainer.style.display = "none";
//   } 
// });


// Sekcja projektów

// pobieram kontener projektów, szczegółów oraz pasek pionowy
const projectsContainer = document.querySelector('.projectsContainer');
const projectsDetailsContainer = document.querySelector('.projectDetails');
const projectsBar = document.querySelector('.verticalBar');
// pobieram scroll trigger czyli diva o wysokosci 100% + szerokość kontener detailów
const projectsScrollWrapper = document.querySelector('.scrollWrapper');
const projectsScrollTrigger = document.querySelector('.scrollTrigger');
// pobieramy diva jako przycisk do pokazania swporotem detali danego projektu
const projectsShowDetails = document.querySelector('.showDetails');

// szerokość kontenera projektów
let projectsContainerWidth = projectsContainer.clientWidth;
// szerokość kontenera szczegółów
let projectsDetailsContainerWidth = projectsDetailsContainer.clientWidth;

// console.log(projectsContainerWidth);

// rightBtn.addEventListener('click', () => {
//   projectsDetailsContainer.style.right = "calc(-35% + 5px)";
//   projectsBar.style.left = 'calc(100% + 5px)';
//   console.log('klikam');
// });


// aktualizacja szerokości kontenera detailów oraz przy okazji długości scroll triggera

projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsContainerWidth}px)`;
window.addEventListener('resize', () => {
  // aktualizacja
  projectsContainerWidth = projectsContainer.clientWidth;
  // aktualizacja
  projectsDetailsContainerWidth = projectsDetailsContainer.clientWidth;

  projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsContainerWidth}px)`;
});

projectsScrollWrapper.addEventListener('scroll', () => {
  let scrollValue = projectsScrollWrapper.scrollTop;
  let projectScrollTriggerHeight = projectsScrollTrigger.clientHeight;
  let projectsDetailsContainerHeight = projectsDetailsContainer.clientHeight;

  projectsDetailsContainer.style.right = `-${scrollValue + 5}px`;
  projectsBar.style.left = `calc(65% + 5px + 5px + ${scrollValue}px)`;

  if (scrollValue === (projectScrollTriggerHeight - projectsDetailsContainerHeight)) {
    projectsScrollWrapper.style.display = "none";
    projectsShowDetails.classList.add('active');
  }
 });

 projectsShowDetails.addEventListener('click', () => {
  projectsShowDetails.classList.remove('active');
  projectsScrollWrapper.style.display = "block";

  // reset position dla kontenera szczegółów oraz dla pionowego paska
  projectsDetailsContainer.style.right = "0";
  projectsBar.style.left = "65%";
  
  // reset scrolla dla scrollWrappera projektów
  projectsScrollWrapper.scrollTo(0,0);

  projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsContainerWidth}px)`;
 });






// Lista obiektów z danymi szczegółów projektów
const projectDetailsList = [
{
  websiteImage: 'img/pagesView/m3dialnyProject.png',
  techList: ['', '', ''],
  projectDescription: 'Kocham pjeski',
  websiteLink: '',
  codeLink: '',
},
{
  websiteImage: 'img/pagesView/lucanoProject.png',
  techList: ['', '', ''],
  projectDescription: 'Kocham kotki',
  websiteLink: '',
  codeLink: '',
},
{
  websiteImage: 'img/pagesView/mymgymProject.png',
  techList: ['', '', ''],
  projectDescription: 'Kocham pipi',
  websiteLink: '',
  codeLink: '',
},
{
  websiteImage: 'img/pagesView/tandemProject.png',
  techList: ['', '', ''],
  projectDescription: 'Lubie ruchać',
  websiteLink: '',
  codeLink: '',
},
];

// pobieram element z opisem details
const projectDescriptionElement = document.querySelector('.websiteDescription');

// Lista ze zdjęciami projektów do naszej sekcji projektowej
const projectsImageList = ['img/pagesView/m3dialnyProject.png', 'img/pagesView/lucanoProject.png', 'img/pagesView/mymgymProject.png', 'img/pagesView/tandemProject.png'];
// Lista wykorzystanych technologii do danego projektu - tu musimy zrobić obiekty dla poszczególnych detailów projektu
const projetsTechList = ['imagelink1', 'imagelink2', 'imagelink3', ''];
// Lista opisów dla danego projektu
const projectsDescriptionList = ['opis1', 'opis2', 'opis3', ''];
// Lista linków do przycisków
const websitesLinkList = ['','',''];
const buttonsLinkList = ['','',''];
// pobieram tag img html. który przechowuje adresy grafik stron
const projectImage = document.getElementById('projectImage');

// Zmiana projektów

let slideCounter = 1;
const nextProjectHandle = () => {

  if (slideCounter == steps.length){
    projectImage.style.marginLeft = "0";
  } else {
   projectImage.style.marginLeft = "100%";
   slideCounter++;
  }

   setTimeout(() => {
    // zmiana obrazka na link z obiektu po indexie oraz zmiana stylu, który przesuwa nasz obrazek
    projectImage.src = projectDetailsList[active - 1].websiteImage;
    projectImage.style.marginLeft = "0";
    // zmiana opisu projektu
    projectDescriptionElement.innerHTML = projectDetailsList[active -1].projectDescription;


    // Zrób dodawanie listy technologii na podstawie foreacha, który przeleci każdy item z listy w obiekcie projectDetailsLIst.techList
    // wrzucając linki do ikonek technologii do tworzących w foreachu tagów img w ilości długości listy


    // wyjeżdżanie i wjeżdżanie sekcji detali projektu
    
   }, 600);

};

const prevProjectHandle = () => {

  projectImage.style.marginLeft = "-100%";

  if (slideCounter == 1){
    projectImage.style.marginLeft = "0";
  } else {
   projectImage.style.marginLeft = "-100%";
   slideCounter--;
  }

  setTimeout(() => {
    projectImage.src = projectDetailsList[active - 1].websiteImage;
    projectImage.style.marginLeft = "0";

    projectDescriptionElement.innerHTML = projectDetailsList[active -1].projectDescription;
   }, 600);

};