class Column {
  constructor(props) {
    const field = this.field = props.field;

    this.cells = [];
    for(let i = 0; i < 4; i++) {
      this.cells.push(false);
    }
  }

  tryMoveCells(dir) {
    // depending on direction, passing throught column from start or end of array
    if(dir === 'top' || dir === 'left') {
      for(let i = 0; i < this.cells.length; i++) {
        columnMovingCallback(this.cells[i], dir, i);
      }
    } else if(dir === 'bottom' || dir === 'right') {
      for(let i = this.cells.length -1; i >= 0; i--) {
        columnMovingCallback(this.cells[i], dir, i);
      }
    }

    function columnMovingCallback(cell, direction, index) {
      // debugger;
      if(!cell.isThisCell) {
        return;
      }

      let {top, left} = cell.position,
          start,
          end,
          vector,
          mainColumnLength,
          mainColumn,
          mainCoordinate,
          mainCoordValue,
          mainColumnName,
          oppositeColumnName,
          oppositeColumn,
          oppositeCoordinate,
          oppositeCoordValue,
          orientation,
          oppositeOrientation;

      if(direction === 'left' || direction === 'right') {
        orientation = 'horizontal';
        mainCoordinate = 'left';
        mainColumnName = 'horizontalColumn';
        oppositeOrientation = 'vertical';
        oppositeCoordinate = 'top';
        oppositeColumnName = 'verticalColumn';
      } else if(direction === 'top' || direction === 'bottom') {
        orientation = 'vertical';
        mainCoordinate = 'top';
        mainColumnName = 'verticalColumn';
        oppositeOrientation = 'horizontal';
        oppositeCoordinate = 'left';
        oppositeColumnName = 'horizontalColumn';
      } else {
        console.warn('wrong direction');
      }

      mainColumn = cell[`${orientation}Column`];
      oppositeColumn = cell[`${oppositeOrientation}Column`];
      mainColumnLength = mainColumn.cells.length;
      mainCoordValue = cell.position[mainCoordinate];
      oppositeCoordValue = cell.position[oppositeCoordinate];

      if(direction === 'top' || direction === 'left') {
        start = 0;
        end = mainColumnLength - 1;
        vector = -1;
      } else if(direction === 'bottom' || direction === 'right') {
        start = mainColumnLength - 1;
        end = 0;
        vector = 1;
      }

      const initialIndex = mainCoordValue;

      tryMove();

      if(initialIndex !== mainCoordValue) {
        applyCellPosition(cell);
      }

      function tryMove() {
        if(mainCoordValue === start) {
          return;
        }

        const mainColumnCells = mainColumn.cells;
        const targetPosition = mainColumnCells[mainCoordValue + vector];

        if( !targetPosition.isThisCell ) {
          changeCellPosition();
          tryMove();
        } else if( targetPosition.isThisCell ) {
          if( tryMergeCells() ) {
            changeCellPosition();
          }
        }

        function changeCellPosition() {
          const grid = mainColumn.field.grid;

          // break old chains from columns, because they will be not actual
          cell[mainColumnName].cells[mainCoordValue] = false;
          cell[oppositeColumnName].cells[oppositeCoordValue] = false;

          // change cell's position in main column
          mainCoordValue += vector;
          cell.position[mainCoordinate] = mainCoordValue;

          // create new reverse chains with columns
          // cell's mainColumn was not changed
          cell[mainColumnName].cells[mainCoordValue] = cell;
          cell[oppositeColumnName] = grid[mainCoordinate][mainCoordValue];
          cell[oppositeColumnName].cells[oppositeCoordValue] = cell;
        }

        function tryMergeCells() {
          let targetCell = targetPosition,
              value1 = cell.value,
              value2 = targetCell.value;

          if(value1 === value2) {
            targetCell.dom.remove();

            targetCell[mainColumnName].cells[mainCoordValue] = false;
            targetCell[oppositeColumnName].cells[oppositeCoordValue] = false;

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

function columnMovingCallback(orientation, direction, cell, index) {
  if(!cell.isThisCell) {
    return;
  }

  let {top, left} = cell.position,
      mainColumnLength, start, end, vector, oppositeOrientation,
      mainCoordinate, mainColumn, oppositeColumn;

  if(orientation === 'horizontal') {
    oppositeOrientation = 'vertical';
    mainCoordinate = 'left';
  } else if(orientation === 'vertical') {
    oppositeOrientation = 'horizontal';
    mainCoordinate = 'top';
  } else {
    console.warn('orientation must be only horizontal or vertical');
  }

  mainColumn = cell[`${orientation}Column`];
  oppositeColumn = cell[`${oppositeOrientation}Column`];
  mainColumnLength = mainColumn.cells.length;

  if(direction === 'decrease') {
    start = 0;
    end = mainColumnLength - 1;
    vector = -1;
  } else if(direction === 'increase') {
    start = mainColumnLength - 1;
    end = 0;
    vector = 1;
  } else {
    console.warn('direction must be only decrease or increase');
  }

  const initialIndex = cell.position[mainCoordinate];

  tryMove();

  if(initialIndex !== cell.position[mainCoordinate]) {
    applyCellPosition(cell);
  }

  function tryMove() {
    if(index === start) {
      return;
    }

    const mainColumnCells = mainColumn.cells;
    const targetPosition = mainColumnCells[mainCoordinate + vector];

    if( !targetPosition.isThisCell ) {
      changeCellPosition();
      tryMove();
    } else if( targetPosition.isThisCell ) {
      if( tryMergeCells() ) {
        changeCellPosition();
      }
    }

    function changeCellPosition() {
      const grid = cell[mainColumn].field.grid;
      // get positions = indexes in column
      let mainCoordValue = cell.position[mainCoordinate],
        oppositeCoordValue = cell.position[oppositeCoordinate];

      // break old chains from columns, because they will be not actual
      cell[mainColumn].cells[mainCoordinate] = false;
      cell[oppositeColumn].cells[oppositeCoordinate] = false;

      // change cell's position in main column
      mainCoordValue += vector;
      cell.position[mainCoordinate] = mainCoordValue;

      // create new reverse chains with columns
      // cell's mainColumn was not changed
      cell[mainColumn].cells[mainCoordValue] = cell;
      cell[oppositeColumn] = grid[mainCoordinate][mainCoordValue];
      cell[oppositeColumn].cells[oppositeCoordinate] = cell;
    }

    function tryMergeCells() {
      let targetCell = targetPosition,
          value1 = cell.value,
          value2 = targetCell.value,
          mainCoordValue = cell.position[mainCoordinate],
          oppositeCoordValue = cell.position[oppositeCoordinate];

      if(value1 === value2) {
        targetCell.dom.remove();

        targetCell[mainColumn].cells[mainCoordValue] = false;
        targetCell[oppositeColumn].cells[oppositeCoordValue] = false;

        cell.value *= 2;
        cell.changePointNumber();

        return true;
      } else {
        return false;
      }
    }
  }
}

export  default Column;
