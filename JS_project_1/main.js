"use strict";

let money;

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = function (value) {
  // regular expression
  const regex = /^[a-zA-Z\s]*$/;
  if (!value) {
    return false;
  }
  if (value.match(regex)) {
    return true;
  } else {
    return false;
  }
};

const start = function () {
  do {
    money = prompt("money per month: ");
  } while (!isNumber(money));
};

start();

const appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm("do you have additional income?")) {
      let additionalIncome;
      while (!isText(additionalIncome)) {
        additionalIncome = prompt("Additional income (must be string): ", "Uber driver");
      }
      let cashIncome;
      while (!isNumber(cashIncome)) {
        cashIncome = prompt("Cash income (must be number): ", 30000);
      }
      appData.income[additionalIncome] = cashIncome;
    }

    const addExpenses = prompt(
      "possible expenses: ",
      "cinema, circus, trip abroad"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");

    for (let i = 0; i < 2; i++) {
      let amount;
      let obligatoryExpenses;
      while (!isText(obligatoryExpenses)) {
        obligatoryExpenses = prompt(
          "Obligatory expenses " + (i + 1) + " (must be string): "
        );
      }
      while (!isNumber(amount)) {
        amount = prompt("Expenses amount " + (i + 1) + " (must be number): ");
      }
      appData.expenses[obligatoryExpenses] = +amount;
    }

    appData.deposit = confirm("do you have deposit? ");
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "high income";
    } else if (600 <= appData.budgetDay && appData.budgetDay < 1200) {
      return "middle income";
    } else if (0 <= appData.budgetDay && appData.budgetDay < 600) {
      return "low income";
    } else {
      return "something went wrong";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      while (
        !isNumber(prompt("What is your deposit percent (must be number)?", 10))
      ) {
        appData.percentDeposit = prompt(
          "What is your deposit percent (must be number)?",
          10
        );
      }
      while (
        !isNumber(
          prompt(
            "How much money do you have as a deposit (must be number)?",
            40000
          )
        )
      ) {
        appData.moneyDeposit = prompt(
          "How much money do you have as a deposit (must be number)?: ",
          40000
        );
      }
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();

let statusIncome = appData.getStatusIncome();

console.log("budget " + appData.budget);
console.log("----------------------------------");
console.log("obligatory expenses: ");
console.log(appData.expenses);
console.log("----------------------------------");
console.log("expenses per month: " + (appData.budget - appData.budgetMonth));
console.log("----------------------------------");
console.log("mission: " + appData.mission);
console.log("get target month, period: " + appData.getTargetMonth());
console.log("----------------------------------");
console.log("status:  " + statusIncome);

let additionalExpensesString = "";
appData.addExpenses.forEach((item, index) => {
  additionalExpensesString +=
    item.slice(0, 1).toUpperCase() +
    item.substr(1).toLowerCase() +
    (index === appData.addExpenses.length - 1 ? "" : ", ");
});
console.log("addExpenses one-line:  " + additionalExpensesString);
