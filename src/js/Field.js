import Cell from './Cell';
import { HorizontalColumn, VerticalColumn } from './Column';

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
    for(let i = 0; i < 4; i++) {
      const that = this;
      let cell = new Cell();
      // cell.position;

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
        moveUp();
      }

      function moveUp() {

        // run throught each column
        field.grid.left.forEach( (item, index) => {
          // debugger
          item.tryMoveCells('up');
        } );
        // for(let i = 0; i < 4; i++) {
        //   // debugger;
        //   const column = that.grid.left[i];
        //   column.tryMove();
        //
        //   // in current column try to move cells
        //   for(let ii = 0; ii < 4; ii++) {
        //     // debugger;
        //     const currentCell = column[ii];
        //
        //     if( currentCell.isThisCell && canMove( column, ii ) ) {
        //       column.move('up');
        //       currentCell.position.top -= 1;
        //       applyCellPosition(currentCell);
        //       column[ii -1] = currentCell;
        //       column[ii] = false;
        //       ii = 0;
        //     } else {
        //       continue;
        //     }
        //   }
        // }

        // function canMove(column, index) {
        //   // debugger
        //   const cell = column[index];
        //   if( index !== 0 && !column[index-1].isThisCell ) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
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
  // `${ '' + getRandomInt(0,4) }:${ '' + getRandomInt(0,4) }`;
  // debugger;
  return position;
};
// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
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
