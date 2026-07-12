const photoGrid = document.querySelector(".photoGrid");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const totalPhotos = 126;
let currentPhoto = 1;

for(let i = 1; i <= totalPhotos; i++){

    const imagePath = `images/gallery/photos/${i}.jpg`;

    const card = document.createElement("div");

    card.className = "photoCard";

    card.innerHTML = `
        <img src="${imagePath}" alt="HillCraft Photo">
    `;

    card.addEventListener("click",()=>{

        currentPhoto = i;

        lightboxImage.src = imagePath;

        lightbox.classList.add("active");

    });

    photoGrid.appendChild(card);

}

closeBtn.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click",(event)=>{

    if(event.target===lightbox){

        lightbox.classList.remove("active");

    }

});

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        lightbox.classList.remove("active");

    }

});

prevBtn.addEventListener("click",()=>{

    currentPhoto--;

    if(currentPhoto < 1){

        currentPhoto = totalPhotos;

    }

    lightboxImage.src = `images/gallery/photos/${currentPhoto}.jpg`;

});

nextBtn.addEventListener("click",()=>{

    currentPhoto++;

    if(currentPhoto > totalPhotos){

        currentPhoto = 1;

    }

    lightboxImage.src = `images/gallery/photos/${currentPhoto}.jpg`;

});