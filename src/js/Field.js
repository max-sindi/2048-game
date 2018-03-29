import Cell from './Cell';
import { HorizontalColumn, VerticalColumn } from './Column';

const startCellsAmount = 16;

class GameField {
  constructor(props) {
    this.dom = document.getElementById(props.id);
    this.dom.owner = this;

    const grid = this.grid = {
      top: this.createColumns('horizontal'),
      left: this.createColumns('vertical'),
    };

    // in future will be possibility to restore past state
    if(false) {

    } else {
      this.initNewGrid();
    }
  }

  createColumns(columnsDirection) {
    const columnsArray = [];

    for(let i = 0; i < 4; i++) {
      let column;

      // debugger;
      if(columnsDirection === 'vertical') {
        column = new VerticalColumn({ field: this });
      } else if (columnsDirection === 'horizontal') {
        column = new HorizontalColumn({ field: this });
      }

      columnsArray.push(column);
    }

    return columnsArray;
  }

  initNewGrid() {
    for(let i = 0; i < startCellsAmount; i++) {
      const that = this;
      let cell = new Cell();

      defineCellPosition(this);

      function defineCellPosition() {
        cell.position = getRandomPosition();

        if( isPositionFree(cell.position) ) {
          const { top, left } = cell.position;
          // debugger;
          that.grid.top[top].cells[left] = cell;
          that.grid.left[left].cells[top] = cell;
          cell.horizontalColumn = that.grid.top[top];
          cell.verticalColumn   = that.grid.left[left];
          // debugger;

          applyCellPosition(cell);

          that.dom.appendChild(cell.dom);
        } else {
          defineCellPosition();
        }

        function isPositionFree(position) {
          const { top, left } = position;
          const grid = that.grid;

          // debugger
          if( grid.top[top].cells[left] && grid.top[top].cells[left].isThisCell) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }

  activate() {
    document.body.addEventListener('keydown', keyPressHandler.bind(this));

    function keyPressHandler(e) {
      const field = this;

      if(e.key === 'ArrowUp') {
        moveCells('up');
      } else if(e.key === 'ArrowDown') {
        moveCells('down');
      } else if(e.key === 'ArrowLeft') {
        moveCells('left');
      } else if (e.key === 'ArrowRight') {
        moveCells('right');
      }

      function moveCells(direction) {
        const dir = direction;
        // run throught each column
        if(dir === 'up' || dir === 'down') {
          field.grid.left.forEach( (item, index) => {
            item.tryMoveCells(dir);
          });
        } else if(dir === 'left' || dir === 'right') {
          field.grid.top.forEach( (item, index) => {
            item.tryMoveCells(dir);
          });
        }
      }
    }
  }
};

export default GameField;

function applyCellPosition(cell) {
  const cellCssPosition = {
    top: cell.position.top * 100 + 'px',
    left: cell.position.left * 100 + 'px',
  }
  applyStyles(cell.dom, cellCssPosition);
}

function getRandomPosition() {
  let position = {
    top: getRandomInt(0,4),
    left: getRandomInt(0,4),
  };

  return position;
};

// not including max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function applyStyles(element, stylesObject) {
  // debugger
  for(let key in stylesObject) {
    element.style[key] = stylesObject[key];
  }

  return element;
}
