# Project: Knights Travails
___
## Introduction
A knight in chess can move to any square on the standard 8x8 chess board from any other square on the board, given enough turns
![chess board](./01.png)

## knightMoves
knightMoves shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.
e.g
- `knightMoves([0,0],[1,2]) => [[0,0],[1,2]]`
- `knightMoves([0,0],[3,3]) => [[0,0],[2,1],[3,3]]`
- `knightMoves([3,3],[0,0]) => [[3,3],[2,1],[0,0]]`
- `knightMoves([0,0],[7,7]) => [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]`
- `knightMoves([3,3],[4,3]) => [[3,3],[4,5],[2,4],[4,3]]`
