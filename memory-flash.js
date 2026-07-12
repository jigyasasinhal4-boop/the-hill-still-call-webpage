const image1 = document.getElementById("memoryImage1");
const image2 = document.getElementById("memoryImage2");

const memories = [];

for(let i = 1; i <= 28; i++){
    memories.push(`images/memories/${i}.jpg`);
}

let current = 0;
let showingFirst = true;

// First image
image1.src = memories[0];
image1.style.opacity = 1;

current = 1;

function nextImage(){

    if(current >= memories.length){

        setTimeout(()=>{
            window.location.href = "home.html";
        },2000);

        return;
    }

    if(showingFirst){

        image2.src = memories[current];
        image2.style.opacity = 1;
        image1.style.opacity = 0;

    }else{

        image1.src = memories[current];
        image1.style.opacity = 1;
        image2.style.opacity = 0;

    }

    showingFirst = !showingFirst;
    current++;

    setTimeout(nextImage, 2500);

}

setTimeout(nextImage,1700);