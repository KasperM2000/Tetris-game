export function getStatementX() {
    return "Hello, World!";
}

const output = document.getElementById("output");
if (!output) {
    throw new Error("Could not find the output span.");
}
output.textContent = getStatementX();