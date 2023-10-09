let message = "";
const response = ["No", "Yes", "Maybe", "Reflect and try again later", "I cannot answer that, sorry", "Do as your heart says", 
                    "Perhaps", "You probably should", "You probably should not", "Sure?", "I don't think that's a good idea"];

let eightBallText = document.getElementById("eightBallText");
const contentContainer = document.getElementById("contentContainer");

function shake() {
    var inputField = document.getElementById("input");
    let randomIndex = Math.floor(Math.random() * response.length);
    message = response[randomIndex];

    inputField.value = "";
    eightBallText.textContent = message;
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
    const colorBox = document.getElementById("contentContainer");

    let currentColor = 255;
    const targetColor = 255;
    const step = 5;

    const interval = setInterval(function() {
        if (currentColor < targetColor) {
            currentColor += step;
            colorBox.style.backgroundColor = `rgb(${currentColor}, 0, ${currentColor})`;
        } else {
            clearInterval(interval);
        }
    }, 50);
}
window.addEventListener("resize", fitText);

window.addEventListener("load", fitText);