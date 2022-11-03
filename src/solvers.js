/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var board = new Board({n: n});
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      }
    }
  }

  var solution = board.rows(); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  let solutions = [];
  let moves = findNRooksSolution(n);


  let createBoard = function (n, currentBoard, possibleMoves) {
    // TODO: your solution here
    if (currentBoard.length === n) {
      let solution = JSON.stringify(currentBoard);
      if (!solutions.includes(currentBoard)) {
        solutions.push(currentBoard);
      }
    } else {
      possibleMoves.forEach((move, index, movesArr) => {
        let nextMove = currentBoard.slice();
        nextMove.push(move);
        let nextPossibleMoves = movesArr.slice();
        nextPossibleMoves.splice(index, 1);
        createBoard(n, nextMove, nextPossibleMoves);
      });
    }
  };
  createBoard(n, [], moves);
  return solutions.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

/*
need to keep track of pieces on board

*/
window.findNQueensSolution = function(n) {
  let solutions = getAllNQueenSolutions(n);

  return solutions[0] || new Board({n: n}).rows();
};





// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutions = getAllNQueenSolutions(n);
  return solutions.length;
};


window.getAllNQueenSolutions = function (n) {
  var solutionCount = 0;
  let solutions = [];
  let moves = findNRooksSolution(n);
  let board = new Board({n: n});
  let pieceCount = 0;
  if (n === 0) {
    solutions.push([]);
    return solutions;
  }


  let createBoard = function (n, currentBoard, possibleMoves) {
    if (currentBoard.length === n) {
      if (pieceCount === n) {
        solutions.push(currentBoard);
      }
    } else {
      possibleMoves.forEach((move, index, movesArr) => {
        let nextMove = currentBoard.slice();
        let toggleRowIndex = nextMove.length;
        let toggleColumnIndex = move.indexOf(1);

        board.togglePiece(toggleRowIndex, toggleColumnIndex);

        if (board.hasAnyQueenConflictsOn(toggleRowIndex, toggleColumnIndex)) {
          board.togglePiece(toggleRowIndex, toggleColumnIndex);
          return;
        }

        nextMove.push(move);
        pieceCount++;
        let nextPossibleMoves = movesArr.slice();
        nextPossibleMoves.splice(index, 1);

        createBoard(n, nextMove, nextPossibleMoves);

        board.togglePiece(toggleRowIndex, toggleColumnIndex);
        pieceCount--;
      });
    }
  };
  createBoard(n, [], moves);
  return solutions;
};