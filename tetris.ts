
const tetrisBoard = document.getElementById("tetris-board");
if (!tetrisBoard) {
    throw new Error("Could not find the tetris-board div.");
    
}


/*function startGame() {
    console.log("Game started");
    // Add your game logic here
    setInterval(() => {
        console.log("Game tick");
        // Update game state and render
    }, 1000);
}
const startButton = document.getElementById("start-button");
if (!startButton) {
    throw new Error("Could not find the start-button.");
}
startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    startGame();
});*/


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

let pieceX = 3;
let pieceY = 0;
/*
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
*/
function shufflePieces() {
    const randomPieceKeys = Object.keys(pieces);
    const randomIndex = Math.floor(Math.random() * randomPieceKeys.length);
    const randomPieceKey = randomPieceKeys[randomIndex];
    currentPiece = pieces[randomPieceKey as keyof typeof pieces];
    pieceClass = `filled-${randomPieceKey}`;
    pieceX = 3;
    pieceY = 0;
    //shufflePieces();
}

let currentPiece = pieces.I;
let pieceClass = "filled-I";
let previousCells: number[] = [];
function drawPiece() {
    // Clear the previous position of the piece
    for (const index of previousCells) {
        arrayOfCells[index].classList.remove(pieceClass);
    }
    previousCells = [];

    // Draw the piece at the new position
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col] === 1) {
                const boardX = pieceX + col;
                const boardY = pieceY + row;
                const index = boardY * grid_width + boardX;

                arrayOfCells[index].classList.add(pieceClass);
                previousCells.push(index);
            }
        }
    }
}
function canMoveDown(): boolean {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col] === 1) {
                const boardX = pieceX + col;
                const nextBoardY = pieceY + row + 1; // Check the cell below
                
                // Check if the cell below is out of bounds or filled
                if (nextBoardY >= grid_height || grid[nextBoardY * grid_width + boardX] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}
function canMoveLeft(): boolean {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col] === 1) {
                const nextBoardX = pieceX + col - 1; // Check the cell to the left
                const boardY = pieceY + row;
                
                // Check if the cell to the left is out of bounds or filled
                if (nextBoardX < 0 || grid[boardY * grid_width + nextBoardX] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}
function canMoveRight(): boolean {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col] === 1) {
                const nextBoardX = pieceX + col + 1; // Check the cell to the right
                const boardY = pieceY + row;
                
                // Check if the cell to the right is out of bounds or filled
                if (nextBoardX >= grid_width || grid[boardY * grid_width + nextBoardX] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

function lockAndSpawnPiece() {
    // Lock the current piece into the grid
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col] === 1) {
                const index = (pieceY + row) * grid_width + (pieceX + col);
                grid[index] = 1; // Mark the cell as filled in the grid
            }
        }
    }
    previousCells = []; // Clear the previous cells since the piece is now locked
    
    shufflePieces();
}
shufflePieces(); // Initial piece selection
drawPiece(); // Initial draw of the piece

const timer = setInterval(() => {
  // Move the piece down by one row
  if (canMoveDown()) {
    pieceY++;
    drawPiece();
  } else {
    lockAndSpawnPiece();
  }
}, 1000);
  // Clear the previous position of the piece

//function shufflePieces() {
// Example: Mark the first cell as filled

//const cell = arrayOfCells[1];
//cell.classList.add("filled-L");

// For loop to iterate through the grid and update the cell classes based on the grid values
for (let i = 0; i < grid.length; i++) {
  const cell = arrayOfCells[i];
  if (grid[i] === 1) {
    cell.classList.add("filled");
  } else {
    cell.classList.remove("filled");
  }
}

addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            if (pieceX > 0 && canMoveLeft()) { // Check if the piece can move left
                console.log("Left arrow pressed");
                pieceX--;
                drawPiece();
            }
            break;
        case "ArrowRight":
            if (pieceX < grid_width - currentPiece[0].length && canMoveRight()) { // Check if the piece can move right
                console.log("Right arrow pressed");
                pieceX++;
                drawPiece();
            }
            break;
        case "ArrowDown":
            if (canMoveDown()) {
                console.log("Down arrow pressed");
                pieceY++;
                drawPiece();
            }
            break;
        case "ArrowUp":
            console.log("Up arrow pressed");    
        default:
            break;
    }
});

console.log("tetris-board div found");