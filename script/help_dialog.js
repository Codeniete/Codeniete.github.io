/* Variablen */

const helpDialog = document.querySelector(".dialog-main");

/* Events */

document.getElementById("help-button").addEventListener("click", function () {
    helpDialog.classList.add("dialog-open");
    blockScrolling();
});

document.querySelectorAll(".close-button, .backdrop").forEach(element => {
   element.addEventListener("click", function () {
        helpDialog.classList.remove("dialog-open");
        unblockScrolling();
   });
});

/* Funktionen */

function blockScrolling() {
    let scrollLeft = window.scrollX;
    let scrollTop = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function unblockScrolling() {
    window.onscroll = function () {};
}