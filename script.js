const btnEl = document.getElementById("btn");
const animeContainerEl = document.querySelector(".anime-container");
const animeImgEl = document.querySelector(".anime-img");
const animeNameEl = document.querySelector(".anime-name");

btnEl.addEventListener("click", async function () {
  try {
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    animeNameEl.innerText = "Updating...";
    animeImgEl.classList.add("loading");
    animeImgEl.src = "spinner.svg"; // optional: use your own spinner image

    await new Promise((resolve) => setTimeout(resolve, 1000)); // delay for effect

    const response = await fetch("https://api.waifu.im/search?included_tags=waifu&is_nsfw=false");
    const data = await response.json();
    const image = data.images[0];

    // Update UI
    btnEl.disabled = false;
    btnEl.innerText = "Get Anime";
    animeContainerEl.style.display = "block";
    animeImgEl.src = image.url;
    animeImgEl.onload = () => animeImgEl.classList.remove("loading");

    // Display artist name with link if available
    if (image.artist && image.artist.name) {
      const artistName = image.artist.name.trim();
      if (image.artist.url && image.artist.url.trim() !== "") {
        animeNameEl.innerHTML = `<a href="${image.artist.url}" target="_blank" rel="noopener noreferrer">${artistName}</a>`;
      } else {
        animeNameEl.innerText = artistName;
      }
    } else {
      animeNameEl.innerText = "Unknown Artist";
    }

  } catch (error) {
    console.error("Error:", error);
    btnEl.disabled = false;
    btnEl.innerText = "Get Anime";
    animeNameEl.innerText = "An error happened, please try again.";
    animeImgEl.classList.remove("loading");
  }
});