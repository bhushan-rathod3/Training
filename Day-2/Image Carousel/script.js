const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
];


  


const carouselImage = document.getElementById("carouselImage");
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");

        let currentIndex = 0;

        // Function to update the image
        function updateImage() {
            carouselImage.src = images[currentIndex];
        }

        // Next button click event
        nextBtn.addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });

        // Previous button click event
        prevBtn.addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });

        // Initial image setup
        updateImage();