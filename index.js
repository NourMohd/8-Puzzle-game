(function() {
    // Bind Click event to the drop down navigation button
    document.querySelector('.nav-button').addEventListener('click', function() {
      /*  Toggle the CSS closed class which reduces the height of the UL thus 
          hiding all LI apart from the first */
      this.parentNode.parentNode.classList.toggle('closed')
    }, false);

    document.getElementById('dfs-link').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        sol = DFS()
        solStack = getSteps(sol);
        console.log(sol);
        document.getElementById('prv').hidden = false;
        document.getElementById('nxt').hidden = false;
    });

    document.getElementById('bfs-link').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        sol = BFS()
        solStack = getSteps(sol);
        console.log(sol);
        document.getElementById('prv').hidden = false;
        document.getElementById('nxt').hidden = false;
    });

    document.getElementById('a*Man-link').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        sol = A_Star_Search(ManhattanDistance)
        solStack = getSteps(sol);
        console.log(sol);
        document.getElementById('prv').hidden = false;
        document.getElementById('nxt').hidden = false;
    });

    document.getElementById('a*ECLD-link').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        sol = A_Star_Search(EuclideanDistance)
        solStack = getSteps(sol);
        console.log(sol);
        document.getElementById('prv').hidden = false;
        document.getElementById('nxt').hidden = false;
    });
  })();

var sol =null;
var solStack = [];
var idx = 0;
function getSteps(sol)
{
    var stack = [];
    var temp = sol;
    while (temp.parent !==null) {
        stack.push(temp)
        temp = temp.parent;
    }
    stack.push(temp);
    idx = stack.length -1;
    return stack
}
//////////////////////////////////////////////////////////////////////////////////////
// Function to generate HTML grid based on the array
function generateGrid(rows) {

    if(!isSolvableState(rows)){
        console.log("the initial state is not solvable");
    }


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
        if(val ===0)
        {
            gridItem.style.background = "red";
            gridItem.textContent = '';
        }
        gridContainer.appendChild(gridItem);
    });
}
////////////////////////////////////////////////////////////////////////////////////////


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
 
    // Helper Methods
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }
    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }
    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }
    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }
 
    // Functions to create Min Heap
     
    swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }
 
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }
     
    // Removing an element will remove the
    // top element with highest priority then
    // heapifyDown will be called 
    remove() {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }
 
    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }
 
    heapifyUp(idx) {
        if(idx== null)
            var index = this.heap.length - 1;
        else
            var index = idx;
        while (this.hasParent(index) && this.parent(index).f > this.heap[index].f) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
 
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index).f < this.leftChild(index).f) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index].f < this.heap[smallerChildIndex].f) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
     
    printHeap() {
        var heap =` ${this.heap[0]} `
        for(var i = 1; i<this.heap.length;i++) {
            heap += ` ${this.heap[i]} `;
        }
        console.log(heap);
    }
    isInHeap(element)
    {
        var inHeap = false;
        this.heap.forEach(e => inHeap = e.state.every((a, index) => a === element.state[index]) ? true : inHeap);
        return inHeap;
    }
    decreaseKey(element) {
        if (!element || !element.state) {
            return; // Handle null or undefined elements
        }
    
        var oldElem = null;
        this.heap.forEach((e, idx) => oldElem = e.state.every((a, index) => a === element.state[index]) ? idx : oldElem);
        this.heap[oldElem] = element;
        this.heapifyUp(oldElem);
    }
    
    isEmpty()
    {
        return this.heap.length === 0;
    }
}



// Function to generate a solvable random initial state
function generateSolvableRandomState() {
    let randomState;
    do {
        randomState = generateRandomState();
    } while (!isSolvableState(randomState));

    return randomState;
}

// Function to generate a random initial state
function generateRandomState() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Shuffle the numbers randomly
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
}

// Function to check if a state is solvable
function isSolvableState(state) {
    let inversionCount = 0;
    for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
            if (state[i] > state[j] && state[i] !== 0 && state[j] !== 0) {
                inversionCount++;
            }
        }
    }

    return inversionCount % 2 === 0;
}

// Event listener for the randomization button
document.getElementById('randomizeButton').addEventListener('click', function () {
    initialState.state = generateSolvableRandomState();
    generateGrid(initialState.state);
});
document.getElementById('prv').addEventListener('click', function () {
    idx = Math.min(idx+1,solStack.length-1);
    initialState = solStack[idx]
    generateGrid(initialState.state);
});
document.getElementById('nxt').addEventListener('click', function () {
    idx = Math.max(idx-1,0); 
    initialState = solStack[idx]
    generateGrid(initialState.state);
});


// Example usage:

// Define your 2-D array representing the grid
var initialState = {
    state: [
        8, 2, 1,
        5, 4, 6,
        0, 3, 7
    ], parent: null,
    f: null,
    g:0,
    h:null,     
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

/////////////////////////////////////////////////

function getChildStates(state, huerstic) {
    var zeroIdx = state.state.indexOf(0);
    var row = Math.floor(zeroIdx / 3);
    var col = zeroIdx - row * 3;
    possibleRow = [row + 1, row - 1].filter(e => e >= 0 && e <= 2).map(e => col + e * 3)
    possibleCol = [col + 1, col - 1].filter(e => e >= 0 && e <= 2).map(e => row * 3 + e)
    moves = [...possibleRow, ...possibleCol]
    var states = []
    moves.forEach(element => {
        
        newState = { state: [...state["state"]], parent: state, g:state.g+1,h:null,f:null }
        newState["state"][zeroIdx] = state.state[element];
        newState["state"][element] = 0;
        if(huerstic!= null)
        {
            newState.h = huerstic(newState.state);
            newState.f = newState.g + newState.h;
        }
        states.push(newState)
    });
    return states
}

function isVisited(visited, state) {
    var inVisited = false;
    visited.forEach(e => inVisited = e.state.every((a, index) => a === state.state[index]) ? true : inVisited);
    return inVisited;
}
function BFS() {
    var maxedepth = 0
    console.time('BFS_time');
    const queue = new Queue();
    queue.enqueue(initialState); // Enqueue the initial state
    var visited = [];
    while (!queue.isEmpty()) {
        currentState = queue.dequeue()
        maxedepth = Math.max(maxedepth, currentState.g)
        if (isGoal(currentState))
        {
            console.timeEnd('BFS_time');
            console.log("Expanded Nodes: " + visited)
            console.log("Search: "+maxedepth)
           return currentState;
        }
        else {
            states = getChildStates(currentState);
            states.forEach(element => {
                if (!isVisited(visited, element) && !queue.isInQueue(element))
                    queue.enqueue(element);
            });
        }

    }
    visited.push(currentState)
    return null;
}
function DFS() {
    console.time('DFS_time')
    var maxedepth = 0
    const stack = new Stack();
    stack.push(initialState); // Enqueue the initial state
    var visited = [];
    while (!stack.isEmpty()) {
        currentState = stack.pop()
        maxedepth = Math.max(maxedepth, currentState.g)
        if (isGoal(currentState)){
        console.timeEnd("DFS_time");
        console.log("Expanded Nodes: " + visited.length)
        console.log("Search: "+maxedepth)
            return currentState;}
        else {
            if(currentState.g<=31) //Maximum Moves for solvable 
            {
                states = getChildStates(currentState);
                states.forEach(element => {
                    if (!isVisited(visited, element) && !stack.isInStack(element))
                        stack.push(element);
                });
            }  
        }

    }
    visited.push(currentState);
    return null;
}

function A_Star_Search(huerstic) {
    var maxedepth = 0
    console.time('A*_time');
    const heap = new MinHeap();
    heap.add(initialState);
    var visited = [];
    
    while (!heap.isEmpty()) {
        currentState = heap.remove();
        maxedepth = Math.max(maxedepth, currentState.g)
        visited.push(currentState);
        if (isGoal(currentState))
        {
        console.timeEnd('A*_time');
        console.log("Expanded Nodes: " + visited.length)
        console.log("Search: "+maxedepth)
        return currentState;
        
        }
        else {
            states = getChildStates(currentState, huerstic);
            states.forEach(element => {
                if (!isVisited(visited, element) && !heap.isInHeap(element))
                    heap.add(element);
                else if (heap.isInHeap(element)) {
                    heap.decreaseKey(element)
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
        goalIdx = goal.indexOf(element);
        h += Math.sqrt(Math.pow(Math.floor(state.indexOf(element) / 3) - Math.floor(goalIdx / 3), 2) +
            Math.pow((state.indexOf(element) % 3) - (goalIdx % 3), 2));
    });
    return h;
}

function isGoal(state) {
    if (!state || !state.state) {
        return false; // Handle null or undefined states
    }

    var isSorted = true;
    state.state.forEach((element, i) => {
        isSorted = i === element ? isSorted : false;
    });
    return isSorted;
}


function TryMove(e) {
    var idx = this.dataset.index;
    var moves = getChildStates(initialState);
    var newState = null;

    moves.forEach(e => {
        newState = e.state.indexOf(0) === +idx ? e : newState;
    });

    if (newState != null) {
        initialState = {
            state: newState.state.slice(),
            parent: newState.parent,
            f: newState.f,
            g: newState.g,
            h: newState.h
        };
        generateGrid(initialState.state);
    }
}



