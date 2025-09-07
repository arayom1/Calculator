class Calculator{
    constructor(previousNumOnDisplay, currentNumOnDisplay){
        this.previousNumOnDisplay = previousNumOnDisplay;
        this.currentNumOnDisplay = currentNumOnDisplay;
        this.clear();
    }

    clear(){
      this.currentNumber = '';
      this.previousNumber = '';
      this.operator = undefined; 
    }

    delete(){
      this.currentNumber = this.currentNumber.toString().slice(0,-1);
    }
    
    appendNumber(number) {
      if (number === '.' && this.currentNumber.includes('.')) return;
      this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    chooseOperation(operator){
      if (this.currentNumber === '') return;
      if (this.previousNumber !== ''){
        this.calculate();
      }
      this.operator = operator;
      this.previousNumber = this.currentNumber;
      this.currentNumber = '';
    }

    calculate(){
      let calculation;
      const prev = parseFloat(this.previousNumber);
      const current = parseFloat(this.currentNumber);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operator) {
        case '+':
          calculation = prev + current;
          break;
        case '-':
          calculation = prev - current;
          break;
        case '*':
          calculation = prev * current;
          break;
        case '/':
          calculation = prev / current;
          break;
        default:
          return;
      }
      this.currentNumber = calculation;
      this.operator = undefined;
      this.previousNumber = '';
    }

    updateDisplay(){
      this.currentNumOnDisplay.innerText = this.currentNumber;
      if (this.operator != null) {
        this.previousNumOnDisplay.innerText = `${this.previousNumber} ${this.operator}`;
      }else{
        this.previousNumOnDisplay.innerText = '';
      }
    }
}

const previousNumOnDisplay = document.querySelector('.previousNum');
const currentNumOnDisplay = document.querySelector('.currentNum');
const clearBtn = document.querySelector('.clearButton');
const deleteBtn = document.querySelector('.deleteButton');
const numberBtns = document.querySelectorAll('.numberButton');
const operatorBtns = document.querySelectorAll('.operatorButton');
const equalsBtn = document.querySelector('.equalsButton');

const calculator = new Calculator(previousNumOnDisplay, currentNumOnDisplay);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.calculate();
  calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})