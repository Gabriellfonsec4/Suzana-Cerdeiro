const phone = "5521982662068";

const whatsappURL = (message) => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/* Ano do rodapé */
document.getElementById("year").textContent = new Date().getFullYear();

/* Links de WhatsApp */
document.querySelectorAll(".whatsapp").forEach((link) => {
  const subject = link.dataset.interest;

  const message = subject
    ? `Olá, Dra. Suzana! Vim pelo site e gostaria de conversar sobre ${subject}.`
    : "Olá, Dra. Suzana! Vim pelo site e gostaria de agendar uma avaliação.";

  link.href = whatsappURL(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

/* Menu mobile */
const menu = document.querySelector(".menu");
const navigation = document.getElementById("navigation");

function closeMenu() {
  navigation.classList.remove("open");

  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Abrir menu");
}

menu.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");

  menu.setAttribute("aria-expanded", String(open));

  menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

/* Filtros da galeria */
const filterButtons = document.querySelectorAll("[data-filter]");
const results = document.querySelectorAll(".result");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const selected = item === button;

      item.classList.toggle("active", selected);

      item.setAttribute("aria-pressed", String(selected));
    });

    results.forEach((result) => {
      const selectedFilter = button.dataset.filter;

      result.hidden =
        selectedFilter !== "todos" &&
        result.dataset.category !== selectedFilter;
    });
  });
});

/* Ampliação das imagens */
const lightbox = document.getElementById("lightbox");
const modalImage = document.getElementById("lightbox-image");

let lastResult = null;

results.forEach((result) => {
  result.addEventListener("click", () => {
    lastResult = result;

    const image = result.querySelector("img");

    modalImage.src = image.src;
    modalImage.alt = image.alt;

    document.getElementById("lightbox-title").textContent =
      result.dataset.title;

    lightbox.showModal();

    document.body.style.overflow = "hidden";
  });
});

document.getElementById("close-modal").addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();

  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (outside) {
    lightbox.close();
  }
});

lightbox.addEventListener("close", () => {
  document.body.style.overflow = "";
  lastResult?.focus();
});

/* Seção interativa */
const interest = document.getElementById("interest");

const descriptions = {
  "uma avaliação personalizada":
    "A avaliação é o primeiro passo para entender suas expectativas e possibilidades de cuidado.",

  lábios:
    "Conte o que você deseja valorizar nos seus lábios e converse sobre um plano individualizado.",

  "toxina botulínica":
    "Converse sobre suas linhas de expressão e esclareça suas dúvidas em uma avaliação.",

  vasinhos:
    "Conte sobre os vasinhos que incomodam você e consulte as possibilidades de avaliação.",
};

function updateInterest() {
  document.getElementById("interest-description").textContent =
    descriptions[interest.value];

  const link = document.getElementById("interest-link");

  const message = `Olá, Dra. Suzana! Vim pelo site e gostaria de conversar sobre ${interest.value}.`;

  link.href = whatsappURL(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

interest.addEventListener("change", updateInterest);

updateInterest();
