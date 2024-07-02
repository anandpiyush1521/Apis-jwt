const demoFunctionOfSum = (a, b) => {   //ARROW FUNCTION
    const sum = a + b;
    console.log(sum);
}

// function demoFunctionOfSum(a, b) {
//     const sum = a + b;
//     console.log(sum);
// }

demoFunctionOfSum(1, 7);

// const demoFunctionOfSum  => FUNCTION EXPRESSION
// and the rest are the concept of demo function


// # CALLBACK FUNCTION => A callback is a function passed as an argument to another function 

function greet(name, callback){
    console.log("Hi"+" "+ name);
    callback();
}

function callMe(){
    console.log("I am callback function");
}

greet("piyush", callMe);