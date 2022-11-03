/*
var solutionCount = 0;
let solutions = [];
let moves = findNRooksSolution(n);

let createBoard = function (n, currentBoard, possibleMoves) {
  // TODO: your solution here
  currentBoard = currentBoard || [];
  if (currentBoard.length === n) {
    let solution = JSON.stringify(currentBoard);
    if (!solutions.include(currentBoard)) {
      solutions.push(currentBoard);
    }
  } else {
    possibleMoves.forEach((move, index, movesArr) => {
      let nextMove = currentBoard.slice().push(move);
      let nextPossibleMoves = movesArr.slice().splice(index, 1);
      createBoard(n, nextMove, nextPossibleMoves);
    });
  }
};
*/

var solutionCount = 0;
let solutions = [];
let moves = findNRooksSolution(n);
let board = new Board({n: n});
let pieceCount = 0;

let createBoard = function (n, currentBoard, possibleMoves) {
  // TODO: your solution here
  if (currentBoard.length === n) {
    let solution = JSON.stringify(currentBoard);
    if (!solutions.include(currentBoard)) {
      solutions.push(currentBoard);
    }
  } else {
    possibleMoves.forEach((move, index, movesArr) => {
      let nextMove = currentBoard.slice();
      //find row index -> nextMove.length - 1;
      // find columnIndex -> move.indexOf(1);
      // togglePiece at column / row
      // if hasAnyQueenConflictsOn: function(rowIndex, colIndex)
      //    then toggle again.
      //    return;
      let toggleRowIndex = nextMove.length - 1;
      let toggleColumnIndex = move.indexOf(1);
      board.toggle(toggleRowIndex, toggleColumnIndex);
      if (hasAnyQueenConflictsOn(toggleRowIndex, toggleColumnIndex)) {
        board.toggle(toggleRowIndex, toggleColumnIndex);
        return;
      }
      nextMove.push(move);
      pieceCount++;
      let nextPossibleMoves = movesArr.slice();
      nexPossibleMoves.splice(index, 1);
      createBoard(n, nextMove, nextPossibleMoves);
      board.set(toggleRowIndex, Array(n).fill(0));
      pieceCount--;
    });
  }
};