let defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUsrInput(){
  return parseInt(usrInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber ){

  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function calculateResult(calculationType){
  const enteredNumber = getUsrInput();
  if( calculationType !== 'Add' &&
      calculationType !== 'Subtruct' &&
      calculationType !== 'Multiply' &&
      calculationType !== 'Devide' ||
      enteredNumber === 0
  ){
    return;
  }


  const initialResult = currentResult;
  let mathoperator;
  if(calculationType === 'Add'){
    currentResult +=  enteredNumber;
    mathoperator = '+'
  }
  else if (calculationType === 'Subtruct') {
    currentResult -=  enteredNumber;
    mathoperator = '-';
  }
  else if(calculationType === 'Multiply'){
    currentResult *=  enteredNumber;
    mathoperator = '*';
  }
  else if(calculationType === 'Devide'){
    currentResult /=  enteredNumber;
    mathoperator = '/';
    
  }
  createAndWriteOutput(mathoperator,initialResult,enteredNumber)
}

function add (){
  calculateResult('Add')
}

function subtract(){
  calculateResult('Subtruc')
}

function multiply(){
  calculateResult('Multiply')
}

function devide(){
  calculateResult('Devid')
}



addBtn.addEventListener('click',add) 
subtractBtn.addEventListener('click',subtract) 
multiplyBtn.addEventListener('click',multiply) 
divideBtn.addEventListener('click',devide) 







//  OTHER THINGS
// =========================================================================
// let errorMessage = 'An error \n' +  'occurred';
// let calculationDescription = '(' + defaultResult + ' + 10) * 3 / 2 - 1';

// function
// function add(num1,num2){
//   const result = num1 + num2 ;
//   return result;
// }

// add(5,5);
// currentResult = add(1,2);