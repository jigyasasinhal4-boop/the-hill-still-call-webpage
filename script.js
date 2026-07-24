const opening = document.getElementById("opening");
const heroContent = document.querySelector(".hero-content");


// start animation after page loads
window.onload = () => {


    // start tearing animation
    setTimeout(() => {
        opening.classList.add("open");
    }, 1000);

    // show title
    setTimeout(() => {
        heroContent.classList.add("show-content");
    }, 3500);

};

const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {


    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);

});