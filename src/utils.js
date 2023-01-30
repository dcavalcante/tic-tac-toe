export function findBestMove(board, player, algorithm) {
  switch (algorithm) {
    case "random":
      return random(board);
    case "minimax":
      return minimax(board, player);
    case "minimaxAlphaBeta":
      return minimaxAlphaBeta(board, player, -Infinity, Infinity, 0)[1];
    case "minimaxBetter":
      return minimaxBetter(board, player);

    default:
      throw new Error("Invalid algorithm");
  }
}

export const checkWin = board => {
  // code to check if game has been won
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return false;
}

export const checkDraw = board => {
  // code to check if game has ended in a draw
  return board.every(cell => cell !== null);
}

export const random = board => {
  const emptySquares = [];
  board.forEach((cell, index) => {
    if (cell === null) {
      emptySquares.push(index);
    }
  });
  if (emptySquares.length > 0) {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }
  return null;
}

export const minimax = (board, player) => {
  let bestMove;
  let bestScore;

  if (checkWin(board) === "X") {
    return -1;
  } else if (checkWin(board) === "O") {
    return 1;
  } else if (checkDraw(board)) {
    return 0;
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = player;

      let score = minimax(board, player === "X" ? "O" : "X");
      board[i] = null;

      if (player === "O") {
        if (score > bestScore || bestScore === undefined) {
          bestScore = score;
          bestMove = i;
        }
      } else {
        if (score < bestScore || bestScore === undefined) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  }
  return bestMove;
};

export const minimaxBetter = (board, player) => {
  let bestMove;
  let bestScore = player === "X" ? -Infinity : Infinity;
  let emptySquares = board.filter(s => s === null).length;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = player;
      let score = checkWin(board);
      emptySquares = board.filter(s => s === null).length;
      if (player === "X") {
        if (score === 10) {
          bestMove = i;
          board[i] = null;
          break;
        } else if (score * emptySquares > bestScore) {
          bestScore = score * emptySquares;
          bestMove = i;
        }
      } else {
        if (score === -10) {
          bestMove = i;
          board[i] = null;
          break;
        } else if (score * emptySquares < bestScore) {
          bestScore = score * emptySquares;
          bestMove = i;
        }
      }
      board[i] = null;
    }
  }

  return bestMove;
};

// Bigger depth means more dificult
export const minimaxAlphaBeta = (board, player, alpha = -Infinity, beta = Infinity, depth = 0) => {
  let bestMove;
  let bestScore;
  const isMaximizing = player === "X";

  if (checkWin(board) || checkDraw(board) || depth === 9) {
    return [evaluate(board), null];
  }

  if (isMaximizing) {
    bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = player;
        const [score, _] = minimaxAlphaBeta(board, player === "X" ? "O" : "X", alpha, beta, depth + 1);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }
      }
    }
  } else {
    bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = player;
        const [score, _] = minimaxAlphaBeta(board, player === "X" ? "O" : "X", alpha, beta, depth + 1);
        board[i] = null;
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
    }
  }
  return [bestScore, bestMove];
};



// For minimaxAlphaBeta
export const evaluate = board => {
  const scores = {
    'X': 10,
    'O': -10
  }
  const wins = checkWin(board);
  return wins ? scores[wins] : 0;
}
