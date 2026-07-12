window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
// ===============================
// NATURE SOUND
// ===============================

const natureAudio = document.getElementById("natureAudio");

const soundToggle = document.getElementById("soundToggle");

let isPlaying = false;

soundToggle.addEventListener("click", () => {

    if (!isPlaying) {

        natureAudio.play();

        soundToggle.textContent = "🔊 Nature Sounds";

        isPlaying = true;

    }

    else {

        natureAudio.pause();

        soundToggle.textContent = "🔇 Nature Sounds";

        isPlaying = false;

    }

});