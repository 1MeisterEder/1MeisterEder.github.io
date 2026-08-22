const galleryRoot = "assets/sustainable-reflecting/gallery/";
const makeImages = (folder, count, extension = "png") => Array.from({ length: count }, (_, index) => galleryRoot + folder + "/" + folder + "-" + (index + 1) + "." + extension);
const galleries = {
  cd: { title: "CD universe", images: [...makeImages("cd", 14), galleryRoot + "cd/cd-15.jpg", galleryRoot + "cd/cd-16.jpg"] },
  mirror: { title: "Mirror universe", images: makeImages("mirror", 8) },
  random: { title: "Projector and found parts", images: makeImages("random", 2) },
};

const dialog = document.querySelector(".sr-gallery-dialog");
const title = dialog?.querySelector("#gallery-title");
const grid = dialog?.querySelector(".sr-gallery-grid");

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

document.querySelectorAll(".sr-universe").forEach((universe) => universe.addEventListener("click", () => {
  const gallery = universe.querySelector(".sr-universe-open")?.dataset.gallery;
  if (gallery) openGallery(gallery);
}));
dialog?.querySelector(".sr-gallery-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const dragon = document.querySelector(".sr-dragon");
if (dragon) dragon.src = "assets/sustainable-reflecting/dragon-transparent.png";
