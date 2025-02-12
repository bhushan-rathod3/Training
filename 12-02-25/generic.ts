class GenericStorage<T>{
    private items: T[] = [];

    add(item: T): void{
        this.items.push(item);
    }

    remove(item: T): void{
        const index = this.items.findIndex(i => i === item);
        if(index !== -1){
            this.items.splice(index , 1);
        }
    }

    getAll(): T[]{
        return this.items;
    }
}

interface Product{
    id: number;
    name: string;
    price: number;
}

const Products = new GenericStorage<Product>();

const product1: Product = {id: 1 , name: "Mobile" , price: 20000};
const product2: Product = {id: 2 , name: "Football" , price: 500};
const product3: Product = {id: 3 , name: "Keyboard" , price: 1000};

Products.add(product1);
Products.add(product2);
Products.add(product3);

console.log(Products.getAll());
/* OUTPUT - 
[{
  "id": 1,
  "name": "Mobile",
  "price": 20000
}, {
  "id": 2,
  "name": "Football",
  "price": 500
}, {
  "id": 3,
  "name": "Keyboard",
  "price": 1000
}] 
*/

Products.remove(product3);

console.log(Products.getAll());
/* OUTPUT - 
[{
  "id": 1,
  "name": "Mobile",
  "price": 20000
}, {
  "id": 2,
  "name": "Football",
  "price": 500
}] 
*/