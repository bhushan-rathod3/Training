/*
# Assignment

## Employee Management System

Create Employee class with name, id, #salary.
Subclasses: Manager, Engineer, Intern.
Polymorphism: Override calculateBonus() for each role.

## Vehicle Rental System

Create Vehicle class with brand, model, rentPricePerDay.
Subclasses: Car, Bike, Truck.
Polymorphism: Implement calculateRentalCost(days).

## Online Payment System

Create Payment class with amount, date.
Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
Abstraction: Hide sensitive details like #cardNumber.
*/
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
var Employee = /** @class */ (function () {
    function Employee(name, id, salary) {
        if (salary === void 0) { salary = 0; }
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    Employee.prototype.getSalary = function () {
        return this.salary;
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manager.prototype.calculateBonus = function () {
        return this.getSalary() * 0.5;
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Engineer.prototype.calculateBonus = function () {
        return this.getSalary() * 0.3;
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intern.prototype.calculateBonus = function () {
        return this.getSalary() * 0.1;
    };
    return Intern;
}(Employee));
var manager = new Manager('bhushan', 7, 10000);
console.log(manager.calculateBonus);
