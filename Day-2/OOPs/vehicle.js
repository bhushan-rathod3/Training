class Vehicle{
    constructor(brand , model , rentPricePerDay){
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days){
        return 0;
    }
}

class Car extends Vehicle{
    constructor(brand , model , rentPricePerDay){
        super(brand , model , rentPricePerDay);
    }

    calculateRentalCost(days){
        return `${this.brand} ${this.model}'s Rent for ${days} days is  ${this.rentPricePerDay * days}Rs.`;
    }
};

class Bike extends Vehicle{
    constructor(brand , model , rentPricePerDay){
        super(brand , model , rentPricePerDay);
    }

    calculateRentalCost(days){       
        return `${this.brand} ${this.model}'s Rent for ${days} days is  ${this.rentPricePerDay * days}Rs.`;
    }
};

class Truck extends Vehicle{
    constructor(brand , model , rentPricePerDay){
        super(brand , model , rentPricePerDay);
    }

    calculateRentalCost(days){
        return `${this.brand} ${this.model}'s Rent for ${days} days is  ${this.rentPricePerDay * days}Rs.`;
    }
};


const car = new Car('BMW' , 'm5' , 5000);
const bike = new Bike('Hero' , 'Splendor' , 500);
const truck = new Truck('Volvo' , 'ACL' , 8000);

console.log(car.calculateRentalCost(5)); //OUTPUT - BMW m5's Rent for 5 days is  25000Rs.
console.log(bike.calculateRentalCost(5)); //OUTPUT - Hero Splendor's Rent for 5 days is  2500Rs.
console.log(truck.calculateRentalCost(5)); //OUTPUT - Volvo ACL's Rent for 5 days is  40000Rs.