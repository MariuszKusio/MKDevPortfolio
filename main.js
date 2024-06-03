// Nawigacja po kliknięciu na przycisk do sekcji projektów
const projectsNavButton = document.querySelector(".projectsShowBtn");

function scrollToSection(sectionClass) {
  const section = document.querySelector(sectionClass);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

projectsNavButton.addEventListener("click", () => {
  scrollToSection(".projects");
});

// Przekierowanie po klilnięciu przycisków do odpiednich linków

document.querySelector(".linkedinImage").addEventListener("click", () => {
  window.location.href = "https://www.linkedin.com/in/mariusz-kusio-168803228/";
});

document.querySelector(".githubImage").addEventListener("click", () => {
  window.location.href = "https://github.com/MariuszKusio";
});

// Pobieramy kontener dla zdjecia i napisu głównego na starcie żeby zmienić jego overflow przy animacji napisu
const headerStarterContainer = document.querySelector(".mainImageContainer");
// Pobieramy napis z konteneru
const headerDevTitle = document.querySelector(".mainImageContainer h1");

const scrollPrevent = document.querySelector(".scrollPrevent");
const scrollPreventContainer = document.querySelector(".scrollWindowAnimation");
const contactShowBtn = document.querySelector(".contactShowBtn");
const contactImages = document.querySelectorAll(".contactShowBtn ~ img");
// Pobieramy przycisk kontaktów dla wersji mobilnej
const mobileContactShowBtn = document.querySelector(".mobileContactButton");

// Sekcja kontaktów dla Desktop

contactShowBtn.addEventListener("click", () => {
  contactImages.forEach((image) => {
    image.classList.toggle("show");
  });
});

// Dla mobile

mobileContactShowBtn.addEventListener("click", () => {
  contactImages.forEach((image) => {
    image.classList.toggle("show");
  });
});

// Sekcja nagłówka

// Pobieramy napis główny i poprzez translate wykonujemy animacje jego "wyskoczenia"

const headerMainText = document.querySelector(".headerMainText");
let mainTextFlag = true;

window.addEventListener("scroll", () => {
  let windowScrollValue = window.scrollY;
  if (windowScrollValue < 4 && mainTextFlag) {
    headerMainText.style.transform = "translate(-50%, 100%)";
  }
  if (windowScrollValue > 20 && mainTextFlag) {
    headerMainText.style.transform = "translate(-50%, -35%)";
  }
  if (windowScrollValue > 65 && mainTextFlag) {
    headerMainText.style.transform = "translate(-50%, 25%)";
    headerStarterContainer.style.overflow = "visible";
    mainTextFlag = false;
  }
});

// Pobieranie przycisków lewo prawo i naszych pointów na progressbarze
const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progress-bar");

// Progressbar funkcje
let active = 1;
rightBtn.addEventListener("click", () => {
  active++;
  if (active > steps.length) {
    active = steps.length;
  }
  barUpdate();

  nextProjectHandle();
});

leftBtn.addEventListener("click", () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  barUpdate();

  prevProjectHandle();
});

const barUpdate = () => {
  steps.forEach((step, i) => {
    if (i < active) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  progressBar.style.width = ((active - 1) / (steps.length - 1)) * 100 + "%";

  if (active === 1) {
    leftBtn.disabled = true;
  } else if (active === steps.length) {
    rightBtn.disabled = true;
  } else {
    leftBtn.disabled = false;
    rightBtn.disabled = false;
  }
};

// Sekcja projektów

// pobieram kontener projektów, szczegółów oraz pasek pionowy
const projectsContainer = document.querySelector(".projectsContainer");
const projectsDetailsContainer = document.querySelector(".projectDetails");
const projectsBar = document.querySelector(".verticalBar");
// pobieram scroll trigger czyli diva o wysokosci 100% + szerokość kontener detailów
const projectsScrollWrapper = document.querySelector(".scrollWrapper");
const projectsScrollTrigger = document.querySelector(".scrollTrigger");
// pobieramy diva jako przycisk do pokazania swporotem detali danego projektu
const projectsShowDetails = document.querySelector(".showDetails");
const scrollIndicator = document.querySelector(".scrollIndicator");

// Wersja mobilna
const projectsDetailsMobileContainer = document.querySelector(
  ".projectDetailsMobile"
);
const projectsBarMobile = document.querySelector(".verticalBarMobile");

// szerokość kontenera projektów
let projectsContainerWidth = projectsContainer.clientWidth;
// szerokość kontenera szczegółów
let projectsDetailsContainerWidth = projectsDetailsContainer.clientWidth;

// aktualizacja szerokości kontenera detailów oraz przy okazji długości scroll triggera

window.addEventListener("load", () => {
  if (document.body.offsetWidth < 751) {
    projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsMobileContainer.clientHeight}px)`;
    projectImage.src = projectDetailsList[active - 1].websiteImage[1];
  } else {
    projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsContainerWidth}px)`;
    projectImage.src = projectDetailsList[active - 1].websiteImage[0];
  }
});

window.addEventListener("resize", () => {
  if (document.body.offsetWidth < 751) {
    projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsMobileContainer.clientHeight}px)`;
  } else {
    // aktualizacja
    projectsContainerWidth = projectsContainer.clientWidth;
    // aktualizacja
    projectsDetailsContainerWidth = projectsDetailsContainer.clientWidth;

    projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsContainerWidth}px)`;
  }
});

let scrollCounter = 0;
projectsScrollWrapper.addEventListener("scroll", (e) => {
  let scrollValue = projectsScrollWrapper.scrollTop;
  let projectScrollTriggerHeight = projectsScrollTrigger.clientHeight;
  let projectsDetailsContainerHeight = projectsDetailsContainer.clientHeight;

  // schowanie zachęcacza scrollowania po wykonanym scrollu
  if (e && scrollCounter < 10) {
    scrollCounter++;
    if (scrollCounter > 1) {
      scrollIndicator.classList.add("hide");
    }
  }

  projectsDetailsContainer.style.right = `-${scrollValue + 5}px`;
  projectsBar.style.left = `calc(65% + 5px + 5px + ${scrollValue}px)`;
  //Mobile
  projectsDetailsMobileContainer.style.top = `-${scrollValue + 5}px`;
  projectsBarMobile.style.bottom = `calc(25% + ${scrollValue}px)`;

  if (
    scrollValue ===
      projectScrollTriggerHeight - projectsDetailsContainerHeight ||
    (scrollValue === projectsDetailsMobileContainer.clientHeight &&
      document.body.offsetWidth < 751)
  ) {
    projectsScrollWrapper.style.display = "none";
    projectsShowDetails.classList.add("active");
  }
});

// Przycisk do pokazania detali danego projektu
projectsShowDetails.addEventListener("click", () => {
  projectsShowDetails.classList.remove("active");
  projectsScrollWrapper.style.display = "block";

  // reset position dla kontenera szczegółów oraz dla pionowego paska
  projectsDetailsContainer.style.right = "0";
  projectsBar.style.left = "65%";

  // reset scrolla dla scrollWrappera projektów
  projectsScrollWrapper.scrollTo(0, 0);

  projectsScrollTrigger.style.height = `calc(100% + ${projectsDetailsContainerWidth}px)`;
});

// Lista obiektów z danymi szczegółów projektów
const projectDetailsList = [
  {
    websiteImage: [
      "img/pagesView/m3dialnyProject.webp",
      "img/pagesView/MobileM3dialnyProject.webp",
    ],
    techList: [
      "img/skillSetIcons/html.svg",
      "img/skillSetIcons/css.svg",
      "img/skillSetIcons/javaScript.svg",
    ],
    projectDescription:
      'Strona stworzona na zlecenie concent creatora "m3dialnego". Została napisana głównie z wykorzystaniem html, css oraz JavaScript. Założeniem tej strony było zaprezentowanie możliwości wizualnych w tworzeniu materiałów reklamowych przez klienta. Zależało nam na stworzeniu przejrzystej galerii dla odwiedzających stronę.',
    websiteLink: "https://m3dialny.netlify.app/",
    codeLink: "https://github.com/MariuszKusio/M3dialny-website",
  },
  {
    websiteImage: [
      "img/pagesView/lucanoProject.webp",
      "img/pagesView/MobileLucanoProject.webp",
    ],
    techList: [
      "img/skillSetIcons/html.svg",
      "img/skillSetIcons/css.svg",
      "img/skillSetIcons/javaScript.svg",
    ],
    projectDescription:
      "Witryna stworzona dla usługodawcy w branży rozrywkowej. Strona zawiera przejrzyste grafiki, dobrane animacje, oraz galerię z możliwością filtrowania przeglądanych treści. Znajduje się na niej również formularz kontaktowy z zabezpieczeniem przed szybkim wysyłaniem wiadomości oraz walidacją wprowadzanych danych.",
    websiteLink: "https://djlucano.pl/",
    codeLink: "https://github.com/MariuszKusio/Lucano-website",
  },
  {
    websiteImage: [
      "img/pagesView/mymgymProject.webp",
      "img/pagesView/MobileMymgymProject.webp",
    ],
    techList: [
      "img/skillSetIcons/html.svg",
      "img/skillSetIcons/css.svg",
      "img/skillSetIcons/javaScript.svg",
    ],
    projectDescription:
      "Strona testowa stworzona dla fikcyjnej siłowni. Posiada wiele zakładek z racji na mnogość treści. ",
    websiteLink: "https://m3dialny.netlify.app/",
    codeLink: "https://github.com/MariuszKusio/mymgym-website",
  },
  {
    websiteImage: [
      "img/pagesView/tandemProject.webp",
      "img/pagesView/MobileTandemProject.webp",
    ],
    techList: ["img/skillSetIcons/html.svg", "img/skillSetIcons/css.svg"],
    projectDescription:
      "Strona testowa stworzona dla fikcyjnego salonu barberskiego. Posiada odnośniki do stron zewnętrznych umożliwiających umówienie wizyty. Założeniem tej strony było wykorzystanie tylko i wyłącznie HTML oraz CSS. Kilka linijek JavaScriptu zostało zaimplementowanych w celu usprawnienia przycisków.",
    websiteLink: "https://m3dialny.netlify.app/",
    codeLink: "https://github.com/MariuszKusio/tandem-website",
  },
];

// pobieram element z opisem details
const projectDescriptionElement = document.querySelector(".websiteDescription");
// mobile
const projectDescriptionElementMobile = document.querySelector(
  ".websiteDescriptionMobile"
);

// pobieram tag img html. który przechowuje adresy grafik stron
const projectImage = document.getElementById("projectImage");
// pobieramy wrapper dla naszych technologicznych ikon
const techIconWrapper = document.querySelector(".iconsWrapper");
const techIconWrapperMobile = document.querySelector(".iconsWrapperMobile");
// pobieramy scroll kontener dla obrazka projektów
const scrollImageProjectContainer = document.querySelector(".projectView");

// Przyciski z odnośnikami do projektów

const showWebsiteButton = document.querySelectorAll(".showWebsite");
const showCodeButton = document.querySelectorAll(".showCode");

showWebsiteButton.forEach((button) => {
  button.addEventListener("click", () => {
    window.open(`${button.getAttribute("link")}`);
  });
});

showCodeButton.forEach((button) => {
  button.addEventListener("click", () => {
    window.open(`${button.getAttribute("link")}`);
  });
});

// Zmiana projektów

let slideCounter = 1;
const nextProjectHandle = () => {
  // pobranie scroll contenera img projektow zeby pobrac ich wysokosc do wartosci margin
  const projectImageScrollContainer = document.querySelector(".scroll-content");
  projectsShowDetails.classList.remove("active");

  // dodajemy klasę do naszego img z projektem zeby w pliku dist/smooth-scrollbar.js mozna było
  // dzięki niej zrobić wyzerowanie pozycji projektu przy przewijaniu slajdów
  projectImage.classList.add("startPosition");

  if (slideCounter == steps.length) {
    projectImage.style.marginLeft = "0";
  } else if (document.body.offsetWidth < 751) {
    projectImage.style.marginTop = `${projectImageScrollContainer.clientHeight}px`;

    projectsDetailsMobileContainer.style.top = "-75%";
    projectsBarMobile.style.bottom = "calc(100% + 5px)";

    slideCounter++;
  } else {
    // chowanie się slajdu projektu jeżeli warunek pozwala
    projectImage.style.marginLeft = "100%";
    // chowanie się detali projektu jeżeli warunek pozwala
    projectsDetailsContainer.style.right = "-35%";
    projectsBar.style.left = "calc(100% + 5px)";

    slideCounter++;
  }

  //dajemy .2s opóźnienia dla animacji kroku
  steps.forEach((step) => {
    step.style.transitionDelay = ".2s";
  });

  setTimeout(() => {
    // zmiana obrazka na link z obiektu po indexie oraz zmiana stylu, który przesuwa nasz obrazek
    projectImage.src =
      document.body.offsetWidth < 751
        ? projectDetailsList[active - 1].websiteImage[1]
        : projectDetailsList[active - 1].websiteImage[0];
    projectImage.style.marginLeft = "0";
    projectImage.style.marginTop = "0";
    // zmiana opisu projektu
    projectDescriptionElement.innerHTML =
      projectDetailsList[active - 1].projectDescription;
    // zmiana adresow przyciskow
    showWebsiteButton.forEach((button) => {
      button.setAttribute(
        "link",
        `${projectDetailsList[active - 1].websiteLink}`
      );
    });
    showCodeButton.forEach((button) => {
      button.setAttribute("link", `${projectDetailsList[active - 1].codeLink}`);
    });
    // mobile
    projectDescriptionElementMobile.innerHTML =
      projectDetailsList[active - 1].projectDescription;

    projectsScrollWrapper.style.display = "block";
    projectsScrollWrapper.scrollTo(0, 0);

    clearTechIconList();
    addTechIconList();

    // wyjeżdżanie i wjeżdżanie sekcji detali projektu
    projectsDetailsContainer.style.right = "0";
    projectsBar.style.left = "65%";
    //mobile
    projectsDetailsMobileContainer.style.top = "0";
    projectsBarMobile.style.bottom = "25%";
  }, 600);
};

const prevProjectHandle = () => {
  const projectImageScrollContainer = document.querySelector(".scroll-content");
  // Schowanie showDetails elementu jeżeli ma on klasę 'active'
  projectsShowDetails.classList.remove("active");
  projectImage.classList.add("startPosition");

  if (slideCounter == 1) {
    projectImage.style.marginLeft = "0";
    projectImage.style.marginTop = "0";
  } else if (document.body.offsetWidth < 751) {
    projectImage.style.marginTop = `${projectImageScrollContainer.clientHeight}px`;

    projectsDetailsMobileContainer.style.top = "-75%";
    projectsBarMobile.style.bottom = "calc(100% + 5px)";

    slideCounter--;
  } else {
    projectImage.style.marginLeft = "-100%";

    projectsDetailsContainer.style.right = "-35%";
    projectsBar.style.left = "calc(100% + 5px)";

    slideCounter--;
  }
  // dajemy zerowe opóźnienie dla animacji kroku
  steps.forEach((step) => {
    step.style.transitionDelay = ".0s";
  });

  setTimeout(() => {
    projectImage.src =
      document.body.offsetWidth < 751
        ? projectDetailsList[active - 1].websiteImage[1]
        : projectDetailsList[active - 1].websiteImage[0];
    projectImage.style.marginLeft = "0";
    projectImage.style.marginTop = "0";

    projectDescriptionElement.innerHTML =
      projectDetailsList[active - 1].projectDescription;
    //mobile
    projectDescriptionElementMobile.innerHTML =
      projectDetailsList[active - 1].projectDescription;

    // zmiana adresow przyciskow
    showWebsiteButton.forEach((button) => {
      button.setAttribute(
        "link",
        `${projectDetailsList[active - 1].websiteLink}`
      );
    });
    showCodeButton.forEach((button) => {
      button.setAttribute("link", `${projectDetailsList[active - 1].codeLink}`);
    });

    // Dodanie wyświetlania scroll wrapperowi szczegółów dla wypadków kiedy projekt został przewinięty ze schowanymi sczegółami
    // Oraz zresetowanie wrappera do początkowej pozycji
    projectsScrollWrapper.style.display = "block";
    projectsScrollWrapper.scrollTo(0, 0);

    clearTechIconList();
    addTechIconList();

    projectsDetailsContainer.style.right = "0";
    projectsBar.style.left = "65%";
    //mobile
    projectsDetailsMobileContainer.style.top = "0";
    projectsBarMobile.style.bottom = "25%";
  }, 600);
};

const clearTechIconList = () => {
  // pobieramy wszystkie img z icon wrappera
  const techIconList = document.querySelectorAll(".iconsWrapper img");
  const techIconListMobile = document.querySelectorAll(
    ".iconsWrapperMobile img"
  );
  // iterujemy po pobranej liście ikon i usuwamy wszystkie przed dodaniem
  techIconList.forEach((icon) => {
    icon.remove();
  });
  techIconListMobile.forEach((icon) => {
    icon.remove();
  });
};

const addTechIconList = () => {
  // Dodawanie aktualnej listy ikon na podstawie informacji w naszym obiekcie projektowym
  projectDetailsList[active - 1].techList.forEach((tech, i = 0) => {
    // stworzenie elementu img do wyświetlania elementów tech oraz nadanie mu klasy do indentyfikacji
    const techImgElement = document.createElement("img");
    techImgElement.classList.add(`techElement${i}`);
    //mobile
    const techImgElementMobile = document.createElement("img");
    techImgElementMobile.classList.add(`techElementMobile${i}`);

    // dodanie stworzonego elementu do DOM w miejsce które nas interesuje
    techIconWrapper.appendChild(techImgElement);
    //mobile
    techIconWrapperMobile.appendChild(techImgElementMobile);

    // dodanie do src linku do obrazka technologii, który chcemy dodać z listy wskazanego obiektu
    const setSrcElement = document.querySelector(`.techElement${i}`);
    // mobile
    const setSrcElementMobile = document.querySelector(
      `.techElementMobile${i}`
    );

    setSrcElement.src = tech;
    // mobile
    setSrcElementMobile.src = tech;
  });
};

// smooth scrolling dla projektów
const options = {
  damping: 0.04,
  alwaysShowTracks: false,
  continuousScrolling: false,
};

Scrollbar.init(document.querySelector(".projectView"), options);

// Text reveal

// pobieramy dwa description poprzez querySelectorAll i wykorzystujemy foreach do nadania im spanów
let descriptionParagraph = document.querySelectorAll(".paragraphText");
let spans = [];

descriptionParagraph.forEach((paragraph) => {
  let htmlString = "";
  let pArray = paragraph.textContent.split("");

  for (let i = 0; i < pArray.length; i++) {
    htmlString += `<span>${pArray[i]}</span>`;
  }

  paragraph.innerHTML = htmlString;
});

spans = [...document.querySelectorAll("span")];

const textReveal = () => {
  for (let i = 0; i < spans.length; i++) {
    if (
      spans[i].parentElement.getBoundingClientRect().top <
      window.innerHeight / 2
    ) {
      let { left, top } = spans[i].getBoundingClientRect();
      top = top - window.innerHeight * 0.4;
      let opacityValue =
        1 - (top * 0.01 + left * 0.001) < 0.3
          ? 0.3
          : 1 - (top * 0.01 + left * 0.001).toFixed(3);
      opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3);
      spans[i].style.opacity = opacityValue;
    }
  }
};

window.addEventListener("scroll", () => {
  textReveal();
});

textReveal();

// Klikanie przycisków randomowo

const buttonClickEffect = document.querySelectorAll(".buttonShadow");

const clickEffectToggle = (i) => {
  buttonClickEffect[i].classList.toggle("clicked");

  setTimeout(() => {
    buttonClickEffect[i].classList.toggle("clicked");
  }, 1600);
};

const buttonRandomClickInterval = setInterval(() => {
  const i = Math.floor(Math.random() * buttonClickEffect.length);
  clickEffectToggle(i);
}, 700);
