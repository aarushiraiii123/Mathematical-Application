const operations = document.querySelectorAll(".operation");

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");

const secondInput = document.getElementById("secondInput");

const formulaText = document.getElementById("formulaText");
const errorMessage = document.getElementById("errorMessage");

const result = document.getElementById("result");
const steps = document.getElementById("steps");

const loader = document.getElementById("loader");
const toast = document.getElementById("toast");

const historyList = document.getElementById("historyList");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const totalCalculation = document.getElementById("totalCalculation");
const factorialCount = document.getElementById("factorialCount");
const gcdCount = document.getElementById("gcdCount");
const lcmCount = document.getElementById("lcmCount");

let selectedOperation = "factorial";

let history = [];

let total = 0;
let factorialTotal = 0;
let gcdTotal = 0;
let lcmTotal = 0;

secondInput.style.display = "none";

operations.forEach(card=>{

    card.addEventListener("click",()=>{

        operations.forEach(item=>{
            item.classList.remove("active");
        });

        card.classList.add("active");

        selectedOperation = card.dataset.operation;

        errorMessage.innerHTML="";
        result.innerHTML="Your result will appear here...";
        steps.innerHTML="No calculation yet...";

        if(selectedOperation==="factorial"){

            secondInput.style.display="none";

            formulaText.innerHTML =
            "n! = n × (n-1) × (n-2) × ... × 1";

        }

        else if(selectedOperation==="gcd"){

            secondInput.style.display="block";

            formulaText.innerHTML =
            "HCF is calculated using the Euclidean Algorithm.";

        }

        else{

            secondInput.style.display="block";

            formulaText.innerHTML =
            "LCM = (First Number × Second Number) ÷ HCF";

        }

    });

});

calculateBtn.addEventListener("click",()=>{

    errorMessage.innerHTML="";

    const firstNumber = parseInt(num1.value);
    const secondNumber = parseInt(num2.value);

    if(isNaN(firstNumber)){
        errorMessage.innerHTML="Please enter the first number.";
        return;
    }

    if(selectedOperation!=="factorial" && isNaN(secondNumber)){
        errorMessage.innerHTML="Please enter the second number.";
        return;
    }

    loader.style.display="block";
    result.innerHTML="";
    steps.innerHTML="";

    setTimeout(()=>{

        loader.style.display="none";

        let answer="";
        let stepText="";
        
if(selectedOperation === "factorial"){

    if(firstNumber < 0){

        errorMessage.innerHTML =
        "Factorial cannot be calculated for negative numbers.";

        return;

    }

    let fact = 1n;
    let expression = [];

    for(let i = BigInt(firstNumber); i >= 1n; i--){

        fact *= i;
        expression.push(i.toString());

    }

    if(firstNumber === 0){

        fact = 1n;
        expression = ["1"];

    }

    answer = fact.toString();

    stepText = `
    <b>Formula:</b><br>
    n! = n × (n-1) × ... × 1

    <br><br>

    <b>Calculation:</b><br>

    ${firstNumber}! = ${expression.join(" × ")}

    <br><br>

    <b>Answer = ${answer}</b>
    `;

    result.innerHTML = `
    <h2 style="color:#4F46E5;word-break:break-word;">
        ${answer}
    </h2>
    `;

    steps.innerHTML = stepText;

    history.unshift(
        `Factorial(${firstNumber}) Calculated Successfully`
    );

    factorialTotal++;

}

else if(selectedOperation === "gcd"){

    let a = Math.abs(firstNumber);
    let b = Math.abs(secondNumber);

    let process = "";

    while(b !== 0){

        process += `${a} % ${b} = ${a % b}<br>`;

        let temp = b;
        b = a % b;
        a = temp;

    }

    answer = a;

    stepText = `
    <b>Euclidean Algorithm</b>

    <br><br>

    ${process}

    <br>

    <b>HCF = ${a}</b>
    `;

    result.innerHTML = `
    <h2 style="color:#4F46E5;">
        ${a}
    </h2>
    `;

    steps.innerHTML = stepText;

    history.unshift(
        `HCF(${firstNumber}, ${secondNumber}) = ${a}`
    );

    gcdTotal++;

}

else{

    let a = Math.abs(firstNumber);
    let b = Math.abs(secondNumber);

    let x = a;
    let y = b;

    while(y !== 0){

        let temp = y;
        y = x % y;
        x = temp;

    }

    let lcm = (a * b) / x;

    answer = lcm;

    stepText = `
    <b>Formula</b>

    <br><br>

    LCM = (A × B) ÷ HCF

    <br><br>

    = (${a} × ${b}) ÷ ${x}

    <br><br>

    <b>LCM = ${lcm}</b>
    `;

    result.innerHTML = `
    <h2 style="color:#4F46E5;">
        ${lcm}
    </h2>
    `;

    steps.innerHTML = stepText;

    history.unshift(
        `LCM(${firstNumber}, ${secondNumber}) = ${lcm}`
    );

    lcmTotal++;

}

total++;

totalCalculation.innerHTML = total;
factorialCount.innerHTML = factorialTotal;
gcdCount.innerHTML = gcdTotal;
lcmCount.innerHTML = lcmTotal;

toast.style.display = "block";

setTimeout(()=>{

    toast.style.display = "none";

},2000);

historyList.innerHTML = "";

if(history.length===0){

    historyList.innerHTML=`
    <li>No calculations yet.</li>
    `;

}

else{

    history.forEach(item=>{

        const li=document.createElement("li");

        li.innerHTML=`
        <i class="fa-solid fa-clock"></i>
        ${item}
        `;

        historyList.appendChild(li);

    });

}

},1000);

});

copyBtn.addEventListener("click",()=>{

    const text = result.innerText;

    if(text === "" || text === "Your result will appear here..."){
        return;
    }

    navigator.clipboard.writeText(text);

    toast.innerHTML = `
    <i class="fa-solid fa-copy"></i>
    Result Copied Successfully
    `;

    toast.style.display = "block";

    setTimeout(()=>{

        toast.style.display = "none";

        toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Calculation Completed Successfully
        `;

    },2000);

});

downloadBtn.addEventListener("click",()=>{

    const content = `
========== Mathematical Application ==========

Result
------------------------------------
${result.innerText}

Step By Step
------------------------------------
${steps.innerText}
`;

    const blob = new Blob([content],{
        type:"text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Mathematical_Result.txt";

    link.click();

});

resetBtn.addEventListener("click",()=>{

    num1.value = "";
    num2.value = "";

    errorMessage.innerHTML = "";

    result.innerHTML = "Your result will appear here...";
    steps.innerHTML = "No calculation yet...";

    secondInput.style.display = "none";

    selectedOperation = "factorial";

    formulaText.innerHTML =
    "n! = n × (n-1) × (n-2) × ... × 1";

    operations.forEach(card=>{
        card.classList.remove("active");
    });

    operations[0].classList.add("active");

});

clearHistoryBtn.addEventListener("click",()=>{

    history = [];

    historyList.innerHTML = `
    <li>No calculations yet.</li>
    `;

});

document.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        calculateBtn.click();

    }

});
