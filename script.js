let message = "";
const response = ["No", "Yes", "Maybe", "Reflect and try again later", "I cannot answer that, sorry", "Do as your heart says", 
                    "Perhaps", "You probably should", "You probably should not", "Sure?", "I don't think that's a good idea"];

let defaultContent = document.getElementById("defaultContent");

function shake() {
    var inputField = document.getElementById("input");
    let randomIndex = Math.floor(Math.random() * response.length);
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    message = response[randomIndex];

    inputField.value = "";
    defaultContent.textContent = message;
    //console.log(message);
    console.log("Screen Width: " + screenWidth);
    console.log("Screen Height: " + screenHeight);
}