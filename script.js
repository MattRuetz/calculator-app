const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-button');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Calculate operands with operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber, //result stored in 2nd operand
};

// Send a value of clicked number btn to screen
const sendNumberValue = (number) => {
    // Replace current display IF first val has been entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display = '0' -> replace, else append number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =
            displayValue === '0' ? number : displayValue + number;
    }
};

// adds a decimal, only if not repeating
const addDecimal = () => {
    // If operator pressed (awaiting next val) -> DONT allow adding decimal
    if (awaitingNextValue) return;

    // If no decimal, append one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
};

// Collect first value and second value, then apply calculation object
// and set result as first operand for more inputs to operate on this val
const useOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    // Assign first value if undefined
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next val... store operator
    awaitingNextValue = true;
    operatorValue = operator;
};

// Reset Display
const resetAll = () => {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
};

// Add event listener to ever button
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () =>
            sendNumberValue(inputBtn.value)
        );
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// CLEAR event listener... ^
clearBtn.addEventListener('click', resetAll);
