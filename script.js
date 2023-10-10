let message = "";
const response = {
    "No": "No", 
    "Yes": "Yes", 
    "Maybe": "Maybe",
    "Reflect and try again later":"Unsure",
    "I cannot answer that, sorry": "Unsure",
    "Do as your heart says": "Unsure", 
    "Perhaps": "Yes",
    "You probably should": "Yes", 
    "You probably should not": "No", 
    "Sure?": "Yes", 
    "I don't think that's a good idea": "No"
};

let eightBallText = document.getElementById("eightBallText");
const contentContainer = document.getElementById("contentContainer");
const colorBox = document.getElementById("contentContainer");

function shake() {
    var inputField = document.getElementById("input");
    let randomIndex = Math.floor(Math.random() * Object.keys(response).length);
    message = Object.keys(response)[randomIndex];
    console.log(message);
    inputField.value = "";
    eightBallText.textContent = "8";
    colorBox.style.backgroundColor = `rgb(255, 255, 255)`;
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
    const eightBallContainer = document.getElementById("eightBallContainer");
    eightBallContainer.classList.add("shakeAnimation");

    setTimeout(function() {
        eightBallContainer.classList.remove("shakeAnimation");
        startColorFade();
    },3000);
}

function startColorFade() {
    
    let currentColor = 255;
    let targetColor = 0;
    //let rgbString = ``;
    
    // if (response[message] === "No") {
    //     targetColor = 255;
    //     rgbString = `rgb(${currentColor}), 0, 0)`;
    // } else if (response[message] === "Yes") {
    //     targetColor = 128;
    //     rgbString = `rgb(0, ${currentColor}, 0)`;
    // } else if (response[message] === "Maybe") {
    //     targetColor = 255;
    //     rgbString = `rgb(${currentColor}, ${currentColor}, 0)`;
    // } else {
    //     targetColor = 255;
    //     rgbString = `rgb(0, ${currentColor}, 0)`;
    // }
    
    const step = 10;

    const interval = setInterval(function() {
        if (currentColor > targetColor) {
            currentColor -= step;
            colorBox.style.backgroundColor = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
            eightBallText.textContent = "";
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
    let targetR = 255;
    let targetG = 255;
    let targetB = 255;
    if (response[message] === "No") {
        targetR = 255;
        targetG = 0;
        targetB = 0;
    } else if (response[message] === "Yes") {
        targetR = 0;
        targetG = 255;
        targetB = 0;
    } else if (response[message] === "Maybe") {
        targetR = 255;
        targetG = 255;
        targetB = 0;
    } else {
        targetR = 0;
        targetG = 0;
        targetB = 255;
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
            colorBox.style.backgroundColor = `rgb(${currentR}, ${currentG}, ${currentB})`;
        } else {
            eightBallText.textContent = message;
            fitText();
            clearInterval(intervalTwo);
        }

    }, 25);
}
window.addEventListener("resize", fitText);

window.addEventListener("load", fitText);