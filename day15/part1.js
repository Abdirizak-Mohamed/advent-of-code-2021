const fs = require('fs')
let problem = fs.readFileSync("./testInput.txt", 'utf8').split("\n").map(r => r.split(''))

const getAdj = (problem, x, y) => {

    const up = { val: problem[y - 1]?.[x], x, y: y - 1 }
    const right = { val: problem[y]?.[x + 1], x: x + 1, y }
    const left = { val: problem[y]?.[x - 1], x: x - 1, y }
    const down = { val: problem[y + 1]?.[x], x, y: y + 1 }

    const adjacent = [up, right, left, down].filter(dir => dir.val)

    return adjacent.reduce((obj, dir) => {
        obj[`${dir.y}-${dir.x}`] = Number(dir.val)
        return obj
    }, {})
}

const isFinish = (x, y, problem) => {
    return (y === problem.length - 1 && x === problem[y].length - 1)
}

const isStart = (x, y) => {
    return (y === 0 && x === 0)
}

const convertToAdjacencyList = (problem) => {
    const adjList = {}
    for (let i = 0; i < problem.length; i++) {
        for (let j = 0; j < problem[i].length; j++) {
            if (isStart(j, i)) {
                adjList.start = getAdj(problem, j, i)
                continue
            }

            if (isFinish(j, i, problem)) {
                adjList.finish = getAdj(problem, j, i)
                continue
            }

            adjList[`${i}-${j}`] = getAdj(problem, j, i)
        }
    }

    return adjList
}


let adjList = convertToAdjacencyList(problem)

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph) => {

    // track lowest cost to reach each node
    const costs = Object.assign({ finish: Infinity }, graph.start);

    // track paths
    const parents = { finish: null };
    for (let child in graph.start) {
        parents[child] = 'start';
    }


    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);


    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            console.log({ n })
            let newCost = cost + children[n];
            if (!costs[n]) {
                costs[n] = newCost;
                parents[n] = node;
            }
            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

    console.log({ costs })

    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs.finish,
        path: optimalPath
    };

    return results;
};

console.log(dijkstra(adjList));