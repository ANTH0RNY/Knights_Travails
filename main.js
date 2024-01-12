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

// const destination = 0;
// const gamePlay = (flatenMove, history) => {
// if (flatenMove < 0 || flatenMove > 63) {
// throw new Error(`flaten move ${flatenMove} is invalid`);
// }
// const path = [...history, flatenMove];
// nodes[flatenMove].paths.push(path);

// if (flatenMove === destination) return;

// const moves = filterList(flattenValidMoves(flatenMove), path);
// moves.forEach((val) => {
// gamePlay(val, path);
// });
// };

// gamePlay(27, []);

const createGraph = () => {
  for (let i of nodes) {
    i.paths = flattenValidMoves(i.value);
  }
};

createGraph();
console.log(nodes);
