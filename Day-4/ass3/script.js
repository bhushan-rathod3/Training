document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click' , addData);
})

let arrayLeak = [];

function addData() {
    for (let i = 0; i < 500; i++) {
        arrayLeak.push({ data: new Array(500).fill("memory-leak") });
    }
    console.log("Array Size:", arrayLeak.length);
}

function clearMemory() {
    arrayLeak = [];  
    console.log("Memory Cleared");
}

let addInterval = setInterval(addData, 1000);


setTimeout(() => {
    clearInterval(addInterval);
    clearMemory();
}, 10000);