// script.js

let display = document.getElementById('display');
let keys = document.querySelectorAll('.keys button');

let calculator = {
    displayValue: '',
    firstOperand: null,
    secondOperand: null,
    operator: null,
    isOperator: false,
};

keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        let keyValue = e.target.textContent;

        if (keyValue === 'C') {
            calculator.displayValue = '';
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.operator = null;
            calculator.isOperator = false;
            display.value = '';
        } else if (keyValue === '<') {
            calculator.displayValue = calculator.displayValue.slice(0, -1);
            display.value = calculator.displayValue;
        } else if (keyValue === '=' && calculator.operator) {
            calculator.secondOperand = parseFloat(calculator.displayValue);
            let result = calculate(calculator.firstOperand, calculator.secondOperand, calculator.operator);
            display.value = result;
            calculator.displayValue = result;
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.operator = null;
            calculator.isOperator = false;
        } else if (keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/') {
            if (calculator.isOperator) return;
            calculator.firstOperand = parseFloat(calculator.displayValue);
            calculator.operator = keyValue;
            calculator.isOperator = true;
            calculator.displayValue = '';
        } else {
            calculator.displayValue += keyValue;
            display.value = calculator.displayValue;
        }
    });
});

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return 'Error: Division by zero';
            }
            return a / b;
    }
}
