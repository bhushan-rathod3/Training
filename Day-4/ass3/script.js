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

setInterval(addData, 1000);

setInterval(() => {
    clearInterval(addData);
    clearMemory();
}, 10000);