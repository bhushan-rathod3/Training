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


/*OUTPUT 
25000
25000
25000
Manager's Bonus
5000
Engineer's Bonus
7500
Intern's Bonus
2500
*/