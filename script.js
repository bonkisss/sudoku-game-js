// Получаем контейнер для игрового поля
const grid = document.getElementById('sudoku-grid');
// тут будет храниться правильная доска
let solution = [];

// Функция: создаёт HTML-ячейки 9x9
function createEmptyGrid() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      // Выделение границ
      if (col % 3 == 0 && col != 0) {
        cell.classList.add('border-left');
      }

      if (row % 3 == 0 && row != 0) {
        cell.classList.add('border-top');
      }

      grid.appendChild(cell);
    }
  }
}


function createEmptyBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++){
      row.push(0);
    }
    board.push(row);
  }

  return board;
}

// Проверяем, можно ли вставить число
function isValid(board, row, col, num) {
  // Проверка строки и столбца
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  // Проверка 3x3 блока
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) {
        return false;
      }
    }
  }

  return true;
}

// Перемешиваем массив чисел 1-9
function shuffle(array) {
  // Перебираем массив с конца
  for (let i = array.length - 1; i > 0; i--) {
    // Выбираем случайный индекс от 0 до i (включительно)
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // Сохраняем текущий элемент
    let current = array[i];

    // Меняем местами текущий элемент и элемент с randomIndex
    array[i] = array[randomIndex];
    array[randomIndex] = current;
  }

  // Возвращаем перемешанный массив
  return array;
}

// Заполняем готовое решение
function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Если ячейка пустая
      if (board[row][col] !== 0) continue;

      // Пробуем вставить числа от 1 до 9 в случайном порядке
      const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      for (let num of numbers) {
        if (!isValid(board, row, col, num)) continue;

        // Ставим число
        board[row][col] = num;

        // Пытаемся заполнить оставшуюся доску
        if (fillBoard(board)) {
          return true;
        }

        // Если дальше не получилось — откатываем
        board[row][col] = 0;
      }

      // Если ни одно число не подошло, возвращаем false
      return false;
    }
  }

  // Если нет пустых ячеек — всё успешно
  return true;
}

function renderBoard(board) {
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const value = board[row][col];

    if (value !== 0) {
      cell.value = value;
      cell.disabled = true;
      cell.classList.add('prefilled');
    } else {

      // Обработка ввода
      cell.addEventListener('input', () => {
        const userValue = parseInt(cell.value);

        if (userValue === solution[row][col]) {
          cell.classList.remove('error'); // правильное — убираем красный
        } else {
          cell.classList.add('error');    // неправильное — красим
        }

        // Если стерли — убираем ошибку
        if (cell.value === '') {
          cell.classList.remove('error');
        }
      });

      cell.addEventListener('focus', () => {
        document.querySelectorAll('.cell').forEach(other => {
          const r = parseInt(other.dataset.row);
          const c = parseInt(other.dataset.col);

          if (r === row || c === col) {
            other.classList.add('highlight');
          }
        })
      })

      cell.addEventListener('blur', () => {
        document.querySelectorAll('.cell').forEach(other => {
          other.classList.remove('highlight');
        });
      });
    }
  });
}


function removeCells(board, count) {
  let removed = 0;

  while (removed < count) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removed++;
    }
  }
}

document.getElementById('new-game').addEventListener('click', () => {
  grid.innerHTML = ''; 
  createEmptyGrid();        

  const newBoard = createEmptyBoard();
  fillBoard(newBoard);
  solution = newBoard.map(row => row.slice());
  removeCells(newBoard, 40);
  renderBoard(newBoard);
});

document.getElementById('clear').addEventListener('click', () => {
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    if (!cell.disabled) {
      cell.value = '';
      cell.classList.remove('error');
    }
  });
});


grid.innerHTML = '';       // очищаем на старте
createEmptyGrid();         // создаём HTML-сетку

const board = createEmptyBoard();
fillBoard(board);
solution = board.map(row => row.slice());
removeCells(board, 40);
renderBoard(board);


