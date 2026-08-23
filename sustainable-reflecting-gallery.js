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
if (dragon) dragon.src = "assets/sustainable-reflecting/dragon-transparent.png";
