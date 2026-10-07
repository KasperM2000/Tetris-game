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

console.log("tetris-board div found");