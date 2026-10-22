
const tetrisBoard = document.getElementById("tetris-board");
if (!tetrisBoard) {
    throw new Error("Could not find the tetris-board div.");
    
}

let gameTimer: number | undefined;

// Define the grid dimensions
const grid_width = 10;
const grid_height = 20;


const grid = new Array(grid_height * grid_width).fill(0);

const arrayOfCells = Array.from(tetrisBoard.getElementsByClassName("cell"));

const pieces = {
  L: [[1, 0], [1, 0], [1, 1]],
  J: [[0, 1], [0, 1], [1, 1]],
  T: [[1, 1, 1], [0, 1, 0]],
  O: [[1, 1], [1, 1]],
  I: [[1, 1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
};

let pieceX = 3;
let pieceY = 0;


function shufflePieces() {
    const randomPieceKeys = Object.keys(pieces);
    const randomIndex = Math.floor(Math.random() * randomPieceKeys.length);
    const randomPieceKey = randomPieceKeys[randomIndex];
    currentPiece = pieces[randomPieceKey as keyof typeof pieces];
    pieceClass = `filled-${randomPieceKey}`;
    pieceX = 3;
    pieceY = 0;
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
function isGameOver() {
    for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
            if (currentPiece[row][col] === 1) {
                const boardX = pieceX + col;
                const boardY = pieceY + row;

                // Check if the cell is out of bounds or filled
                if (boardY < 0 || boardY >= grid_height || boardX < 0 || boardX >= grid_width || grid[boardY * grid_width + boardX] !== 0) {
                    return true;
                    alert("Game Over! Your score: " + score);
                    // Game over condition met
                }
            }
        }
    }
    return false; // No game over condition met
}

let heldPiece: { shape: number[][]; colorClass: string } | null = null;
let holdUsed = false; // Track if the hold action has been used for the current piece
function holdPiece(): void {
    // Implement the logic to hold the current piece
    // This could involve storing the current piece in a separate variable
    // and allowing the player to swap it with the held piece later.
    console.log("Hold piece action triggered");
    if (holdUsed) {
        console.log("Hold action already used for this piece.");
        return; // Prevent holding again for the same piece
    }
    for (const index of previousCells) {
        arrayOfCells[index].classList.remove(pieceClass);
    }
    previousCells = [];

    if (heldPiece === null) {
        heldPiece = { shape: currentPiece, colorClass: pieceClass };
        shufflePieces(); // Get a new piece after holding
    } else {
        const temp = { shape: currentPiece, colorClass: pieceClass };
        currentPiece = heldPiece.shape;
        pieceClass = heldPiece.colorClass;
        heldPiece = temp;
    }
    pieceX = 3; // Reset position for the new piece
    pieceY = 0;
    holdUsed = false; // Mark that the hold action has been used
    drawPiece();
}

const heldPreview = document.querySelector(".held-piece-preview");
if (!heldPreview) {
    throw new Error("Could not find the held-piece preview.");
}
const heldPreviewCells = Array.from(
    heldPreview.querySelectorAll<HTMLElement>(".cell")
);

function drawHeldPiece(): void{
    for (const cell of heldPreviewCells){
        cell.className = "cell";
    }

    if (heldPiece === null) return;
    const offsetX = Math.floor((4 - heldPiece.shape[0].length) / 2);
    const offsetY = Math.floor((4 - heldPiece.shape.length) / 2);

    for (let row = 0; row < heldPiece.shape.length; row++) {
        for (let col = 0; col < heldPiece.shape[row].length; col++) {
            if (heldPiece.shape[row][col] === 1) {
                const index = (row + offsetY) * 4 + col + offsetX;
                heldPreviewCells[index].classList.add(heldPiece.colorClass);
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


function canMoveStraightDown(): boolean {
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


function rotatePiece() {
    const newPiece: number[][] = [];
    const rows = currentPiece.length;
    const cols = currentPiece[0].length;

    for (let col = 0; col < cols; col++) {
        const newRow: number[] = [];
        for (let row = rows - 1; row >= 0; row--) {
            newRow.push(currentPiece[row][col]);
        }
        newPiece.push(newRow);
    }

    // Check if the rotated piece can fit in the grid
    for (let row = 0; row < newPiece.length; row++) {
        for (let col = 0; col < newPiece[row].length; col++) {
            if (newPiece[row][col] === 1) {
                const boardX = pieceX + col;
                const boardY = pieceY + row;

                // Check if the cell is out of bounds or filled
                if (boardX < 0 || boardX >= grid_width || boardY < 0 || boardY >= grid_height || grid[boardY * grid_width + boardX] !== 0) {
                    return; // Cannot rotate, so exit the function
                }
            }
        }
    }

    // If the rotation is valid, update the current piece
    currentPiece = newPiece;
    drawPiece();
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
    const linesCleared = removeLines(); // Check for and remove any full lines
    if (linesCleared > 0) {
        updateScore(linesCleared); // Update the score based on the number of lines cleared
    }
    shufflePieces();
    // Indsæt check for game over condition here if needed
    if (isGameOver()) {
        if (gameTimer !== undefined) {
            clearInterval(gameTimer);
            gameTimer = undefined;
        }
        alert("Game Over! Your score: " + score);
        return; // Exit the function to prevent further execution
    }
    holdUsed = false; // Reset hold usage for the new piece
    drawPiece();
}
shufflePieces(); // Initial piece selection
drawPiece(); // Initial draw of the piece


//Tjekker om der er fulde linjer og fjerner dem ved at sætte dem til 0 i grid arrayet og fjerne filled klassen fra cellerne
function removeLines(): number {
    let linesCleared = 0;

    for (let row = grid_height - 1; row >= 0; row--) {
        let isFullLine = true;

        for (let col = 0; col < grid_width; col++) {
            if (grid[row * grid_width + col] === 0) {
                isFullLine = false;
                break;
            }
        }

        if (!isFullLine) continue;

        linesCleared++;

        // Shift each row above the cleared row down by one.
        for (let rowAbove = row; rowAbove > 0; rowAbove--) {
            for (let col = 0; col < grid_width; col++) {
                const destination = rowAbove * grid_width + col;
                const source = (rowAbove - 1) * grid_width + col;

                grid[destination] = grid[source];
                arrayOfCells[destination].className =
                    arrayOfCells[source].className;
            }
        }

        // Empty the top row.
        for (let col = 0; col < grid_width; col++) {
            grid[col] = 0;
            arrayOfCells[col].className = "cell";
        }

        // Check this row again in case another full row shifted into it.
        row++;
    }

    return linesCleared;
}
      
const scoreElement = document.getElementById("score");
if (!scoreElement) {
    throw new Error("Could not find the score element.");
}

let score = 0;
function updateScore(linesCleared: number) {
    if(!scoreElement) {
        throw new Error("Score element not found.");
    }
    const pointsPerLine = [0, 100, 300, 500, 800]; // Points for clearing 0, 1, 2, 3, or 4 lines
    score += pointsPerLine[linesCleared] || 0;
    scoreElement.textContent = String(score);
}

const startButton = document.getElementById("start-button");
if (!startButton) {
    throw new Error("Could not find the start-button.");
}
startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    startGame();
});

function startGame() {
    if (!scoreElement) {
        throw new Error("Score element not found.");
    }
    if (gameTimer !== undefined) {
        clearInterval(gameTimer);
    }

    for (let i = 0; i < grid.length; i++) {
        grid[i] = 0;
        arrayOfCells[i].className = "cell";
    }

    score = 0;
    scoreElement.textContent = "0";
    previousCells = [];

    shufflePieces();
    drawPiece();

    gameTimer = window.setInterval(() => {
        // Keep your existing timer code here
        if (canMoveDown()) {
            pieceY++;
            drawPiece();
        } else {
            lockAndSpawnPiece();
        }
    }, 1000);
}
/*function startGame() {
    console.log("Game started");
    // Add your game logic here
    gameTimer = window.setInterval(() => {
        console.log("Game tick");
        if (canMoveDown()) {
            pieceY++;
            drawPiece();
        } else {
            lockAndSpawnPiece();
        }
        // Update game state and render
    }, 1000);
}
*/
// Clear the previous position of the piece



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
            rotatePiece();
            break; 
        case " ":
            console.log("Space bar pressed");
            while (canMoveStraightDown()) {
                pieceY++;
            }
            drawPiece();
            lockAndSpawnPiece();
            break;
        case "c":
            console.log("C key pressed");
            holdPiece();
            break;      
        default:
            break;
    }
});

console.log("tetris-board div found");