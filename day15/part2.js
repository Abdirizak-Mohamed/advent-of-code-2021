const fs = require('fs')
let problem = fs.readFileSync("./input.txt", 'utf8').split("\n").map(r => r.split('').map(v => Number(v)))

const increaseProblem = (problem) => {
    const newProblem = problem.reduce((newP, arr) => {
        newP.push([...arr])
        return newP
    }, [])
    for (let q = 1; q < 5; q++) {
        for (let i = 0; i < problem.length; i++) {
            for (let j = 0; j < problem[i].length; j++) {
                const nextVal = (problem[i][j] + q) < 10 ? problem[i][j] + q : ((problem[i][j] + q) % 10) + 1
                newProblem[i].push(nextVal)
            }
        }
    }

    for (let q = 1; q < 5; q++) {
        for (let i = 0; i < problem.length; i++) {
            newProblem.push([])
            for (let j = 0; j < newProblem[i].length; j++) {

                const nextVal = (newProblem[i][j] + q) < 10 ? newProblem[i][j] + q : ((newProblem[i][j] + q) % 10) + 1
                newProblem[newProblem.length - 1].push(nextVal)
            }
        }
    }

    return newProblem
}


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

const fiveXProblem = increaseProblem(problem)
let adjList = convertToAdjacencyList(fiveXProblem)

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

const dijkstra = (graph) => {

    const costs = Object.assign({ finish: Infinity }, graph.start);

    const parents = { finish: null };
    for (let child in graph.start) {
        parents[child] = 'start';
    }

    const processed = [];

    let node = lowestCostNode(costs, processed);
    console.log({ time: Date.now() })


    while (node) {
        if (node === "499-499") console.log(costs[node])
        let cost = costs[node];
        let children = graph[node];
        //console.log({ node })

        for (let n in children) {
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

    console.log({ end: costs["499-499"], time: Date.now() })


    return results;
};

console.log(dijkstra(adjList));

