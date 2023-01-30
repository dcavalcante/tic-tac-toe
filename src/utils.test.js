import { findBestMove, checkWin, checkDraw, random, minimax, minimaxBetter, minimaxAlphaBeta, evaluate } from './utils';

describe('findBestMove', () => {
  it('returns the best move according to the algorithm', () => {
    const board = Array(9).fill(null);
    expect(findBestMove(board, 'X', 'random')).toBeDefined();
    expect(findBestMove(board, 'X', 'minimax')).toBeDefined();
    expect(findBestMove(board, 'X', 'minimaxAlphaBeta')).toBeDefined();
    expect(findBestMove(board, 'X', 'minimaxBetter')).toBeDefined();
  });

  it('throws an error if the algorithm is invalid', () => {
    const board = Array(9).fill(null);
    expect(() => findBestMove(board, 'X', 'invalidAlgorithm')).toThrowError('Invalid algorithm');
  });
});

describe('checkWin', () => {
  it('returns the winning player if there is a win', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(checkWin(board)).toBe('X');
  });

  it('returns false if there is no win', () => {
    const board = [null, 'X', 'O', null, 'X', null, 'O', null, null];
    expect(checkWin(board)).toBe(false);
  });
});

describe('checkDraw', () => {
  it('returns true if the game has ended in a draw', () => {
    const board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    expect(checkDraw(board)).toBe(true);
  });

  it('returns false if the game has not ended in a draw', () => {
    const board = [null, 'X', 'O', null, 'X', null, 'O', null, null];
    expect(checkDraw(board)).toBe(false);
  });
});

describe('random', () => {
  it('returns a random empty square index', () => {
    const board = [null, 'X', 'O', null, 'X', null, 'O', null, null];
    const randomMove = random(board);
    expect(board[randomMove]).toBe(null);
  });

  it('returns null if there are no empty squares', () => {
    const board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    expect(random(board)).toBe(null);
  });
});

describe('minimaxBetter', () => {
  it('returns the best move for player X', () => {
    const board = [null, null, "O", "X", "O", null, null, null, null];
    const player = "X";

    const result = minimaxBetter(board, player);

    expect(result).toBe(0);
  });

  it('returns the best move for player O', () => {
    const board = ["X", null, "O", "X", null, null, null, null, null];
    const player = "O";

    const result = minimaxBetter(board, player);

    expect(result).toBe(1);
  });

  it('returns null if the game is already won', () => {
    const board = ["X", "X", "X", "O", "O", null, null, null, null];
    const player = "O";

    const result = minimaxBetter(board, player);

    expect(result).toBe(undefined);
  });
});


describe('minimaxAlphaBeta', () => {
  it('should return the best move and score for the maximizing player "X"', () => {
    const board = ['X', null, null, null, null, null, null, null, null];
    const [bestScore, bestMove] = minimaxAlphaBeta(board, 'X');
    expect(bestScore).toBeDefined();
    expect(bestMove).toBeDefined();
  });

  it('should return the best move and score for the minimizing player "O"', () => {
    const board = Array(9).fill(null);
    const [bestScore, bestMove] = minimaxAlphaBeta(board, 'O');
    expect(bestScore).toBeDefined();
    expect(bestMove).toBeDefined();
  });

  it('should return 0 for a draw game', () => {
    const board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    const [bestScore] = minimaxAlphaBeta(board, 'O');
    expect(bestScore).toBe(0);
  });
});

describe('evaluate', () => {
  it('should return 10 for a win game of "X"', () => {
    const board = ['X', 'X', 'X', 'O', null, null, null, null, null];
    const result = evaluate(board);
    expect(result).toBe(10);
  });

  it('should return -10 for a win game of "O"', () => {
    const board = ['O', 'O', 'O', 'X', null, null, null, null, null];
    const result = evaluate(board);
    expect(result).toBe(-10);
  });

  it('should return 0 for a draw game', () => {
    const board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    const result = evaluate(board);
    expect(result).toBe(0);
  });
});