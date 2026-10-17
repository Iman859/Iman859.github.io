// ---------- Reiter umschalten ----------
// Die Adresse hinter dem # (z. B. #projekte) bestimmt, welcher Reiter sichtbar ist.
const reiter = document.querySelectorAll(".reiter");
const navLinks = document.querySelectorAll(".nav-links a");
const navBox = document.querySelector(".nav-links");

function zeigeReiter() {
  const id = location.hash.slice(1) || "start";
  const ziel = document.getElementById(id) || document.getElementById("start");

  reiter.forEach((r) => r.classList.toggle("sichtbar", r === ziel));
  navLinks.forEach((a) => a.classList.toggle("aktiv", a.hash === "#" + ziel.id));

  navBox.classList.remove("offen");
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", zeigeReiter);
zeigeReiter();

// ---------- Handy-Menü ----------
document.getElementById("menu-button").addEventListener("click", () => {
  navBox.classList.toggle("offen");
});

// ---------- Tipp-Effekt auf der Startseite ----------
// Füge gern eigene Zeilen hinzu!
const zeilen = [
  "Technische Informatik @ BHT Berlin",
  "Embedded Systems · C · C++ · VHDL",
  "Beatmaker seit 15 · FL Studio",
  "Muay Thai seit 2 Jahren",
];

const tipptext = document.getElementById("tipptext");
let zeile = 0;
let zeichen = 0;
let loeschen = false;

function tippen() {
  const text = zeilen[zeile];
  zeichen += loeschen ? -1 : 1;
  tipptext.textContent = text.slice(0, zeichen);

  let pause = loeschen ? 35 : 70;
  if (!loeschen && zeichen === text.length) {
    loeschen = true;
    pause = 1800;
  } else if (loeschen && zeichen === 0) {
    loeschen = false;
    zeile = (zeile + 1) % zeilen.length;
    pause = 400;
  }
  setTimeout(tippen, pause);
}
tippen();

// ---------- Zeitstrahl filtern ----------
const filterButtons = document.querySelectorAll(".filter button");
const stationen = document.querySelectorAll(".timeline > li");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("aktiv", b === button));
    stationen.forEach((s) => {
      s.classList.toggle("versteckt", filter !== "alle" && s.dataset.typ !== filter);
    });
  });
});

// ---------- Aktuelles Jahr im Footer ----------
document.getElementById("jahr").textContent = new Date().getFullYear();
