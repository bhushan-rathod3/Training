const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
];

const carouselImage = document.getElementById("carouselImage");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
    
 function updateImage() {
    carouselImage.src = images[currentIndex];
}
       
nextBtn.addEventListener("click", function() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

        
prevBtn.addEventListener("click", function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

updateImage();