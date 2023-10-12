const eightBallContainer = document.getElementById("eightBallContainer");
const colorCircle = document.getElementById("contentContainer");
const submitButton = document.getElementById("submitButton");
const root = document.documentElement;
const targetScale = 1.2;
const targetRotation = 5;
const targetFontSize = 25;
const response = {
    "No": "No",
    "My records say no": "No", 
    "I 100% think no": "No",
    "Definitely not": "No",
    "Yes": "Yes",
    "I 100% think yes": "Yes",
    "My records say yes": "Yes", 
    "Sure": "Yes", 
    "Maybe": "Maybe",
    "Kind of, but maybe no?": "Maybe",
    "Perhaps": "Maybe",
    "Potentially": "Maybe",
    "Reflect and try again later":"Unsure",
    "I cannot answer that, sorry": "Unsure",
    "Do as your heart says": "Unsure", 
    "I honestly don't know": "Unsure",
};

let message = "";
let eightBallText = document.getElementById("eightBallText");
let currentScale = 1;
let currentRotation = 0;
let currentFontSize = 18;
let keyframesStyle = document.styleSheets[0].insertRule(`@keyframes buttonHoverAnimation { 
    0% { transform: scale(${currentScale}) rotate(${currentRotation}deg); font-size: ${currentFontSize}px; } 
    100% { transform: scale(${targetScale}) rotate(${targetRotation}deg); font-size: ${targetFontSize}px; } 
}`, 0);
let keyframesStyle2 = document.styleSheets[1].insertRule(`@keyframes buttonNotHoverAnimation { 
    0% { transform: scale(${currentScale}) rotate(${currentRotation}deg); font-size: ${currentFontSize}px; } 
    100% { transform: scale(1) rotate(0deg); font-size: 18px; } 
}`, 1);

function shake() {
    var inputField = document.getElementById("input");
    let randomIndex = Math.floor(Math.random() * Object.keys(response).length);

    message = Object.keys(response)[randomIndex];
    inputField.value = "";
    eightBallText.textContent = "8";

    colorCircle.style.backgroundColor = `rgb(255, 255, 255)`;
    root.style.setProperty("--outlineBoxShadowColor2", "0 0 50px #3d0982");
    root.style.setProperty("--outlineBoxShadowColor3", "0 0 450px #bb36d5");

    fitText();
    startAnimations();
    
}

function fitText() {
    const contentWidth = colorCircle.clientWidth - 3;
    const contentHeight = colorCircle.clientHeight - 3;

    eightBallText.style.fontSize = "100px";

    while (eightBallText.clientWidth >= contentWidth || eightBallText.clientHeight >= contentHeight) {
        const currentSize = parseFloat(getComputedStyle(eightBallText).fontSize);
        eightBallText.style.fontSize = (currentSize - 1) + "px";
    }
}

function startAnimations() {
    eightBallContainer.classList.add("shakeAnimation");

    setTimeout(function() {
        eightBallContainer.classList.remove("shakeAnimation");
        startColorFade();
    },3000);
}

function startColorFade() {
    const step = 10;
    
    let currentColor = 255;
    let currentBoxShadowOneR = 61;
    let currentBoxShadowOneG = 9;
    let currentBoxShadowOneB = 129;
    let currentBoxShadowTwoR = 187;
    let currentBoxShadowTwoG = 54;
    let currentBoxShadowTwoB = 213;

    let targetColor = 0;

    const interval = setInterval(function() {
        if (currentColor > targetColor) {
            currentColor -= step;
            colorCircle.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
            eightBallText.textContent = "";

            if (currentBoxShadowOneR > targetColor) {
                currentBoxShadowOneR -= step;
            }
            if (currentBoxShadowOneG > targetColor) {
                currentBoxShadowOneG -= step;
            }
            if (currentBoxShadowOneB > targetColor) {
                currentBoxShadowOneB -= step;
            }
            if (currentBoxShadowTwoR > targetColor) {
                currentBoxShadowTwoR -= step;
            }
            if (currentBoxShadowTwoG > targetColor) {
                currentBoxShadowTwoG -= step;
            }
            if (currentBoxShadowTwoB > targetColor) {
                currentBoxShadowTwoB -= step;
            }

            root.style.setProperty("--outlineBoxShadowColor2", `0 0 50px rgb(${currentBoxShadowOneR}, ${currentBoxShadowOneG}, ${currentBoxShadowOneB})`);
            root.style.setProperty("--outlineBoxShadowColor3", `0 0 450px rgb(${currentBoxShadowTwoR}, ${currentBoxShadowTwoG}, ${currentBoxShadowTwoB})`);
        } else {
            
            clearInterval(interval);

            setTimeout(function() {
                startColorFade2();
            }, 25);
        }
    }, 25);
}

function startColorFade2() {
    const step = 5;

    let currentR = 0;
    let currentG = 0;
    let currentB = 0;
    
    let currentBoxShadowOneR = 0;
    let currentBoxShadowOneG = 0;
    let currentBoxShadowOneB = 0;
    let currentBoxShadowTwoR = 0;
    let currentBoxShadowTwoG = 0;
    let currentBoxShadowTwoB = 0;

    let targetR = 255;
    let targetG = 255;
    let targetB = 255;

    let targetBoxShadowOneR = 0;
    let targetBoxShadowOneG = 0;
    let targetBoxShadowOneB = 0;
    let targetBoxShadowTwoR = 0;
    let targetBoxShadowTwoG = 0;
    let targetBoxShadowTwoB = 0;

    if (response[message] === "No") {
        targetR = 255;
        targetG = 0;
        targetB = 0;
        targetBoxShadowOneR = 135;
        targetBoxShadowOneG = 13;
        targetBoxShadowOneB = 13;
        targetBoxShadowTwoR = 213;
        targetBoxShadowTwoG = 54;
        targetBoxShadowTwoB = 54;
    } else if (response[message] === "Yes") {
        targetR = 0;
        targetG = 255;
        targetB = 0;
        targetBoxShadowOneR = 28;
        targetBoxShadowOneG = 158;
        targetBoxShadowOneB = 19;
        targetBoxShadowTwoR = 96;
        targetBoxShadowTwoG = 241;
        targetBoxShadowTwoB = 106;
    } else if (response[message] === "Maybe") {
        targetR = 255;
        targetG = 255;
        targetB = 0;
        targetBoxShadowOneR = 164;
        targetBoxShadowOneG = 157;
        targetBoxShadowOneB = 23;
        targetBoxShadowTwoR = 214;
        targetBoxShadowTwoG = 212;
        targetBoxShadowTwoB = 73;
    } else {
        targetR = 0;
        targetG = 0;
        targetB = 255;
        targetBoxShadowOneR = 36;
        targetBoxShadowOneG = 31;
        targetBoxShadowOneB = 165;
        targetBoxShadowTwoR = 73;
        targetBoxShadowTwoG = 80;
        targetBoxShadowTwoB = 214;
    }
    const intervalTwo = setInterval(function() {
        if (currentR < targetR || currentG < targetG || currentB < targetB) {
            if (currentR < targetR) {
                currentR += step;
            }
            if (currentG < targetG) {
                currentG += step;
            }
            if (currentB < targetB) {
                currentB += step;
            }
            if (currentBoxShadowOneR < targetBoxShadowOneR) {
                currentBoxShadowOneR += step;
            }
            if (currentBoxShadowOneG < targetBoxShadowOneG) {
                currentBoxShadowOneG += step;
            }
            if (currentBoxShadowOneB < targetBoxShadowOneB) {
                currentBoxShadowOneB += step;
            }
            if (currentBoxShadowTwoR < targetBoxShadowTwoR) {
                currentBoxShadowTwoR += step;
            }
            if (currentBoxShadowTwoG < targetBoxShadowTwoG) {
                currentBoxShadowTwoG += step;
            }
            if (currentBoxShadowTwoB < targetBoxShadowTwoB) {
                currentBoxShadowTwoB += step;
            }

            colorCircle.style.backgroundColor = `rgb(${currentR}, ${currentG}, ${currentB})`;
            root.style.setProperty("--outlineBoxShadowColor2", `0 0 50px rgb(${currentBoxShadowOneR}, ${currentBoxShadowOneG}, ${currentBoxShadowOneB})`);
            root.style.setProperty("--outlineBoxShadowColor3", `0 0 450px rgb(${currentBoxShadowTwoR}, ${currentBoxShadowTwoG}, ${currentBoxShadowTwoB})`);
        } else {
            eightBallText.textContent = message;
            fitText();
            clearInterval(intervalTwo);
        }

    }, 25);
}

submitButton.addEventListener("mouseover", () => {
    currentScale = getCurrentScale(submitButton);
    currentRotation = getCurrentRotation(submitButton);
    currentFontSize = getCurrentFontSize(submitButton);

    console.log("hover: ", currentScale);
    document.styleSheets[0].deleteRule(0);

    keyframesStyle = document.styleSheets[0].insertRule(`@keyframes buttonHoverAnimation { 
        0% { transform: scale(${currentScale}) rotate(${currentRotation}deg); font-size: ${currentFontSize}px; } 
        100% { transform: scale(${targetScale}) rotate(${targetRotation}deg); font-size: ${targetFontSize}px; } 
    }`, 0);

    submitButton.style.animation = "buttonHoverAnimation 0.3s ease forwards";
})

submitButton.addEventListener("mouseout", () => {
    currentScale = getCurrentScale(submitButton);
    currentRotation = getCurrentRotation(submitButton);
    currentFontSize = getCurrentFontSize(submitButton);

    console.log("out: ", currentScale);
    document.styleSheets[1].deleteRule(1);

    keyframesStyle2 = document.styleSheets[1].insertRule(`@keyframes buttonNotHoverAnimation { 
        0% { transform: scale(${currentScale}) rotate(${currentRotation}deg); font-size: ${currentFontSize}px; } 
        100% { transform: scale(1) rotate(0deg); font-size: 18px; } 
    }`, 1);
    submitButton.style.animation = "buttonNotHoverAnimation 0.3s ease forwards";
})
function getCurrentScale(element) {
    const transform = window.getComputedStyle(element, null).getPropertyValue("transform");
    const matrix = new DOMMatrix(transform);
    return matrix.a;
}

function getCurrentRotation(element) {
    const transform = window.getComputedStyle(element, null).getPropertyValue("transform");
    const matrix = new DOMMatrix(transform);
    const rotation = Math.atan2(matrix.b, matrix.a);
    const rotationDegree = (rotation * 180) / Math.PI;
    return rotationDegree;
}

function getCurrentFontSize(element) {
    const fontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    return parseFloat(fontSize);
}
window.addEventListener("resize", fitText);

window.addEventListener("load", fitText);