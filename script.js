const eightBallContainer = document.getElementById("eightBallContainer");
const colorCircle = document.getElementById("contentContainer");
const enterButton = document.getElementById("enterButton");
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
let animationInProgress = false;

// changes the css variables that is used for the 8 ball outline box shadow
function setRootStyle(boxShadowColor2, boxShadowColor3) {
    root.style.setProperty("--outlineBoxShadowColor2", boxShadowColor2);
    root.style.setProperty("--outlineBoxShadowColor3", boxShadowColor3);
}

// If the animationInProgress is false, animationInProgress is set to true,
// sets the 8 ball text to 8 and gets a random message to show later over time,
// the background color around the 8 ball text is set to white initially
// and will change over time.Otherwise, fits the 8 ball text inside the 8 ball,
// and calls startAnimation() to start the 8 ball animations. Otherwise, if 
// animationInProgress is true, the function just returns. This is so if the 8 ball
// is already shaking, producing a message, and changing it's color, it does not repeat
// that in the middle of it's animation. In other words, once you press the enter button to shake
// the 8 ball, you have to wait for the animations to finish before you can shake again.
function shake() {
    if (animationInProgress == false) {
        animationInProgress = true;
        var inputField = document.getElementById("input");
        let randomIndex = Math.floor(Math.random() * Object.keys(response).length);
    
        message = Object.keys(response)[randomIndex];
        inputField.value = "";
        eightBallText.textContent = "8";
    
        colorCircle.style.backgroundColor = `rgb(255, 255, 255)`;

        setRootStyle("0 0 50px #3d0982", "0 0 450px #bb36d5");
        fitText();
        startAnimations();
    } else {
        return;
    }
}

// fits the 8 ball text inside the circle surrounding it.
function fitText() {
    const contentWidth = colorCircle.clientWidth - 3;
    const contentHeight = colorCircle.clientHeight - 3;

    eightBallText.style.fontSize = "100px";

    while (eightBallText.clientWidth >= contentWidth || eightBallText.clientHeight >= contentHeight) {
        const currentSize = parseFloat(getComputedStyle(eightBallText).fontSize);
        eightBallText.style.fontSize = (currentSize - 1) + "px";
    }
}

// Makes the 8 ball shake vertically, and after the shake animation is done,
// the function starts the color fading animations.
function startAnimations() {
    eightBallContainer.classList.add("shakeAnimation");

    setTimeout(function() {
        eightBallContainer.classList.remove("shakeAnimation");
        startColorFade();
    },3000);
}

// fades the cirlce surrounding the 8 ball text color, and the 8 ball outline
// box shadow from its default color to black. Then, the function calls startColorFade2()
// which fades the circle surrounding the 8 ball text color, and the 8 ball outline box shadow
// from black to the color associated with the type of response the 8 ball produced.
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
            setRootStyle(`0 0 50px rgb(${currentBoxShadowOneR}, ${currentBoxShadowOneG}, ${currentBoxShadowOneB})`, 
                        `0 0 450px rgb(${currentBoxShadowTwoR}, ${currentBoxShadowTwoG}, ${currentBoxShadowTwoB})`);
        } else {
            
            clearInterval(interval);

            setTimeout(function() {
                startColorFade2();
            }, 25);
        }
    }, 25);
}

// Changes the circle surrounding the 8 ball text, and the 8 ball outline box shadow
// color from black to the color associated with the type of response the 8 ball produced over time.
// Yes is green, no is red, maybe is yellow, and unsure is blue. After the color animation is done,
// the 8 ball test is finally shown.
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

    // Red
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
    } 
    // Green
    else if (response[message] === "Yes") {
        targetR = 0;
        targetG = 255;
        targetB = 0;
        targetBoxShadowOneR = 28;
        targetBoxShadowOneG = 158;
        targetBoxShadowOneB = 19;
        targetBoxShadowTwoR = 96;
        targetBoxShadowTwoG = 241;
        targetBoxShadowTwoB = 106;
    } 
    // Yellow
    else if (response[message] === "Maybe") {
        targetR = 255;
        targetG = 255;
        targetB = 0;
        targetBoxShadowOneR = 164;
        targetBoxShadowOneG = 157;
        targetBoxShadowOneB = 23;
        targetBoxShadowTwoR = 214;
        targetBoxShadowTwoG = 212;
        targetBoxShadowTwoB = 73;
    } 
    // Blue for unsure
    else {
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

    // Changes the 8 ball colors from black to the target colors.
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
            // shows 8 ball text after color animation is done.
            eightBallText.textContent = message;
            fitText();
            animationInProgress = false;
            clearInterval(intervalTwo);
        }

    }, 25);
}

// When the user hovers over the enter button, first the function gets the current scale, rotation, and font size
// of the enter button, then does an animation to rotate it, make the scale bigger, and increases the font size.
enterButton.addEventListener("mouseover", () => {
    currentScale = getCurrentScale(enterButton);
    currentRotation = getCurrentRotation(enterButton);
    currentFontSize = getCurrentFontSize(enterButton);

    document.styleSheets[0].deleteRule(0);

    keyframesStyle = document.styleSheets[0].insertRule(`@keyframes buttonHoverAnimation { 
        0% { transform: scale(${currentScale}) rotate(${currentRotation}deg); font-size: ${currentFontSize}px; } 
        100% { transform: scale(${targetScale}) rotate(${targetRotation}deg); font-size: ${targetFontSize}px; } 
    }`, 0);

    enterButton.style.animation = "buttonHoverAnimation 0.3s ease forwards";
})

// When the user stops hovering over the enter button, the function gets the current scale, rotation, and font size
// of the enter button, and then scales, rotates, and decreases the font size of the enter button to its default scale, rotation,
// and font size.
enterButton.addEventListener("mouseout", () => {
    currentScale = getCurrentScale(enterButton);
    currentRotation = getCurrentRotation(enterButton);
    currentFontSize = getCurrentFontSize(enterButton);

    console.log("out: ", currentScale);
    document.styleSheets[1].deleteRule(1);

    keyframesStyle2 = document.styleSheets[1].insertRule(`@keyframes buttonNotHoverAnimation { 
        0% { transform: scale(${currentScale}) rotate(${currentRotation}deg); font-size: ${currentFontSize}px; } 
        100% { transform: scale(1) rotate(0deg); font-size: 18px; } 
    }`, 1);
    enterButton.style.animation = "buttonNotHoverAnimation 0.3s ease forwards";
})

// gets current scale of the enter button.
function getCurrentScale(element) {
    const transform = window.getComputedStyle(element, null).getPropertyValue("transform");
    const matrix = new DOMMatrix(transform);
    return matrix.a;
}

// gets current rotation of the enter button.
function getCurrentRotation(element) {
    const transform = window.getComputedStyle(element, null).getPropertyValue("transform");
    const matrix = new DOMMatrix(transform);
    const rotation = Math.atan2(matrix.b, matrix.a);
    const rotationDegree = (rotation * 180) / Math.PI;
    return rotationDegree;
}

// gets current font size of the enter button.
function getCurrentFontSize(element) {
    const fontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    return parseFloat(fontSize);
}
window.addEventListener("resize", fitText);

window.addEventListener("load", fitText);