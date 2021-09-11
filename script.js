let displayNum;
let num1;
let num2;
let tempNum;
let tempNum1;
let tempNum2;
let operMethod;
let afEqual = false;
let eql = false;
let mini_dis = document.getElementById('miniOut');
let display = document.getElementById('outputScreen');
const paperRollDis = document.getElementById('paperRoll');

document.addEventListener('DOMContentLoaded', function() {
    
    // Adds a eventListener on all the numbers in the keypad.
    const listNumbers = document.querySelectorAll(`.number-div`);
    
    
    listNumbers.forEach(numb => numb.addEventListener('click', displayOut));

    // Adds a eventListener on all the the arithmatic signs.
    const subtractButton = document.getElementById('minus-div');
    const addButton = document.getElementById('add-div');
    const divisionButton = document.getElementById('division-div');
    const multiButton = document.getElementById('multi-div');
    const equalButton = document.getElementById('equal-div');
    const paperRollDisplay = document.getElementById('paperRoll');


    window.addEventListener('keydown', function(e) {
        if(e.key == '*'){
            afEqual = false;
            multiplication();
        }else if(e.key == '+'){
            afEqual = false;
            add();
        }else if(e.key =='-'){
            afEqual = false;
            subtract();
        }else if(e.key =='/'){
            afEqual = false;
            division();
        }else if(e.key=='=' || e.key == 'Enter'){
            equal();
        }else if(e.key =='%'){
            percent();
        }else if(e.key == '.'){
            addDecimal();
        }else if(e.key == 'Backspace') {
            backSpaceB();
        }else if(e.key == 'c'){
            clearAll();
        }else if (!isNaN(e.key)){
            if(afEqual == true) {
                clearAll();
                afEqual = false;
            }else if(display.innerHTML == '0'){
                display.innerHTML = e.key;
                displayNum = display.innerHTML
                return;
            }else if(displayNum == undefined || displayNum.length < 12){
                display.innerHTML = display.innerHTML + e.key;
                displayNum = display.innerHTML
            }
        } 
    })

    equalButton.addEventListener('click', equal );

    subtractButton.addEventListener('click', subtract );

    addButton.addEventListener('click', add );

    divisionButton.addEventListener('click', division );

    multiButton.addEventListener('click', multiplication );

    const clearButton = document.querySelector(`.c-div`);
    clearButton.addEventListener('click', clearAll);

    const negativeButton = document.querySelector(`.sign-div`);
    negativeButton.addEventListener('click', negativeSign);

    const percentButton = document.querySelector(`.perc-div`);
    percentButton.addEventListener('click', percent);

    const decimalButton = document.querySelector(`.deci-div`);
    decimalButton.addEventListener('click', addDecimal);
});

function displayOut() {
        if(afEqual == true) {
            clearAll();
            afEqual == false;
        }
        if (displayNum == undefined) {
            displayNum = this.innerHTML;
            display.innerHTML = displayNum;
        }else if(displayNum.length >12) {
            return;
        }else if(displayNum == "0"){
            displayNum = this.innerHTML;
            display.innerHTML = displayNum;
        }else{
            displayNum = displayNum + this.innerHTML;
            display.innerHTML = displayNum;
        };
};


function operate() {
    if(isNaN(num1) || isNaN(num2)){
        return;
    }
    if(num2 == 0 && operMethod == '/') {
        mini_dis.innerHTML = 'Error';
        display.innerHTML = 'Error';
        return;
    };

    if (operMethod == "-"){
        num1 = parseFloat(num1) - parseFloat(num2);
    }else if (operMethod == "+") {
        num1 = parseFloat(num1) + parseFloat(num2);
    }else if (operMethod == "*") {
        num1 = parseFloat(num1) * parseFloat(num2);
    }else if (operMethod == "/") {
        num1 = parseFloat(num1) / parseFloat(num2);
    };
    num1 = num1.toFixed(12);
    num1 = parseFloat(num1);
    tempNum2 = num2;
    num2 = undefined;
    
};

function equal(){
    eql = true;
    if (mini_dis.innerHTML.includes('=')){
        return;
    }
    insertNumber();
    if(isNaN(num1) || isNaN(num2)) {
        return;
    } 
    operate();
    displayResult();
    num2 = undefined;
    displayNum = undefined;
    afEqual = true;
    eql = false;
}



function add(){

    if (operMethod == undefined) {
        operMethod = "+";
    }
    insertNumber();
    if(num1 == undefined){
        return;
    }
    if (!isNaN(num1) && !isNaN(num2)) {
        operate();
        displayResult();
    }
    operMethod = '+';
    tempNum1 = num1;
    mini_dis.innerHTML = `${num1} ${operMethod}`
    display.innerHTML = 0;
}

function division(){
    if (operMethod == undefined) {
        operMethod = "/";
    }
    insertNumber();
    if(num1 == undefined){
        return;
    }
    if (!isNaN(num1) && !isNaN(num2)) {
        operate();
        displayResult();
    }
    operMethod = '/';
    tempNum1 = num1;
    mini_dis.innerHTML = `${num1} ${operMethod}` 
    display.innerHTML = 0;
  
}

function multiplication(){
    
    if (operMethod == undefined) {
        operMethod = "*";
    }
    insertNumber();
    if(num1 == undefined){
        return;
    }
    if (!isNaN(num1) && !isNaN(num2)) {
        operate();
        displayResult();
    }
    operMethod = '*';
    tempNum1 = num1;
    mini_dis.innerHTML = `${num1} ${operMethod}`
    display.innerHTML = 0;

};

function subtract(){
    
    if (operMethod == undefined) {
        operMethod = "-";
    }
    insertNumber();
    if(num1 == undefined){
        return;
    }
    if (!isNaN(num1) && !isNaN(num2)) {
        operate();
        displayResult();
    }
    operMethod = '-'; 
    tempNum1 = num1;
    mini_dis.innerHTML = `${num1} ${operMethod}`
    display.innerHTML = 0;

}

function insertNumber(){
    if (displayNum == undefined || operMethod == undefined){
        return;
    
    }else if (num1 == undefined) {
            num1 = displayNum;
            numtemp = num1;
            displayNum = undefined;
            tempNum = `${num1} ${operMethod}`;
            mini_dis.innerHTML = tempNum;
            display.innerHTML = 0;
    
    }else {
        num2 = displayNum;
        tempNum2 = num2;
        displayNum = undefined;
        mini_dis.innerHTML = `${num1} ${operMethod}`
        tempNum = `${num1} ${operMethod} ${tempNum2}`;
        display.innerHTML = 0;
    };
};

function displayResult() {
    if(eql == true) {
    mini_dis.innerHTML = `${tempNum} = ${num1}`;
    display.innerHTML = num1;
    }else {
    mini_dis.innerHTML = tempNum;
    display.innerHTML = num1;
    }
    paperRoll();

};

function clearAll(){
    displayNum = undefined;
    num1 = undefined;
    num2 = undefined;
    tempNum = undefined;
    operMethod = undefined;
    display.innerHTML = 0;
    mini_dis.innerHTML = '';
}

function negativeSign() {
    if (isNaN(displayNum) || displayNum == 0) {
        return;
    }
    displayNum = -displayNum
    display.innerHTML = displayNum;
}

function percent() {
    if (isNaN(displayNum) || displayNum == 0) {
        return;
    }
    displayNum = displayNum/100;
    display.innerHTML = displayNum;
}

function addDecimal() {
    if(displayNum == undefined) {
        displayNum = '0.';
        display.innerHTML = displayNum;
    }else if(displayNum.includes('.')) {
        return;
    } else {
        displayNum = displayNum+'.';
        display.innerHTML = display.innerHTML + '.';
    }
}

function backSpaceB() {
    if (displayNum == undefined) {
        return;
    }
    displayNum = displayNum.slice(0,displayNum.length-1);
    display.innerHTML = displayNum;
}

function paperRoll(){
    let x = 0;
    var mini_div = document.createElement('div');
    mini_div.className = `mini-div`;
    document.getElementById('paperRoll').appendChild(mini_div);
    mini_div.innerHTML = `${tempNum1} ${operMethod} ${tempNum2} <br> = ${num1} \n`;
}