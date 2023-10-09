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

window.addEventListener("resize", fitText);

window.addEventListener("load", fitText);