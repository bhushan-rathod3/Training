const products = [
    { name: "Charger", price: 800, category: "Electronics" },
    { name: "Shoes", price: 500, category: "Fashion" },
    { name: "Headphones", price: 150, category: "Electronics" },
    { name: "T-shirt", price: 20, category: "Fashion" },
    { name: "Spinner", price: 200, category: "Toys" }
];

const captialProductNames = products.map(product => product.name.toUpperCase());
console.log(captialProductNames);  //OUTPUT - [ 'CHARGER', 'SHOES', 'HEADPHONES', 'T-SHIRT', 'SPINNER' ]


const electronicGadgets = products.filter(product => product.category === "Electronics")
console.log(electronicGadgets); /* OUTPUT - 
        [
            { name: 'Charger', price: 800, category: 'Electronics' },
            { name: 'Headphones', price: 150, category: 'Electronics' }
        ]
                                */

const totalPrice = products.reduce((total , product) => total + product.price , 0);
console.log(totalPrice); //OUTPUT - 1670

function calculateTotalFromCategory(category){
    return products
            .filter(product => product.category === category)
            .map(product => product.price)
            .reduce((total , price) => total + price , 0);

}

console.log(calculateTotalFromCategory("Electronics")) //OUTPUT - 950