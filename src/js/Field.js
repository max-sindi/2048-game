import Cell from './Cell';
import Column from './Column';

const startCellsAmount = 4;

class GameField {
  constructor(props) {
    this.dom = document.getElementById(props.id);
    this.dom.owner = this;

    const grid = this.grid = {
      top: this.createColumns(),
      left: this.createColumns(),
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
      let column = new Column({ field: this });
      columnsArray.push(column);
    }

    return columnsArray;
  }

  initNewGrid() {
    for(let i = 0; i < startCellsAmount; i++) {
      this.addNewCell();
    }
  }

  activate() {
    document.body.addEventListener('keydown', keyPressHandler.bind(this));

    function keyPressHandler(e) {
      const field = this;

      if(e.key === 'ArrowUp') {
        moveCells('top');
      } else if(e.key === 'ArrowDown') {
        moveCells('bottom');
      } else if(e.key === 'ArrowLeft') {
        moveCells('left');
      } else if (e.key === 'ArrowRight') {
        moveCells('right');
      }

      function moveCells(direction) {
        const dir = direction;

        // run throught each column
        if(dir === 'top' || dir === 'bottom') {
          field.grid.left.forEach( (item, index) => {
            item.tryMoveCells(dir);
          });
        } else if(dir === 'left' || dir === 'right') {
          field.grid.top.forEach( (item, index) => {
            item.tryMoveCells(dir);
          });
        }

        field.addNewCell();
      }
    }
  }

  addNewCell() {
    const that = this;
    let cell = new Cell();

    defineCellPosition(this);

    function defineCellPosition() {
      cell.position = getRandomPosition();

      if( isPositionFree(cell.position) ) {
        const { top, left } = cell.position;
        that.grid.top[top].cells[left] = cell;
        that.grid.left[left].cells[top] = cell;
        cell.horizontalColumn = that.grid.top[top];
        cell.verticalColumn   = that.grid.left[left];

        applyCellPosition(cell);

        that.dom.appendChild(cell.dom);
      } else {
        defineCellPosition();
      }

      function isPositionFree(position) {
        const { top, left } = position;
        const grid = that.grid;

        if( grid.top[top].cells[left] && grid.top[top].cells[left].isThisCell) {
          return false;
        } else {
          return true;
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
  for(let key in stylesObject) {
    element.style[key] = stylesObject[key];
  }

  return element;
}
