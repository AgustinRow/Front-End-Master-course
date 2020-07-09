let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen= document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click", function (event){
    buttonClick(event.target.innerText)
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else {
        handleNumber(value);
    }
    reRender();
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    }else {
        buffer+=value;
    }
}

function handleSymbol(value){
    switch (value){
        case 'C':
             buffer="0"; 
            runningTotal= 0; 
        break;
        case '=':
            if (previousOperator=== null){
                //needs two numbers to domath
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator=null; 
            buffer= "" + runningTotal; 
            runningTotal= 0; 
        break;
        case '¬':
            if (buffer.length === 1){
                buffer= "0";
            }else {
                buffer= buffer.substring(0, buffer.length-1);
            }
        break;
        default: 
        handleMath(value); 
    }
}

function flushOperation(value){
    switch (previousOperator){
        case '+': 
            runningTotal += value;
        break;
        case '-':
            runningTotal -= value
        break;
        case 'x':
            runningTotal *= value
        break;
        case '/':
            runningTotal /= value
        break;
    }
}

function handleMath(value){
    const infBuffer= parseInt(buffer);
    if(runningTotal === 0){
        runningTotal= infBuffer;
    }else {
        flushOperation(infBuffer);
    }
    previousOperator = value;
    buffer= "0";
}


function reRender(){
    screen.innerText= buffer;
}