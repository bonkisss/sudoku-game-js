import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/game.css';
import '../css/animations.css';

import { createEmptyBoard, fillBoard, removeCells } from './board.js';
import { initUI } from './ui.js';

const grid = document.getElementById('sudoku-grid');

function startNewGame() {
  grid.innerHTML = '';
  const board = createEmptyBoard();
  fillBoard(board);
  const solution = board.map(row => row.slice());
  removeCells(board, 40);
  initUI(grid, solution, board);
}

document.getElementById('new-game').addEventListener('click', startNewGame);

document.getElementById('clear').addEventListener('click', () => {
  // Очистить только незаблокированные клетки
  const cells = grid.querySelectorAll('.cell:not(:disabled)');
  cells.forEach(cell => {
    cell.value = '';
    cell.classList.remove('error');
  });
});

startNewGame();
