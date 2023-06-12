"use strict";
class Calculator {
  constructor(dataPreviousOperandTextElement, dataCurrentOperandTextElement) {
    this.dataPreviousOperandTextElement = dataPreviousOperandTextElement;
    this.dataCurrentOperandTextElement = dataCurrentOperandTextElement;
    this.clear();
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "X":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  updateDisplay() {
    this.dataCurrentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.dataPreviousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.dataPreviousOperandTextElement.innerText = "";
    }
  }
}
const dataNumbers = document.querySelectorAll("[data-number]");
const dataOperation = document.querySelectorAll("[data-operation]");
const dataEquals = document.querySelector("[data-equals]");
const dataClear = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataPreviousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const dataCurrentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  dataPreviousOperandTextElement,
  dataCurrentOperandTextElement
);

dataNumbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
dataOperation.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
dataEquals.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
dataClear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
dataDelete.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
