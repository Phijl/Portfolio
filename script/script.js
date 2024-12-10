// Barre en haut qui reste
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
}

// Ferme la navbar automatiquement
function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}

function createCardsFromJSON(url, containerSelector, templateCallback) {
  const container = document.querySelector(containerSelector);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      return response.json();
    })
    .then((data) => {
      let html = "";
      data.forEach((item, index) => {
        html += templateCallback(item);
        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          html += `</div><div class="row">`;
        }
      });
      container.innerHTML = `<div class="row">${html}</div>`;
    })
    .catch((error) => console.error(`Error fetching data from ${url}:`, error));
}

// Utilisation pour les compétences
createCardsFromJSON(
  "data/skills.json",
  "#skills .container",
  (item) => `
  <div class="col-lg-4 mt-4">
    <div class="card skillsText">
      <div class="card-body">
        <img src="./images/${item.image}" alt="${item.alt}"/>
        <h3 class="card-title mt-3">${item.title}</h3>
        <p class="card-text mt-3">${item.text}</p>
      </div>
    </div>
  </div>
`
);

// Utilisation pour le portfolio
createCardsFromJSON(
  "data/portfolio.json",
  "#portfolio .container",
  (item) => `
  <div class="col-lg-4 mt-4">
    <div class="card portfolioContent">
      <img class="card-img-top" src="images/${item.image}" alt="${item.alt}">
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-text">${item.text}</p>
        <div class="text-center">
          <a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener noreferrer">Lien</a>
        </div>
      </div>
    </div>
  </div>
`
);

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
