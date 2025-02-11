/*
# Assignment

## Employee Management System

Create Employee class with name, id, #salary.
Subclasses: Manager, Engineer, Intern.
Polymorphism: Override calculateBonus() for each role.

## Vehicle Rental System


## Online Payment System

Create Payment class with amount, date.
Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
Abstraction: Hide sensitive details like #cardNumber.
*/

abstract class Employee{
    constructor(public name: string , public id: number , private salary:number = 0){}
    abstract calculateBonus(): number;

    protected getSalary(): number{
        return this.salary;
    }

}

class Manager extends Employee{
    calculateBonus(): number {
        return this.getSalary() * 0.5 ;
    }
}

class Engineer extends Employee{
    calculateBonus(): number {
        return this.getSalary() * 0.3 ;
    }
}

class Intern extends Employee{
    calculateBonus(): number {
        return this.getSalary() * 0.1 ;
    }
}

const manager = new Manager('bhushan' , 7 , 10000);
console.log(`Your Bonus is : ${manager.calculateBonus()}`); //Your Bonus is : 5000

const engineer = new Engineer('bhushan' , 7 , 10000);
console.log(`Your Bonus is : ${engineer.calculateBonus()}`); //Your Bonus is : 3000

const intern = new Intern('bhushan' , 7 , 10000);
console.log(`Your Bonus is : ${intern.calculateBonus()}`); //Your Bonus is : 1000