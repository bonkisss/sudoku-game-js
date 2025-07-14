import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/game.css';
import '../css/animations.css';

import { createEmptyBoard, fillBoard, removeCells } from './board.js';
import { initUI } from './ui.js';

const grid = document.getElementById('sudoku-grid');

function getRemoveCountByDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy': return 30;
    case 'normal': return 40;
    case 'hard': return 50;
    case 'mega': return 60;
    default: return 40;
  }
}

function startNewGame() {
  grid.innerHTML = '';
  const board = createEmptyBoard();
  fillBoard(board);
  const solution = board.map(row => row.slice());
  const difficulty = document.getElementById('difficulty').value;
  const removeCount = getRemoveCountByDifficulty(difficulty);
  removeCells(board, removeCount);
  initUI(grid, solution, board);
}

document.getElementById('new-game').addEventListener('click', startNewGame);

document.getElementById('difficulty').addEventListener('change', startNewGame);

document.getElementById('clear').addEventListener('click', () => {
  // Очистить только незаблокированные клетки
  const cells = grid.querySelectorAll('.cell:not(:disabled)');
  cells.forEach(cell => {
    cell.value = '';
    cell.classList.remove('error');
  });
});

startNewGame();
