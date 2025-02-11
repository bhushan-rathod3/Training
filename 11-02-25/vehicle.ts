abstract class Vehicle{
    constructor(protected brand: string, protected model: string, protected rentPricePerDay: number) {}
    abstract calculateRentalCost(days: number): string;
}

class Car extends Vehicle {
    calculateRentalCost(days: number): string {
        return `Rent for ${this.brand} ${this.model} for ${days} days is ${this.rentPricePerDay * days * 1.1}`;
    }
}

class Bike extends Vehicle {
    calculateRentalCost(days: number): string {
        return `Rent for ${this.brand} ${this.model} for ${days} days is ${this.rentPricePerDay * days * 1.05}`;
    }
}

class Truck extends Vehicle {
    calculateRentalCost(days: number): string {
        return `Rent for ${this.brand} ${this.model} for ${days} days is ${this.rentPricePerDay * days * 1.2}`;
    }
}

const car = new Car('BMW' , 'M5' , 5000);
console.log(car.calculateRentalCost(5)); //Rent for BMW M5 for 5 days is 27500.000000000004

const bike = new Bike('BMW' , 'M5' , 5000);
console.log(bike.calculateRentalCost(5)); //Rent for BMW M5 for 5 days is 26250

const truck = new Truck('BMW' , 'M5' , 5000);
console.log(truck.calculateRentalCost(5)); //Rent for BMW M5 for 5 days is 30000