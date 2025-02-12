interface IEmployee{
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface IManager extends IEmployee{
    teamSize: number;
}

class Department{
    private employees: IEmployee[] = [];

    addEmployee(employee: IEmployee): void{
        this.employees.push(employee);
    }

    removeEmployee(id: number): void{
        const index = this.employees.findIndex(emp => emp.id === id);
        if(index !== -1){
            this.employees.splice(index , 1);
        }
    }

    getTotalSalary(): number{
        return this.employees.reduce((total, emp) => total + emp.salary , 0);
    }

    listEmployee(): void{
        console.log(this.employees);
    }
}


function updateSalary<T extends IEmployee>(employee: T , newSalary: number): T{
    employee.salary = newSalary;
    return employee;
}

const emp1: IEmployee = {id: 1 , name: "Bhushan" ,position: "SDE", salary: 40000};
const emp2: IEmployee = {id: 2 , name: "xyz" ,position: "SDE", salary: 40000};
const emp3: IManager = {id: 3 , name: "Vishal" ,position: "Manager", salary: 80000 , teamSize: 4};

const Benchmark = new Department();

Benchmark.addEmployee(emp1);
Benchmark.addEmployee(emp2);
Benchmark.addEmployee(emp3);

Benchmark.listEmployee();
/* OUTPUT -
[{
  "id": 1,
  "name": "Bhushan",
  "position": "SDE",
  "salary": 40000
}, {
  "id": 2,
  "name": "xyz",
  "position": "SDE",
  "salary": 40000
}, {
  "id": 3,
  "name": "Vishal",
  "position": "Manager",
  "salary": 80000,
  "teamSize": 4
}] 
*/

console.log(Benchmark.getTotalSalary());
// OUTPUT - 160000

Benchmark.removeEmployee(2);

Benchmark.listEmployee();
/* OUTPUT -
[{
  "id": 1,
  "name": "Bhushan",
  "position": "SDE",
  "salary": 40000
}, {
  "id": 3,
  "name": "Vishal",
  "position": "Manager",
  "salary": 80000,
  "teamSize": 4
}] 
*/