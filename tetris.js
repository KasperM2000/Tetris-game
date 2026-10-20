"use strict";
const tetrisBoard = document.getElementById("tetris-board");
if (!tetrisBoard) {
    throw new Error("Could not find the tetris-board div.");
}
const startButton = document.getElementById("start-button");
if (!startButton) {
    throw new Error("Could not find the start-button.");
}
startButton.addEventListener("click", () => {
    console.log("Start button clicked");
});
// Define the grid dimensions
const grid_width = 10;
const grid_height = 20;
const grid = new Array(grid_height * grid_width).fill(0);
//grid[2] = 1; // Mark the first cell as filled
const arrayOfCells = Array.from(tetrisBoard.getElementsByClassName("cell"));
const pieces = {
    L: [[1, 0], [1, 0], [1, 1]],
    J: [[0, 1], [0, 1], [1, 1]],
    T: [[1, 1, 1], [0, 1, 0]],
    O: [[1, 1], [1, 1]],
    I: [[1, 1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]]
};
const pieceX = 3;
const pieceY = 0;
for (let row = 0; row < pieces.I.length; row++) {
    for (let col = 0; col < pieces.I[row].length; col++) {
        if (pieces.I[row][col] === 1) {
            const boardX = pieceX + col;
            const boardY = pieceY + row;
            const index = boardY * grid_width + boardX;
            arrayOfCells[index].classList.add("filled-I");
        }
    }
}
//function shufflePieces() {
// Example: Mark the first cell as filled
//const cell = arrayOfCells[1];
//cell.classList.add("filled-L");
// For loop to iterate through the grid and update the cell classes based on the grid values
for (let i = 0; i < grid.length; i++) {
    const cell = arrayOfCells[i];
    if (grid[i] === 1) {
        cell.classList.add("filled");
    }
    else {
        cell.classList.remove("filled");
    }
}
addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            console.log("Left arrow pressed");
            break;
        case "ArrowRight":
            console.log("Right arrow pressed");
            break;
        case "ArrowDown":
            console.log("Down arrow pressed");
            break;
        case "ArrowUp":
            console.log("Up arrow pressed");
            break;
        default:
            break;
    }
});
console.log("tetris-board div found");
