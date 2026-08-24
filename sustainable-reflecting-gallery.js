const galleryRoot = "assets/sustainable-reflecting/gallery/";
const elementImages = (folder, count) => Array.from({ length: count }, (_, index) => galleryRoot + folder + "/element-" + String(index + 1).padStart(2, "0") + ".png");

const galleries = {
  cd: { title: "CD universe", images: elementImages("cd", 9) },
  mirror: { title: "Mirror universe", images: ["element-01.png", "element-03.png", "element-04.png", "element-05.png"].map((file) => galleryRoot + "mirror/" + file) },
  prism: { title: "Prism universe", images: elementImages("prism", 3) },
  random: { title: "Found objects universe", images: elementImages("random", 6) },
};

const pieces = {
  cd: ["cd/element-01.png", "cd/element-06.png", "cd/element-09.png"],
  mirror: ["mirror/element-01.png", "mirror/element-03.png", "mirror/element-05.png"],
  prism: ["prism/element-02.png"],
  random: ["random/element-01.png", "random/element-02.png"],
};

const dialog = document.querySelector(".sr-gallery-dialog");
const title = dialog?.querySelector("#gallery-title");
const grid = dialog?.querySelector(".sr-gallery-grid");

function keyForUniverse(universe) {
  return ["cd", "mirror", "prism", "random"].find((key) => universe.classList.contains("sr-" + key));
}

function openGallery(key) {
  const gallery = galleries[key];
  if (!gallery || !dialog || !title || !grid) return;
  title.textContent = gallery.title;
  grid.replaceChildren(...gallery.images.map((src, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = src;
    image.alt = gallery.title + ", material study " + (index + 1);
    image.loading = "lazy";
    figure.append(image);
    return figure;
  }));
  dialog.showModal();
}

document.querySelectorAll(".sr-universe").forEach((universe) => {
  const key = keyForUniverse(universe);
  if (!key) return;
  const cluster = document.createElement("div");
  cluster.className = "sr-piece-cluster";
  cluster.setAttribute("aria-hidden", "true");
  pieces[key].forEach((src) => {
    const image = document.createElement("img");
    image.src = galleryRoot + src;
    image.alt = "";
    cluster.append(image);
  });
  universe.append(cluster);
  universe.classList.add("sr-universe-has-pieces");
  if (!universe.querySelector(".sr-universe-open")) {
    const button = document.createElement("button");
    button.className = "sr-universe-open";
    button.type = "button";
    button.innerHTML = "View all prism material images <b>↗</b>";
    universe.append(button);
  }
  universe.addEventListener("click", () => openGallery(key));
});

dialog?.querySelector(".sr-gallery-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const dragon = document.querySelector(".sr-dragon");
if (dragon) {
  dragon.src = "assets/sustainable-reflecting/dragon-transparent.png";
}

const orbit = document.querySelector(".sr-orbit");
const mobileUniverseQuery = window.matchMedia("(max-width: 760px)");

function mountMobileUniverseFlight() {
  if (!orbit) return;
  const existingFlight = orbit.querySelector(".sr-mobile-flight");
  if (!mobileUniverseQuery.matches) {
    existingFlight?.remove();
    return;
  }
  if (existingFlight) return;
  const flight = document.createElement("div");
  flight.className = "sr-mobile-flight";
  flight.setAttribute("aria-label", "Select a material universe to view its images");
  flight.innerHTML = '<button class="sr-mobile-galaxy sr-mobile-galaxy-cd" type="button" data-gallery="cd" aria-label="Open CD universe images">01</button><button class="sr-mobile-galaxy sr-mobile-galaxy-mirror" type="button" data-gallery="mirror" aria-label="Open mirror universe images">02</button><button class="sr-mobile-galaxy sr-mobile-galaxy-prism" type="button" data-gallery="prism" aria-label="Open prism universe images">03</button><button class="sr-mobile-galaxy sr-mobile-galaxy-found" type="button" data-gallery="random" aria-label="Open found objects universe images">04</button><div class="sr-mobile-dragon-orbit" aria-hidden="true"><img class="sr-mobile-stage-dragon" src="assets/sustainable-reflecting/dragon-transparent.png" alt=""></div>';
  flight.querySelectorAll("[data-gallery]").forEach((button) => {
    button.addEventListener("click", () => openGallery(button.dataset.gallery));
  });
  orbit.insertBefore(flight, orbit.querySelector(".sr-universe"));
}
mountMobileUniverseFlight();
mobileUniverseQuery.addEventListener("change", mountMobileUniverseFlight);

const mobileFlightStyles = `
@media(max-width:760px){
  .sr-orbit{position:relative;display:block;padding:0 0 2rem!important}
  .sr-orbit>.sr-orbit-line,.sr-orbit>.sr-dragon{display:none!important}
  .sr-mobile-flight{position:relative;display:block;height:250px;margin:0 0 22px;overflow:hidden;border:1px solid rgba(223,175,86,.38);border-radius:2px;background:radial-gradient(ellipse at center,#24474a 0%,#151a1a 48%,#0d0e0d 100%);box-shadow:inset 0 0 52px rgba(0,0,0,.48)}
  .sr-mobile-flight:before{content:"";position:absolute;z-index:0;inset:25px 18px;border:1px solid rgba(223,175,86,.53);border-radius:50%;transform:rotate(-8deg)}
  .sr-mobile-flight:after{content:"four material universes";position:absolute;z-index:1;left:16px;bottom:13px;color:rgba(240,237,229,.6);font:700 .52rem/1 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase}
  .sr-mobile-galaxy{position:absolute;z-index:5;display:grid;place-items:center;width:43px;height:43px;border:1px solid rgba(240,237,229,.72);border-radius:50%;color:#f0ede5;font:700 .62rem/1 Arial,sans-serif;letter-spacing:.08em;box-shadow:0 0 0 6px rgba(17,17,15,.28),0 0 18px currentColor;cursor:pointer;transition:transform .2s ease,background .2s ease}
  .sr-mobile-galaxy:focus-visible,.sr-mobile-galaxy:hover{transform:scale(1.14);outline:2px solid #f0ede5;outline-offset:3px}
  .sr-mobile-galaxy-cd{top:38px;left:25%;color:#e4c464;background:rgba(21,69,74,.88)}
  .sr-mobile-galaxy-mirror{top:58px;right:18%;color:#d9d4e7;background:rgba(67,57,83,.85)}
  .sr-mobile-galaxy-prism{bottom:42px;left:18%;color:#b983dc;background:rgba(39,65,112,.86)}
  .sr-mobile-galaxy-found{right:27%;bottom:35px;color:#dda64e;background:rgba(89,62,19,.88)}
  .sr-mobile-dragon-orbit{position:absolute;z-index:4;inset:23px 14px;animation:sr-mobile-orbit 13s linear infinite;will-change:transform}
  .sr-mobile-stage-dragon{position:absolute;width:clamp(106px,31vw,145px);height:auto;left:50%;top:-28px;transform:translateX(-50%);filter:drop-shadow(0 12px 12px rgba(0,0,0,.72)) drop-shadow(0 0 10px rgba(223,175,86,.3));animation:sr-mobile-dragon-level 13s linear infinite}
  @keyframes sr-mobile-orbit{to{transform:rotate(360deg)}}@keyframes sr-mobile-dragon-level{to{transform:translateX(-50%) rotate(-360deg)}}
}
@media(max-width:380px){.sr-mobile-flight{height:226px}.sr-mobile-stage-dragon{width:102px}}
@media(prefers-reduced-motion:reduce){.sr-mobile-dragon-orbit,.sr-mobile-stage-dragon{animation:none!important}}
`;
if (!document.getElementById("sr-mobile-flight-styles")) {
  const style = document.createElement("style");
  style.id = "sr-mobile-flight-styles";
  style.textContent = mobileFlightStyles;
  document.head.append(style);
}
