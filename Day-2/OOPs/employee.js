// ## Employee Management System

// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.

class Employee{
    #salary;

    constructor(name , id , salary) {
        this.name = name;
        this.#salary = salary;
        this.id = id;
    };
    
    getSalary(){
        return this.#salary;
    }

    calculateBonus(){
        console.log("bonus");
    };
    
};

class Manager extends Employee{
    constructor(name , id , salary){
        super(name , id , salary);
    }

    calculateBonus(){
        console.log("Manager's Bonus");
        return this.getSalary() * 0.2;
    }
}

class Engineer extends Employee{
    constructor(name , id , salary){
        super(name , id , salary);
    }

    calculateBonus(){
        console.log("Engineer's Bonus");
        return this.getSalary() * 0.3;
    }
}
class Intern extends Employee{
    constructor(name , id , salary){
        super(name , id , salary);
    }

    calculateBonus(){
        console.log("Intern's Bonus");
        return this.getSalary() * 0.1;
    }
}


const manager = new Manager('Bhushan' , 3 , 25000);
const engineer = new Engineer('Bhushan' , 4 , 25000);
const intern = new Intern('Bhushan' , 3 , 25000);

console.log(manager.getSalary());
console.log(engineer.getSalary());
console.log(intern.getSalary());


console.log(manager.calculateBonus());
console.log(engineer.calculateBonus());
console.log(intern.calculateBonus());
