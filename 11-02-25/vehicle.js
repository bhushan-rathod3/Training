var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        return "Rent for ".concat(this.brand, " ").concat(this.model, " for ").concat(days, " days is ").concat(this.rentPricePerDay * days * 1.1);
    };
    return Car;
}(Vehicle));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bike.prototype.calculateRentalCost = function (days) {
        return "Rent for ".concat(this.brand, " ").concat(this.model, " for ").concat(days, " days is ").concat(this.rentPricePerDay * days * 1.05);
    };
    return Bike;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        return "Rent for ".concat(this.brand, " ").concat(this.model, " for ").concat(days, " days is ").concat(this.rentPricePerDay * days * 1.2);
    };
    return Truck;
}(Vehicle));
var car = new Car('BMW', 'M5', 5000);
console.log(car.calculateRentalCost(5)); //Rent for BMW M5 for 5 days is 27500.000000000004
var bike = new Bike('BMW', 'M5', 5000);
console.log(bike.calculateRentalCost(5)); //Rent for BMW M5 for 5 days is 26250
var truck = new Truck('BMW', 'M5', 5000);
console.log(truck.calculateRentalCost(5)); //Rent for BMW M5 for 5 days is 30000
