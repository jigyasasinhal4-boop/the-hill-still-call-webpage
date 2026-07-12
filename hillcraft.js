const orderingOpen = false;
const homeButton = document.getElementById("returnHome");

if(homeButton){

    homeButton.addEventListener("click",()=>{

        window.location.href="home.html";

    });

}
const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight - 120){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealSections);

revealSections();

const popupPersonWork = document.getElementById("popupPersonWork");
const popupWorkHeading = document.getElementById("popupWorkHeading");

const products = [

{
image:"images/products/product1.jpg",
title:"Buransh Bloom Sling",
description:"A handcrafted crossbody bag made for everyday journeys.",
materials:"Linen fabric, cotton lining, adjustable sling strap and hand embroidery.",
inspiration:"The blooming Buransh flowers that colour the Himalayan forests every spring."
},

{
image:"images/products/product2.jpg",
title:"Whispering Pines Charm",
description:"A handmade charm carrying a little piece of the hills.",
materials:"Crochet yarn, stuffing and metal keyring.",
inspiration:"The quiet pine forests and fallen pine cones found across Uttarakhand."
},

{
image:"images/products/product3.jpg",
title:"Kafal Chronicles",
description:"A handcrafted journal for stories worth remembering.",
materials:"Linen cover, handmade embroidery and premium writing paper.",
inspiration:"The cherished Kafal berry and the memories of childhood summers in the hills."
},

{
image:"images/products/product4.jpg",
title:"Where Mountains Rest Pouch",
description:"A handcrafted linen pouch for everyday essentials.",
materials:"Linen fabric, zipper closure and embroidered Himalayan silhouette.",
inspiration:"The mountain skyline that welcomes every traveller home."
}

];
const buttons = document.querySelectorAll(".productCard button");

// ===========================
// PEOPLE POPUP
// ===========================

const people = {

    jigyasa:{

        image:"images/people/jigyasa.jpg",

        name:"Jigyasa Sinhal",

        role:"Social Media & Campaign Intern | Campaign Concept & Website Development",

        bio:"As a Social Media & Campaign Intern at HillCraft, Jigyasa conceptualized The Hills Still Call campaign and designed and developed its official website. She combined storytelling, graphic design and web development to create a digital experience celebrating the people, craftsmanship and heritage of Uttarakhand.",

        work:[
            "Campaign Concept Development",
            "Website Design & Development",
            "Graphic Design",
            "Campaign Planning",
            "UI & UX Design",
            "Digital Storytelling"
        ],

        quote:"Some people preserve traditions with their hands. I hoped to preserve them through stories and design."

    },

    lakshika:{

        image:"images/people/lakshika.jpg",

        name:"Lakshika Shah",

        role:"Social Media & Campaign Intern | Content & Team Coordination",

        bio:"As a Social Media & Campaign Intern at HillCraft, Lakshika played an important role in shaping the campaign through content creation, creative brainstorming, editing and coordination with the artisan community. She ensured that every story, photograph and message reflected the warmth, authenticity and spirit of HillCraft while helping the team stay connected throughout the campaign.",
        work:[
            "Content Creation",
            "Content Editing",
            "Creative Brainstorming",
            "Team Coordination",
            "Campaign Support"
        ],

        quote:"Every story becomes stronger when it is created together."

    },

    anzila:{

        image:"images/people/anzila.jpg",

        name:"Anzila Nawab",

        role:"Campaign Photographer",

        bio:"As the Campaign Photographer for The Hills Still Call, Anzila captured the people, products and stories that define HillCraft. Through thoughtful photography and visual storytelling, she documented the craftsmanship, emotions and traditions of the artisans, allowing every image to become a lasting part of the campaign's journey.",
        work:[
            "Product Photography",
            "Artisan Portraits",
            "Campaign Photography",
            "Visual Storytelling"
        ],

        quote:"Every photograph preserves a moment that words alone cannot tell."

    },

    nishta:{

        image:"images/people/nishta.jpg",

        name:"Nishta Agarwal",

        role:"Campaign Support Intern | Operations",

        bio:"As a Campaign Support Intern, Nishta contributed to the smooth execution of The Hills Still Call through stock management, editing, pre-launch preparation and operational support. Her attention to detail and behind-the-scenes coordination helped ensure that every part of the campaign came together successfully before launch.",

        work:[
            "Stock Management",
            "Content Editing",
            "Operations",
            "Campaign Support",
            "Pre-launch Social Media"
        ],

        quote:"Great campaigns are built through the small details that everyone contributes."

    }

};
const teamGrid = document.querySelector(".teamGrid");

if (teamGrid) {

    Object.values(people).forEach(person => {

        const card = document.createElement("div");

        card.className = "teamCard";

        card.innerHTML = `

            <img src="${person.image}" alt="${person.name}">

            <h3>${person.name}</h3>

            <p class="teamRole">
                ${person.role}
            </p>

            <p class="teamBio">
                ${person.bio}
            </p>

            <h4 class="quoteHeading">
                Contributions
            </h4>

            <ul class="teamWork">
                ${person.work.map(work => `<li>${work}</li>`).join("")}
            </ul>

            <h4 class="quoteHeading">
                Their Words
            </h4>

            <blockquote>
                "${person.quote}"
            </blockquote>

        `;

        teamGrid.appendChild(card);

    });

}
// ===========================
// ARTISANS DATABASE
// ===========================

const artisans = [

    {
        name: "Neema Bisht",
        image: "images/artisans/neema.jpg",
        joined: "2004",
        quote: "Every stitch tells a story, every fabric has a soul."
    },

    {
        name: "Deepa Padalia",
        image: "images/artisans/deepa.jpg",
        joined: "2004",
        quote: "Handmade work keeps our traditions alive."
    },

    {
        name: "Bhagwati Arya ",
        image: "images/artisans/bhawana1.jpg",
        joined: "2007",
        quote: "Every creation begins with patience and care."
    },

    {
        name: "Saraswati Rawat",
        image: "images/artisans/shobha.jpg",
        joined: "2011",
        quote: "The mountains inspire everything I create"
    },

    {
        name: "Sangeeta Dogra",
        image: "images/artisans/sangeeta.jpg",
        joined: "2004",
        quote: "Craft is not just work; it is part of who I am."
    },

    {
        name: "Bhawana Arya",
        image: "images/artisans/bhawana2.jpg",
        joined: "2009",
        quote: "Every thread tells a story worth sharing."
    },

    {
        name: "Beena Negi ",
        image: "images/artisans/beena.jpg",
        joined: "2007",
        quote: "I create with my hands and my memories."
    },

    {
        name: "Rubina Bano",
        image: "images/artisans/rubina.jpg",
        joined: "2023",
        quote: "Our traditions become tomorrow's treasures."
    },

    {
        name: "Deepa Pant",
        image: "images/artisans/deepa2.jpg",
        joined: "2012",
        quote: "Every handmade piece carries warmth."
    },

    {
        name: "Shanti Arya ",
        image: "images/artisans/shanti.jpg",
        joined: "2007",
        quote: "The beauty of handmade lies in its uniqueness."
    },

    {
        name: "Tara Kirola",
        image: "images/artisans/tara.jpg",
        joined: "2007",
        quote: "I hope every creation brings someone joy."
    },

    {
        name: "Anita Pandey",
        image: "images/artisans/anita.jpg",
        joined: "2004",
        quote: "Craftsmanship teaches patience and love."
    },

    {
        name: "Laxmi Negi ",
        image: "images/artisans/laxmi.jpg",
        joined: "2004",
        quote: "Our hands preserve what generations have taught us."
    },

    {
        name: "Sunita Bora",
        image: "images/artisans/sunita.jpg",
        joined: "2012",
        quote: "The smallest details make the biggest difference."
    },

    {
        name: "Mamta Mehra",
        image: "images/artisans/mamta2.jpg",
        joined: "2011",
        quote: "Every day is another chance to create something meaningful."
    },

    {
        name: "Poonam Pandey",
        image: "images/artisans/poonam.jpg",
        joined: "2011",
        quote: "Handmade products carry the touch of the maker."
    },

    {
        name: "Hema Kandpal",
        image: "images/artisans/hema.jpg",
        joined: "2012",
        quote: "Tradition grows stronger when it is shared"
    },

    {
        name: "Veena Bhandari",
        image: "images/artisans/beena2.jpg",
        joined: "2014",
        quote: "My craft connects me to my roots."
    },

    {
        name: "Lalita Negi ",
        image: "images/artisans/lalita.jpg",
        joined: "2023",
        quote: "The hills have always been my greatest inspiration."
    },

    {
        name: "Mamta Sharma",
        image: "images/artisans/mamta.jpg",
        joined: "2011",
        quote: "Every creation reflects a part of my journey"
    },

    {
        name: "Rajni Bisht ",
        image: "images/artisans/rajni.jpg",
        joined: "2011",
        quote: "Simple things made with care become special."
    },

    {
        name: "Krishna Devi",
        image: "images/artisans/krishna.jpg",
        joined: "2007",
        quote: "Every knot and stitch has its own story."
    },

    {
        name: "Neema Adhikari",
        image: "images/artisans/neema2.jpg",
        joined: "2011",
        quote: "Our heritage lives through our hands."
    },

    {
        name: "Pooja Kirola",
        image: "images/artisans/pooja.jpg",
        joined: "2022",
        quote: "Creating by hand brings peace to my heart."
    },

    {
        name: "Rekha Devi ",
        image: "images/artisans/rekha.jpg",
        joined: "2024",
        quote: "I hope my work carries happiness wherever it goes."
    },

    {
        name: "Kiran Bisht",
        image: "images/artisans/kiran.jpg",
        joined: "2024",
        quote: "Every handmade gift carries a blessing."
    },

    {
        name: "Kamla Rawat",
        image: "images/artisans/kamla.jpg",
        joined: "2021",
        quote: "Tradition is something we create every day."
    },

    {
        name: "Prema Bisht",
        image: "images/artisans/prema.jpg",
        joined: "2017",
        quote: "Patience is the secret behind every beautiful creation."
    },

    {
        name: "Basanti Bhandari",
        image: "images/artisans/basanti.jpg",
        joined: "2018",
        quote: "Patience is the secret behind every beautiful creation."
    },

    {
        name: "Manju Rawat",
        image: "images/artisans/manju.jpg",
        joined: "2013",
        quote: "The joy of making is the greatest reward."
    },

    {
        name: "Neetu Jeena ",
        image: "images/artisans/neetu.jpg",
        joined: "2022",
        quote: "Every finished piece is a memory I leave behind."
    },

    {
        name: "Geeta Kandpal",
        image: "images/artisans/geeta.jpg",
        joined: "2011",
        quote: "Our hands tell stories without using words."
    },

    {
        name: "Rinku Sharma",
        image: "images/artisans/rinku.jpg",
        joined: "2011",
        quote: "The beauty of the hills lives in every creation."
    },

    {
        name: "Jamuna Chauhan",
        image: "images/artisans/jamuna.jpg",
        joined: "2024",
        quote: "Every creation is made with hope and care."
    },

    {
        name: "Kamla Negi ",
        image: "images/artisans/kanchan.jpg",
        joined: "2024",
        quote: "A handmade piece carries the warmth of its maker."
    },

    {
        name: "Sheela Bora",
        image: "images/artisans/sheela.jpg",
        joined: "2024",
        quote: "The traditions of today become the memories of tomorrow."
    },

    {
        name: "Priyanka Pawar",
        image: "images/artisans/priyanka.jpg",
        joined: "2024",
        quote: "When someone chooses handmade, they become part of our story."
    }

];
const artisanGrid = document.querySelector(".artisanGrid");

artisans.forEach(artisan => {

    const card = document.createElement("div");

    card.className = "artisanProfile";

    card.innerHTML = `

    <img src="${artisan.image}" alt="${artisan.name}">

<h3>${artisan.name}</h3>

<p class="joined">
    Joined HillCraft in ${artisan.joined}
</p>

<h4 class="quoteHeading">
    Their Words
</h4>

<blockquote>
    "${artisan.quote}"
</blockquote>
`;

    artisanGrid.appendChild(card);

});

const beginPreOrderBtn = document.getElementById("beginPreOrder");

console.log(beginPreOrderBtn);

if (beginPreOrderBtn) {

    beginPreOrderBtn.addEventListener("click", () => {

        console.log("Button clicked");

        window.location.href = "preorder.html";

    });

}