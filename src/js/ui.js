let grid;
let solution = [];
let currentBoard = [];

export function initUI(gridElement, solutionBoard, startingBoard) {
  grid = gridElement;
  solution = solutionBoard;
  currentBoard = startingBoard;

  grid.innerHTML = '';
  createEmptyGrid();
  attachInputListeners();
  renderBoard();
}

function createEmptyGrid() {
  for(let row=0; row<9; row++) {
    for(let col=0; col<9; col++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (col % 3 === 0 && col !== 0) cell.classList.add('border-left');
      if (row % 3 === 0 && row !== 0) cell.classList.add('border-top');

      grid.appendChild(cell);
    }
  }
}

function attachInputListeners() {
  const cells = grid.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('input', onCellInput);
    cell.addEventListener('focus', onCellFocus);
    cell.addEventListener('blur', onCellBlur);
  });
}

function renderBoard() {
  const cells = grid.querySelectorAll('.cell');

  cells.forEach(cell => {
    const row = +cell.dataset.row;
    const col = +cell.dataset.col;
    const value = currentBoard[row][col];

    if (value !== 0) {
      cell.value = value;
      cell.disabled = true;
      cell.classList.add('prefilled');
      cell.classList.remove('error');
    } else {
      cell.value = '';
      cell.disabled = false;
      cell.classList.remove('prefilled');
      cell.classList.remove('error');
    }
  });
}

function onCellInput(e) {
  const cell = e.target;
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;
  const val = cell.value.trim();

  if (!/^[1-9]$/.test(val)) {
    cell.value = '';
    cell.classList.remove('error');
    currentBoard[row][col] = 0;
    return;
  }

  const num = parseInt(val);
  currentBoard[row][col] = num;

  if (num === solution[row][col]) {
    cell.classList.remove('error');
  } else {
    cell.classList.add('error');
  }
}

function onCellFocus(e) {
  const cell = e.target;
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;

  grid.querySelectorAll('.cell').forEach(other => {
    const r = +other.dataset.row;
    const c = +other.dataset.col;
    if (r === row || c === col) {
      other.classList.add('highlight');
    }
  });
}

function onCellBlur() {
  grid.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('highlight');
  });
}
