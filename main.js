const arrayWidth = 8;
const arrayLength = 64;

class Node {
  constructor(value) {
    this.value = value;
    this.paths = [];
  }
}

const nodes = [];
for (let i = 0; i < arrayLength; i++) {
  nodes.push(new Node(i));
}

const validMoves = ([x, y]) => {
  /*
   *
   * given amove it will return a list of valid game play for it
   *
   * */
  if (x > 7 || x < 0 || y > 7 || y < 0) {
    console.log("Invalid moves");
    return [];
  }
  const movesArray = [2, -2, 1, -1];
  const moves = [];
  for (let i of movesArray) {
    for (let j of movesArray) {
      if (Math.abs(i) !== Math.abs(j)) {
        const newX = x + i;
        const newY = y + j;
        if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) {
          moves.push([x + i, y + j]);
        }
      }
    }
  }
  return moves;
};

const flatten = ([x, y]) => {
  return x * arrayWidth + y;
};

const deFlatten = (val) => {
  const x = Math.floor(val / arrayWidth);
  const y = val % arrayWidth;
  return [x, y];
};

const flattenValidMoves = (val) => {
  const [x, y] = deFlatten(val);
  return validMoves([x, y]).map(flatten);
};

const filterList = (original, removed) => {
  const output = [];
  for (let i of original) {
    if (!removed.includes(i)) {
      output.push(i);
    }
  }
  return output;
};

const createGraph = () => {
  for (let i of nodes) {
    i.paths = flattenValidMoves(i.value);
  }
};

const knightsMoves = ([x, y], [a, b]) => {
  const flatValue = flatten([x, y]);
  const destination = flatten([a, b]);

  const queue = [flatValue];
  const visited = [];
  const visitedObj = [];
  while (queue.length > 0) {
    const node = queue.shift();
    visited.push(node);

    const paths = filterList(filterList(nodes[node].paths, visited), queue);
    if (paths.length > 0 || node === destination) {
      visitedObj.push({ caller: node, called: paths });
    }
    if (node === destination) break;
    queue.push(...paths);
  }

  const moves = [visitedObj[visitedObj.length - 1].caller];
  function traverse(caller) {
    for (let i of visitedObj) {
      for (let j of i.called) {
        if (j === caller) {
          moves.push(i.caller);
          traverse(i.caller);
          return i.caller;
        }
      }
    }
  }

  traverse(visitedObj[visitedObj.length - 1].caller);
  const output = moves.reverse().map((val) => deFlatten(val));
  console.log(`You made it in ${output.length - 1} moves! Here's your path`);
  console.log(output);
  return output;
};

createGraph();
knightsMoves([0, 0], [7, 7]);
