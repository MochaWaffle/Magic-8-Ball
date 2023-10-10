const eightBallContainer = document.getElementById("eightBallContainer");
const contentContainer = document.getElementById("contentContainer");
const colorBox = document.getElementById("contentContainer");
const root = document.documentElement;
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

function shake() {
    var inputField = document.getElementById("input");
    let randomIndex = Math.floor(Math.random() * Object.keys(response).length);

    message = Object.keys(response)[randomIndex];
    inputField.value = "";
    eightBallText.textContent = "8";

    colorBox.style.backgroundColor = `rgb(255, 255, 255)`;
    root.style.setProperty("--outlineBoxShadowColor2", "0 0 50px #3d0982");
    root.style.setProperty("--outlineBoxShadowColor3", "0 0 450px #bb36d5");

    fitText();
    startAnimations();
    
}

function fitText() {
    const contentWidth = contentContainer.clientWidth - 3;
    const contentHeight = contentContainer.clientHeight - 3;

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
    //let currentsBoxShadow = [currentBoxShadowOneR, currentBoxShadowOneG, currentBoxShadowOneB, currentBoxShadowTwoR, currentBoxShadowTwoG, currentBoxShadowTwoB];
    let targetColor = 0;
    //let rgbString = ``;

    const interval = setInterval(function() {
        if (currentColor > targetColor) {
            currentColor -= step;
            colorBox.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
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
            // for (i = 0; i < currentsBoxShadow.length; i++) {
            //     if (currentsBoxShadow[i] > targetColor) {
            //         currentsBoxShadow[i] -= step;
            //     }
            // }
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
    //let currents = [currentR, currentG, currentB, currentBoxShadowOneR, currentBoxShadowOneG, currentBoxShadowOneB, currentBoxShadowTwoR, currentBoxShadowTwoG, currentBoxShadowTwoB];
    //slet targets = [targetR, targetG, targetB, targetBoxShadowOneR, targetBoxShadowOneG, targetBoxShadowOneB, targetBoxShadowTwoR, targetBoxShadowTwoG, targetBoxShadowTwoB];
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
            // for (i = 0; i < currents.length; i++) {
            //     if (currents[i] < targets[i]) {
            //         currents[i] += step;
            //     }
            // }
            colorBox.style.backgroundColor = `rgb(${currentR}, ${currentG}, ${currentB})`;
            root.style.setProperty("--outlineBoxShadowColor2", `0 0 50px rgb(${currentBoxShadowOneR}, ${currentBoxShadowOneG}, ${currentBoxShadowOneB})`);
            root.style.setProperty("--outlineBoxShadowColor3", `0 0 450px rgb(${currentBoxShadowTwoR}, ${currentBoxShadowTwoG}, ${currentBoxShadowTwoB})`);
        } else {
            eightBallText.textContent = message;
            fitText();
            clearInterval(intervalTwo);
        }

    }, 25);
}
window.addEventListener("resize", fitText);

window.addEventListener("load", fitText);