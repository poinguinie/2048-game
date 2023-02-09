/**
 * Jquery JavaScript
 * Button Cick Event
 */
$(function() {
    const startBtn = $("#startBtn");
    const retryBtn = $("#retryBtn");

    startBtn.on("click", () => {
        alert("Start Butten Clicked.");
    });
    retryBtn.on("click", () => {
        alert("Retry Button Clicked.");
    });
    $(".column").on("click", () => {
        alert("Column Clicked.");
    })
});