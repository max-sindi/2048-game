class Column {
  constructor(props) {
    const field = this.field = props.field;

    this.cells = [];
    for(let i = 0; i < 4; i++) {
      this.cells.push(false);
    }
  }
};

class VerticalColumn extends Column {

  tryMoveCells(direction) {
    // this.cells.forEach(columnMovingCallback);

    if(direction === 'up') {
      for(let i = 0; i < this.cells.length; i++) {
        columnMovingCallback(this.cells[i], i, this.cells);
      }
    } else if(direction === 'down') {
      // debugger
      for(let i = this.cells.length -1; i >= 0; i--) {
        columnMovingCallback(this.cells[i], i, this.cells);
      }
    }


    function columnMovingCallback(cell, index, columnSells) {
      if( !cell.isThisCell) {
        return;
      }

      let start, end, vector;

      if(direction === 'up') {
        start = 0;
        end = columnSells.length - 1;
        vector = -1;
      } else if(direction === 'down') {
        start = columnSells.length - 1;
        end = 0;
        vector = 1;
      }

      const initialIndex = index;

      tryMove();

      if(initialIndex !== index) {
        applyCellPosition(cell);
      }

      function tryMove() {
        if( index === start ) {
          return;
        }

        if( !columnSells[index + vector].isThisCell ) {
          changeCellPosition();
          tryMove();
        } else if( columnSells[index + vector].isThisCell ) {
          if( tryMergeCells() ) {
            changeCellPosition();
          }
        }

        function tryMergeCells() {
          let value1 = cell.value,
              value2 = cell.verticalColumn.cells[index + vector].value;

          if(value1 === value2) {
            let cellGonnaRemove = cell.verticalColumn.cells[index + vector];
            let {left, top} = cellGonnaRemove.position;

            cellGonnaRemove.dom.remove();

            // breaking binds
            cellGonnaRemove.horizontalColumn.cells[left] = false;
            cellGonnaRemove.verticalColumn.cells[top] = false;

            cell.value *= 2;
            cell.changePointNumber();

            return true;
          } else {
            return false;
          }
        }

        function changeCellPosition() {
          let { left } = cell.position;
          cell.position.top += vector;
          cell.verticalColumn.cells[index] = false;
          cell.horizontalColumn.cells[left] = false;
          index += vector;
          // debugger;
          cell.verticalColumn.cells[index] = cell;
          cell.horizontalColumn = cell.verticalColumn.field.grid.top[index];
          cell.horizontalColumn.cells[left] = cell;
        }
      }
    }
  }
};

class HorizontalColumn extends Column {
  tryMoveCells(direction) {
    // debugger
    if(direction === 'left') {
      for(let i = 0; i < this.cells.length; i++) {
        columnMovingCallback(this.cells[i], i, this.cells);
      }
    } else if(direction === 'right') {
      // debugger
      for(let i = this.cells.length-1; i >= 0; i--) {
        columnMovingCallback(this.cells[i], i, this.cells);
      }
    }

    function columnMovingCallback(cell, index, columnSells) {
      // debugger
      if(!cell.isThisCell) {
        return;
      }

      let start, end, vector;

      if(direction === 'left') {
        start = 0;
        end = columnSells.length - 1;
        vector = -1;
      } else if(direction === 'right') {
        start = columnSells.length - 1;
        end = 0;
        vector = 1;
      }

      const initialIndex = index;

      tryMove();

      if(initialIndex !== index) {
        applyCellPosition(cell);
      }

      function tryMove() {
        if( index === start ) {
          return;
        }

        if( !columnSells[index + vector].isThisCell ) {
          changeCellPosition();
          tryMove();
        } else if( columnSells[index + vector].isThisCell ) {
          if( tryMergeCells() ) {
            changeCellPosition();
          }
        }

        function changeCellPosition() {
          let { top } = cell.position;
          cell.position.left += vector;
          cell.horizontalColumn.cells[index] = false;
          cell.verticalColumn.cells[top] = false;
          index += vector;
          cell.horizontalColumn.cells[index] = cell;
          cell.verticalColumn = cell.horizontalColumn.field.grid.left[index];
          cell.verticalColumn.cells[top] = cell;
        }

        function tryMergeCells() {
          let value1 = cell.value,
              value2 = cell.horizontalColumn.cells[index + vector].value;

          if(value1 === value2) {
            let cellGonnaRemove = cell.horizontalColumn.cells[index + vector];
            let {left, top} = cellGonnaRemove.position;

            cellGonnaRemove.dom.remove();

            // breaking binds
            cellGonnaRemove.horizontalColumn.cells[left] = false;
            cellGonnaRemove.verticalColumn.cells[top] = false;

            cell.value *= 2;
            cell.changePointNumber();

            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
};

export { VerticalColumn, HorizontalColumn };


function applyCellPosition(cell) {
  const cellCssPosition = {
    top: cell.position.top * 100 + 'px',
    left: cell.position.left * 100 + 'px',
  }
  applyStyles(cell.dom, cellCssPosition);
}

function applyStyles(element, stylesObject) {
  for(let key in stylesObject) {
    element.style[key] = stylesObject[key];
  }

  return element;
}
