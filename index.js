

// Function to generate HTML grid based on the array
var zeroColumn = 0;
var zeroRow = 0;
function generateGrid(rows) {
const gridContainer = document.getElementById('gridContainer');
gridContainer.innerHTML = ''; // Clear previous content

rows.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.dataset.index = rowIndex * rows.length + columnIndex;
    // storing the zero index
    if (column === 0) {
        zeroRow = rowIndex;
        zeroColumn = columnIndex; 
    }
    gridItem.textContent = column;
    gridContainer.appendChild(gridItem);
    });
});
}

// BFS Algorithm
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return "No elements in Queue";
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printQueue() {
        var queue = [];
        for (let i = 0; i < this.items.length; i++) {
            queue += this.items[i] ;
        }
        return queue;
    }
}

// Example usage:
const queue = new Queue();
// Define your 2-D array representing the grid
const initialState = [
    [1, 2, 5],
    [3, 4, 0],
    [6, 7, 8]
    ];
queue.enqueue(initialState); // Enqueue the initial state

// Call the function with your array
generateGrid(initialState);

var noOfMoves = 0;
function isValidMove(zeroRow, zeroColumn){
    
    if(zeroRow === 1 && zeroColumn === 1){
        noOfMoves = 4;
    }else if(zeroRow === 1 || zeroColumn === 1){
        noOfMoves = 3;
    }else{
        noOfMoves = 2;
    }
    return noOfMoves; 
}                                                                                                                                                             

console.log(isValidMove(zeroRow, zeroColumn));
