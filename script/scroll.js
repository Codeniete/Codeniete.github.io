/* Variablen */

let lastScrollIndex = 0;

const padding = 60;

const boxes = document.querySelectorAll(".box");
const numberOfBoxes = boxes.length;

const scrollBody = document.getElementById("scroll-body");
const storyLayer = document.getElementById("story-layer");
const referenceLayer = document.getElementById("reference-layer");

// Vorbereitung für die Grenzen
let referenceHeight = referenceLayer.getBoundingClientRect().height;
let distances = [];
let topBounds = [];

// Ausgangszustand
scrollBody.style.height = (1000 * (numberOfBoxes - 0.1)) + "px";
storyLayer.style.marginTop = (referenceHeight - padding) + "px";
window.scrollTo(0, 0);

/* Events */

document.addEventListener("scroll", function () {
   const newScrollIndex = Math.floor(window.scrollY / 1000);
   if(newScrollIndex !== lastScrollIndex) {
       lastScrollIndex = newScrollIndex;
       updateStoryLayer(lastScrollIndex);
   }
});

window.addEventListener("resize", function () {
    calculateBounds();
    updateStoryLayer(lastScrollIndex);
});

document.addEventListener("DOMContentLoaded", function () {
    calculateBounds();
    updateStoryLayer(0);
});

/* Funktionen */

function calculateBounds() {
    let newReferenceHeight = referenceLayer.getBoundingClientRect().height;
    let newDistances = [];
    let newTopBounds = [];
    let lastDistance = 0;
    let lastPossibleIndex = 0;

    for (let i = 0; i < numberOfBoxes; i++) {
        const boxContent = boxes[i].querySelector(".content");
        if (boxContent !== null) {
            boxContent.style.maxHeight = (referenceHeight - padding) + "px";
        }
        let distance = lastDistance + boxes[i].getBoundingClientRect().height;
        lastDistance = distance;
        newDistances.push(lastDistance);
        for (let j = 0; j < lastPossibleIndex; j++) {
            distance = distance - boxes[j].getBoundingClientRect().height;
        }
        while (distance > newReferenceHeight - padding) {
            distance = distance - boxes[lastPossibleIndex].getBoundingClientRect().height;
            lastPossibleIndex++;
        }
        newTopBounds.push(Math.min(i, lastPossibleIndex));
    }

    referenceHeight = newReferenceHeight;
    distances = newDistances;
    topBounds = newTopBounds;
}

function updateStoryLayer(index) {
    for (let i = 0; i < numberOfBoxes; i++) {
        if (i >= topBounds[index] && i <= index) {
            boxes[i].classList.add("visible");
        }
        else {
            boxes[i].classList.remove("visible");
        }
    }
    storyLayer.style.marginTop = (referenceHeight - padding - distances[index]) + "px";
}