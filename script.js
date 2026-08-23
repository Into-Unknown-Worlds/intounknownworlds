const videos = [
  { id: "Y7AMYARSkaE", chapter: 8, title: "Chapter 8 — The Kingdom Beneath the Ice", category: "Chapters", duration: "29:27", year: "VIII" },
  { id: "AZNjUiKZARQ", chapter: 7, title: "Chapter 7 — The Sea Without Stars", category: "Chapters", duration: "30:27", year: "VII" },
  { id: "LGb_aQtrmxw", chapter: 6, title: "Chapter 6 — The Wolf in Chains", category: "Chapters", duration: "29:59", year: "VI" },
  { id: "IdFTx04NO6o", chapter: 5, title: "Chapter 5 — The City of Golden Shields", category: "Chapters", duration: "25:15", year: "V" },
  { id: "ajlHR4YCsuE", chapter: 4, title: "Chapter 4 — The Well of Mímir", category: "Chapters", duration: "23:53", year: "IV" },
  { id: "hdh9nqeEgEA", chapter: 3, title: "Chapter 3 — The Forest That Remembers", category: "Chapters", duration: "22:08", year: "III" },
  { id: "59ikcmTu38k", chapter: 2, title: "Chapter 2 — The Door Beneath the Roots", category: "Chapters", duration: "21:07", year: "II" },
  { id: "N1-ee9R_frY", chapter: 1, title: "Chapter 1 — The Raven at the Window", category: "Chapters", duration: "18:22", year: "I" }
];

const grid = document.querySelector("#video-grid");
const count = document.querySelector("#video-count");
const dialog = document.querySelector("#video-dialog");
const player = document.querySelector("#player-wrap");

function renderVideos() {
  grid.innerHTML = videos.map((video) => `
    <article class="video-card" data-id="${video.id}" tabindex="0" role="button" aria-label="Play ${video.title}">
      <div class="thumbnail">
        <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy" />
        <button class="play" type="button" aria-label="Play video"></button>
        <span class="duration">${video.duration}</span>
      </div>
      <p class="video-meta"><span>${String(video.chapter).padStart(2, "0")}</span><span>/</span><span>${video.category.toUpperCase()}</span><span>—</span><span>${video.year}</span></p>
      <h3 class="video-title">${video.title}</h3>
    </article>
  `).join("");

  count.textContent = String(videos.length).padStart(2, "0");
}

function openVideo(id) {
  const video = videos.find((item) => item.id === id);
  if (!video) return;
  player.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${video.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  document.querySelector("#dialog-meta").textContent = `${video.category} / ${video.year}`;
  document.querySelector("#dialog-title").textContent = video.title;
  dialog.showModal();
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".video-card");
  if (card) openVideo(card.dataset.id);
});

grid.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".video-card")) {
    event.preventDefault();
    openVideo(event.target.dataset.id);
  }
});

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => { player.innerHTML = ""; });
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

renderVideos();
