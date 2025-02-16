type ExpenseCategory = "Food" | "Travel" | "Bills" | "Shopping";

class Expense {
  id: number;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;

  constructor(
    description: string,
    category: ExpenseCategory,
    amount: number,
    date: string
  ) {
    this.id = Date.now();
    this.description = description;
    this.category = category;
    this.amount = amount;
    this.date = date;
  }
}

function getExpenses(): Expense[] {
  return JSON.parse(localStorage.getItem("expenses") || "[]");
}

function saveExpenses(expenses: Expense[]) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal(expenses: Expense[]) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("total-expense")!.textContent = `$${total.toFixed(
    2
  )}`;
}

function showExpenses(expenses: Expense[]) {
  const expenseList = document.getElementById("expense-list")!;
  expenseList.innerHTML = expenses.length
    ? expenses
        .map(
          (exp) => `
          <div class="expense-item" data-id="${exp.id}">
            <div>
              <p><strong>${exp.category}</strong>: $${exp.amount.toFixed(2)}</p>
              <p>${exp.description} - ${exp.date}</p>
            </div>
            <button class="delete-expense">🗑️</button>
          </div>`
        )
        .join("")
    : `<p>No expenses found.</p>`;
}

function displayExpenses() {
  const filterCategory = (
    document.getElementById("filter-category") as HTMLSelectElement
  ).value;
  let expenses = getExpenses();

  if (filterCategory !== "All") {
    expenses = expenses.filter((exp) => exp.category === filterCategory);
  }

  showExpenses(expenses);
  updateTotal(expenses);
}

function deleteExpense(id: number) {
  const updatedExpenses = getExpenses().filter((exp) => exp.id !== id);
  saveExpenses(updatedExpenses);
  displayExpenses();
}

function clearAllExpenses() {
  localStorage.removeItem("expenses");
  displayExpenses();
}

document.getElementById("expense-list")!.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("delete-expense")) {
    const id = Number(target.closest(".expense-item")!.getAttribute("data-id"));
    deleteExpense(id);
  }
});

document
  .getElementById("expense-form")!
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const categoryInput = document.getElementById(
      "category"
    ) as HTMLSelectElement;
    const dateInput = document.getElementById("date") as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLInputElement;

    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value as ExpenseCategory;
    const date = dateInput.value;
    const description = descriptionInput.value.trim();

    if (!amount || !date) {
      alert("Please fill all required fields!");
      return;
    }

    const newExpense = new Expense(description, category, amount, date);
    const expenses = getExpenses();
    expenses.push(newExpense);
    saveExpenses(expenses);

    amountInput.value = "";
    categoryInput.value = "Food";
    dateInput.value = "";
    descriptionInput.value = "";

    displayExpenses();
  });

document
  .getElementById("filter-category")!
  .addEventListener("change", displayExpenses);
document
  .getElementById("clear-expenses")!
  .addEventListener("click", clearAllExpenses);
document.addEventListener("DOMContentLoaded", displayExpenses);
