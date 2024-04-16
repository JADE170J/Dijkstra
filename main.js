function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue();

    // Initialize distances for all vertices as infinite
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    // Set distance for the start vertex as 0
    distances[start] = 0;

    // Add start vertex to the priority queue
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { vertex, distance } = priorityQueue.dequeue();

        // Skip if the vertex has already been visited
        if (visited.has(vertex)) continue;

        // Mark vertex as visited
        visited.add(vertex);

        // Update distances for adjacent vertices
        for (let neighbor in graph[vertex]) {
            const weight = graph[vertex][neighbor];
            const totalDistance = distance + weight;

            // Update distance if shorter path found
            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;
                // Add neighbor to the priority queue with updated distance
                priorityQueue.enqueue(neighbor, totalDistance);
            }
        }
    }

    return distances;
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }
}

// Example graph
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

// Example usage
console.log(dijkstra(graph, 'A')); // Output: { 'A': 0, 'B': 4, 'C': 2, 'D': 5 }


//Prof i had to chatgpt this thing at some pointe