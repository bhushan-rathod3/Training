var Expense = /** @class */ (function () {
    function Expense(description, category, amount, date) {
        this.id = Date.now();
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }
    return Expense;
}());
function getExpenses() {
    return JSON.parse(localStorage.getItem("expenses") || "[]");
}
function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function updateTotal(expenses) {
    var total = expenses.reduce(function (sum, exp) { return sum + exp.amount; }, 0);
    document.getElementById("total-expense").textContent = "$".concat(total.toFixed(2));
}
function showExpenses(expenses) {
    var expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = expenses.length
        ? expenses
            .map(function (exp) { return "\n          <div class=\"expense-item\" data-id=\"".concat(exp.id, "\">\n            <div>\n              <p><strong>").concat(exp.category, "</strong>: $").concat(exp.amount.toFixed(2), "</p>\n              <p>").concat(exp.description, " - ").concat(exp.date, "</p>\n            </div>\n            <button class=\"delete-expense\">\uD83D\uDDD1\uFE0F</button>\n          </div>"); })
            .join("")
        : "<p>No expenses found.</p>";
}
function displayExpenses() {
    var filterCategory = document.getElementById("filter-category").value;
    var expenses = getExpenses();
    if (filterCategory !== "All") {
        expenses = expenses.filter(function (exp) { return exp.category === filterCategory; });
    }
    showExpenses(expenses);
    updateTotal(expenses);
}
function deleteExpense(id) {
    var updatedExpenses = getExpenses().filter(function (exp) { return exp.id !== id; });
    saveExpenses(updatedExpenses);
    displayExpenses();
}
function clearAllExpenses() {
    localStorage.removeItem("expenses");
    displayExpenses();
}
document.getElementById("expense-list").addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("delete-expense")) {
        var id = Number(target.closest(".expense-item").getAttribute("data-id"));
        deleteExpense(id);
    }
});
document
    .getElementById("expense-form")
    .addEventListener("submit", function (event) {
    event.preventDefault();
    var amountInput = document.getElementById("amount");
    var categoryInput = document.getElementById("category");
    var dateInput = document.getElementById("date");
    var descriptionInput = document.getElementById("description");
    var amount = parseFloat(amountInput.value);
    var category = categoryInput.value;
    var date = dateInput.value;
    var description = descriptionInput.value.trim();
    if (!amount || !date) {
        alert("Please fill all required fields!");
        return;
    }
    var newExpense = new Expense(description, category, amount, date);
    var expenses = getExpenses();
    expenses.push(newExpense);
    saveExpenses(expenses);
    amountInput.value = "";
    categoryInput.value = "Food";
    dateInput.value = "";
    descriptionInput.value = "";
    displayExpenses();
});
document
    .getElementById("filter-category")
    .addEventListener("change", displayExpenses);
document
    .getElementById("clear-expenses")
    .addEventListener("click", clearAllExpenses);
document.addEventListener("DOMContentLoaded", displayExpenses);
