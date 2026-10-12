export function getStatementX() {
    return "Hello, World!";
}
const output = document.getElementById("output");
if (!output) {
    throw new Error("Could not find the output span.");
}
output.textContent = getStatementX();
const tetrisBoard = document.getElementById("tetris-board");
if (!tetrisBoard) {
    throw new Error("Could not find the tetris-board div.");
}
const arrayOfCells = Array.from(tetrisBoard.getElementsByClassName("cell"));
const pieces = {
    L: [[1, 0], [1, 0], [1, 1]],
    J: [[0, 1], [0, 1], [1, 1]],
    T: [[1, 1, 1], [0, 1, 0]],
    O: [[1, 1], [1, 1]],
    I: [[1], [1], [1], [1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]]
};
const cell = arrayOfCells[0];
cell.classList.add("filled-L");
const cell1 = arrayOfCells[1];
cell1.classList.add("filled-J");
const cell2 = arrayOfCells[2];
cell2.classList.add("filled-T");
console.log("tetris-board div found");
