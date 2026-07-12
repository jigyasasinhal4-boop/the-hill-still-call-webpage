const mainVideo = document.getElementById("mainVideo");
const videoGrid = document.querySelector(".videoGrid");


const artisans = [

{ name:"Neema Bisht", file:"neema1.mp4",
    image: "images/artisans/neema.jpg",
},
{ name:"Deepa Padalia", file:"deepa1.mp4",
    image: "images/artisans/deepa.jpg",
 },
{ name:"Bhagwati Arya", file:"bhagwati.mp4",
    image: "images/artisans/bhawana1.jpg",
 },
{ name:"Saraswati Rawat", file:"shobha.mp4",
    image: "images/artisans/shobha.jpg",
 },
{ name:"Sangeeta Dogra", file:"sangeeta.mp4",
    image: "images/artisans/sangeeta.jpg",
 },
{ name:"Bhawana Arya", file:"bhawana2.mp4",
    image: "images/artisans/bhawana2.jpg",
 },
{ name:"Beena Negi", file:"beena.mp4",
    image: "images/artisans/beena.jpg",
 },
{ name:"Rubina Bano", file:"rubina.mp4",
    image: "images/artisans/rubina.jpg",
 },
{ name:"Deepa Pant", file:"deepa2.mp4",
    image: "images/artisans/deepa2.jpg",
 },
{ name:"Shanti Arya", file:"shanti.mp4",
    image: "images/artisans/shanti.jpg",
 },
{ name:"Tara Kirola", file:"tara.mp4",
    image: "images/artisans/tara.jpg",
 },
{ name:"Anita Pandey", file:"anita.mp4",
    image: "images/artisans/anita.jpg",
 },
{ name:"Laxmi Negi", file:"laxmi.mp4",
    image: "images/artisans/laxmi.jpg",
 },
{ name:"Sunita Bora", file:null,
    image: "images/artisans/sunita.jpg",
 },
{ name:"Mamta Mehra", file:"mamta.mp4",
    image: "images/artisans/mamta.jpg",
 },
{ name:"Poonam Pandey", file:null,
    image: "images/artisans/poonam.jpg",
 },
{ name:"Hema Kandpal", file:"hema.mp4",
    image: "images/artisans/hema.jpg",
 },
{ name:"Veena Bhandari", file:"beena2.mp4",
    image: "images/artisans/beena2.jpg",
 },
{ name:"Lalita Negi", file:"lalita.mp4",
    image: "images/artisans/lalita.jpg",
 },
{ name:"Mamta Sharma", file:"mamta2.mp4",
    image: "images/artisans/mamta2.jpg",
 },
{ name:"Rajni Bisht", file:"rajni.mp4",
    image: "images/artisans/rajni.jpg",
 },
{ name:"Krishna Devi", file:"krishna.mp4",
    image: "images/artisans/krishna.jpg",
 },
{ name:"Neema Adhikari", file:"neema2.mp4",
    image: "images/artisans/neema2.jpg",
 },
{ name:"Pooja Kirola", file:"pooja.mp4",
    image: "images/artisans/pooja.jpg",
 },
{ name:"Rekha Devi", file:"rekha.mp4",
    image: "images/artisans/rekha.jpg",
 },
{ name:"Kiran Bisht", file:null,
    image: "images/artisans/kiran.jpg",
 },
{ name:"Kamla Rawat", file:"kamla.mp4",
    image: "images/artisans/kamla.jpg",
 },
{ name:"Prema Bisht", file:"prema.mp4",
    image: "images/artisans/prema.jpg",
 },
{ name:"Basanti Bhandari", file:"basanti.mp4",
    image: "images/artisans/basanti.jpg",
 },
{ name:"Manju Rawat", file:"manju.mp4",
    image:"images/artisans/manju.jpg",
 },
{ name:"Neetu Jeena", file:"neetu.mp4",
    image: "images/artisans/neetu.jpg",
 },
{ name:"Geeta Kandpal", file:"geeta.mp4",
    image: "images/artisans/geeta.jpg",
 },
{ name:"Rinku Sharma", file:"rinku.mp4",
    image: "images/artisans/rinku.jpg",
 },
{ name:"Jamuna Chauhan", file:"jamuna.mp4",
    image: "images/artisans/jamuna.jpg",
 },
{ name:"Kamla Negi", file:"kamla2.mp4",
    image: "images/artisans/kanchan.jpg",
 },
{ name:"Sheela Bora", file:"sheela.mp4",
    image: "images/artisans/sheela.jpg",
 },
{ name:"Priyanka Pawar", file:null,
    image: "images/artisans/priyanka.jpg",
 }

];

artisans.forEach((artisan,index)=>{

    const card = document.createElement("div");

    card.className = "videoCard";

    card.innerHTML = `

<img
    src="${artisan.image}"
    alt="${artisan.name}"
    class="videoThumbnail">

<div class="videoInfo">

    <p class="chapter">
        VOICE ${(index+1).toString().padStart(2,"0")}
    </p>

    <h3>${artisan.name}</h3>

    <p class="question">

        ${
            artisan.file
            ? "What does HillCraft mean to you?"
            : "Interview Coming Soon"
        }

    </p>

</div>

`;
 card.addEventListener("click", () => {

    if (!artisan.file) {

        alert("Interview coming soon.");

        return;

    }

    mainVideo.src = `images/gallery/videos/${artisan.file}`;

    mainVideo.style.display = "block";

    mainVideo.load();

    mainVideo.play();

    mainVideo.scrollIntoView({

        behavior: "smooth"

    });

}); 
    videoGrid.appendChild(card);


});