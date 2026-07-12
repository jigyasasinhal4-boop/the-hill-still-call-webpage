// ----------------------------
// Create the map
// ----------------------------
const supabaseClient = window.supabase.createClient(
    "https://eimhnjoygynzeqjtwmyp.supabase.co",
    "sb_publishable_jkThzw4SJ8PxD-yQnHCbwA_Mub3qEMh"
);
let currentMemory = null;

const map = L.map("map").setView([29.6436, 79.4322], 8);

// Dark map
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap & CARTO",
    subdomains: "abcd",
    maxZoom: 20
}).addTo(map);

// ----------------------------
// Memory Pin
// ----------------------------

const memoryIcon = L.divIcon({
    className: "memoryPin",
    html: "<div class='pinGlow'></div>",
    iconSize: [22,22]
});

// ----------------------------
// Memory Panel
// ----------------------------

const memoryImage = document.getElementById("memoryImage");
const memoryLocation = document.getElementById("memoryLocation");
const memoryTitle = document.getElementById("memoryTitleDisplay");
const memoryStory = document.querySelector("#memoryPanel p");

// ----------------------------
// Load Memories
// ----------------------------

async function loadMemories() {

    const { data: memories, error } = await supabaseClient
        .from("memories")
        .select("*")
        .eq("status", "approved");

    if (error) {

        console.error(error);

        return;

    }

    memories.forEach(memory => {

        const marker = L.marker(
            [memory.latitude, memory.longitude],
            { icon: memoryIcon }
        ).addTo(map);

        marker.on("click", () => {

            memoryImage.src =
                memory.image_url || "images/cards/memories.jpg";

            memoryLocation.textContent = memory.place;

            memoryTitle.textContent = memory.title;

            memoryStory.textContent = memory.story;

            currentMemory = memory;

        });

    });

}
loadMemories();

// ----------------------------
// Memory Form
// ----------------------------

const memoryForm = document.getElementById("memoryForm");

let pickingLocation = false;

const pickLocationBtn = document.getElementById("pickLocation");

const memoryPlace = document.getElementById("memoryPlace");
let selectedLatitude = null;
let selectedLongitude = null;
map.on("click", async (event) => {

    if (!pickingLocation) return;

    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    selectedLatitude = lat;
    selectedLongitude = lng;

    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    const locationData = await response.json();

    memoryPlace.value =
        locationData.address.village ||
        locationData.address.town ||
        locationData.address.city ||
        locationData.address.hamlet ||
        locationData.display_name;

    L.marker([lat, lng], {
        icon: memoryIcon
    }).addTo(map);

    pickingLocation = false;
   memoryForm.classList.add("active");

});
pickLocationBtn.addEventListener("click",()=>{

    pickingLocation = true;

    map.setView([29.6436, 79.4322], 9);


    memoryForm.classList.remove("active");


});
document.getElementById("shareBtn").addEventListener("click",()=>{

    memoryForm.classList.add("active");

   
});

document.getElementById("closeForm").addEventListener("click",()=>{

    memoryForm.classList.remove("active");

});

window.addEventListener("click",(event)=>{

    if(event.target === memoryForm){

        memoryForm.classList.remove("active");

    }

});


const storyPopup = document.getElementById("storyPopup");

const readMoreBtn = document.getElementById("readMoreBtn");

const closeStory = document.getElementById("closeStory");

readMoreBtn.addEventListener("click",()=>{

    if(!currentMemory) return;

    document.getElementById("storyImage").src = currentMemory.image;

    document.getElementById("storyLocation").textContent = currentMemory.place;

    document.getElementById("storyTitle").textContent = currentMemory.title;

    document.getElementById("storyDate").textContent = currentMemory.date;

    document.getElementById("storyText").textContent = currentMemory.story;

    storyPopup.classList.add("active");

});

closeStory.addEventListener("click",()=>{

    storyPopup.classList.remove("active");

});
document.getElementById("submitMemory").addEventListener("click", async () => {

    const title = document.getElementById("memoryTitle").value.trim();
    const place = document.getElementById("memoryPlace").value.trim();
    const date = document.getElementById("memoryDate").value;
    const name = document.getElementById("memoryName").value.trim();
    const story = document.getElementById("memoryStory").value.trim();
    const file = document.getElementById("memoryPhotos").files[0];

if (
    !title ||
    !place ||
    !date ||
    !story ||
    selectedLatitude === null ||
    selectedLongitude === null
) {
    alert("Please complete all required fields and pick a location on the map.");

    return;
}
let imageUrl = "";

if (file) {

    const fileName = `${Date.now()}-${file.name}`;
const { error: uploadError } = await supabaseClient.storage
    .from("memory-images")
    .upload(fileName, file);
    if (uploadError) {

    alert("Photo upload failed.");

    console.error(uploadError);

    return;

}
const { data: imageData } = supabaseClient.storage
    .from("memory-images")
    .getPublicUrl(fileName);

imageUrl = imageData.publicUrl;

}
        const { error: insertError } = await supabaseClient
    .from("memories")
    .insert([
        {
            name: name || "Anonymous",
            title: title,
            story: story,
            place: place,
            latitude: selectedLatitude,
            longitude: selectedLongitude,
            image_url: imageUrl,
            status: "pending",
            memory_date: date
        }
    ]);

    if (insertError) {

    alert("Memory could not be submitted.");

    console.error(insertError);

    return;

}
alert("Thank you! Your memory has been submitted for review.");

document.getElementById("memoryTitle").value = "";
document.getElementById("memoryPlace").value = "";
document.getElementById("memoryDate").value = "";
document.getElementById("memoryName").value = "";
document.getElementById("memoryStory").value = "";
document.getElementById("memoryPhotos").value = "";

selectedLatitude = null;
selectedLongitude = null;

memoryForm.classList.remove("active");
});