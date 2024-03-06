

// Function to generate HTML grid based on the array
function generateGrid(rows) {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Clear previous content

    rows.forEach((val, idx) => {
        var row = Math.floor(idx / 3);
        var col = idx - row * 3;
        const gridItem = document.createElement('div');
        gridItem.onclick = TryMove;
        gridItem.classList.add('grid-item');
        gridItem.dataset.index = idx;
        // storing the zero index
        gridItem.textContent = val;
        gridContainer.appendChild(gridItem);
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
            queue += this.items[i];
        }
        return queue;
    }
    isInQueue(element) {
        var inQueue = false;
        this.items.forEach(e => inQueue = e.state.every((a, index) => a === element.state[index]) ? true : inQueue);
        return inQueue;
    }
}

// DFS Algorithm
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.pop();
    }

    front() {
        if (this.isEmpty()) {
            return "No elements in Stack";
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
    isInStack(element) {
        var inStack = false;
        this.items.forEach(e => inStack = e.state.every((a, index) => a === element.state[index]) ? true : inStack);
        return inStack;
    }
}

// A* Algorithm
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(array) {
        this.heap.push(array);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[parentIndex], this.heap[index]) <= 0) break;
            // swap
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        // Move the last element to the root
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return min;
    }

    heapify(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;

        if (left < this.heap.length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
            smallest = left;
        }
        if (right < this.heap.length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
            smallest = right;
        }
        if (smallest !== index) {
            // swap
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapify(smallest);
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    isInHeap(element) {
        var inHeap = false;
        this.heap.forEach(e => inHeap = e.state.every((a, index) => a === element.state[index]) ? true : inHeap);
        return inHeap;
    }

    DecreaseKey(element) {
        //decrease key code
    }
}



// Example usage:

// Define your 2-D array representing the grid
const initialState = {
    state: [
        1, 2, 5,
        3, 4, 0,
        6, 7, 8
    ], parent: null
};



// Call the function with your array
generateGrid(initialState.state);

var noOfMoves = 0;
function isValidMove(zeroRow, zeroColumn) {

    if (zeroRow === 1 && zeroColumn === 1) {
        noOfMoves = 4;
    } else if (zeroRow === 1 || zeroColumn === 1) {
        noOfMoves = 3;
    } else {
        noOfMoves = 2;
    }
    return noOfMoves;
}
function getChildStates(state) {
    var zeroIdx = state.state.indexOf(0);
    var row = Math.floor(zeroIdx / 3);
    var col = zeroIdx - row * 3;
    possibleRow = [row + 1, row - 1].filter(e => e >= 0 && e <= 2).map(e => col + e * 3)
    possibleCol = [col + 1, col - 1].filter(e => e >= 0 && e <= 2).map(e => row * 3 + e)
    moves = [...possibleRow, ...possibleCol]
    var states = []
    moves.forEach(element => {
        newState = { state: [...state["state"]], parent: state }
        newState["state"][zeroIdx] = state.state[element];
        newState["state"][element] = 0;
        states.push(newState)
    });
    return states
}

function isVisited(visited, state) {
    var inVisited = false;
    visited.forEach(e => inVisited = e.state.every((a, index) => a === element.state[index]) ? true : inVisited);
    return inVisited;
}
function BFS() {
    const queue = new Queue();
    queue.enqueue(initialState); // Enqueue the initial state
    var visited = [];
    while (!queue.isEmpty()) {
        currentState = queue.dequeue()
        if (isGoal(currentState))
            return currentState;
        else {
            states = getChildStates(currentState);
            states.forEach(element => {
                if (!isVisited(visited, element) && !queue.isInQueue(element))
                    queue.enqueue(element);
            });
        }

    }
    visited.push(currentState);
    return null;
}
function DFS() {
    const stack = new Stack();
    stack.push(initialState); // Enqueue the initial state
    var visited = [];
    while (!stack.isEmpty()) {
        currentState = stack.pop()
        if (isGoal(currentState))
            return currentState;
        else {
            states = getChildStates(currentState);
            states.forEach(element => {
                if (!isVisited(visited, element) && !stack.isInStack(element))
                    stack.push(element);
            });
        }

    }
    visited.push(currentState);
    return null;
}

function A_Star_Search() {
    const heap = new MinHeap();
    heap.insert(initialState);
    var visited = [];
    
    while (!heap.isEmpty()) {
        currentState = heap.extractMin();
        visited.push(currentState);
        if (isGoal(currentState))
            return currentState;
        else {
            states = getChildStates(currentState);
            states.forEach(element => {
                if (!isVisited(visited, element) && !heap.isInHeap(element))
                    stack.push(element);
                else if (heap.isInHeap(element)) {
                    // decrease key
                }
            });
        }
    }

}

function ManhattanDistance(state) {
    var h = 0;
    var goal = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    state.forEach(element => {
        goalIdx = goal.indexOf(element);
        h += Math.abs(Math.floor(state.indexOf(element) / 3) - Math.floor(goalIdx / 3)) +
            Math.abs((state.indexOf(element) % 3) - (goalIdx % 3));
    });

    return h;
}
function EuclideanDistance(state) {
    var goal = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var h = 0;
    state.forEach(element => {
        h += Math.sqrt(Math.pow(Math.floor(state.indexOf(element) / 3) - Math.floor(goalIdx / 3), 2) +
            Math.pow((state.indexOf(element) % 3) - (goalIdx % 3), 2));
    });
    return h;
}
function isGoal(state) {
    var isSorted = true
    state.state.forEach((element, i) => {
        isSorted = i == element ? isSorted : false
    });
    return isSorted
}
function TryMove(e) {
    var idx = this.dataset.index
    var moves = getChildStates(initialState)
    console.log(moves)
}

// console.log(ManhattanDistance(initialState.state));
// console.log(EuclideanDistance(initialState.state));

// var heap = new MinHeap();
// heap.insert(initialState);
// console.log(heap.isInHeap(state));