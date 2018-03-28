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
    this.cells.forEach( (cell, index, columnSells) => {
      if( !cell.isThisCell) {
        return;
      }

      const initialIndex = index;

      // debugger
      tryMove();

      if(initialIndex !== index) {
        // console.log(`position changed: was ${initialIndex}, now ${index}` );
        // console.log(item);
        applyCellPosition(cell);
      }

      function tryMove() {
        if( index === 0 ) {
          return;
        }

        if( !columnSells[index-1].isThisCell ) {
          cell.position.top -= 1;
          cell.verticalColumn.cells[index] = false;
          index -= 1;
          cell.verticalColumn.cells[index] = cell;

          tryMove();
        } else if( columnSells[index-1].isThisCell ) {
          tryMergeCells();
          tryMove();
        }

        function tryMergeCells() {
          let value1 = cell.value,
              value2 = cell.verticalColumn.cells[index-1].value;

          if(value1 === value2) {
            // debugger;
            let cellGonnaRemove = cell.verticalColumn.cells[index-1];
            let {left, top} = cellGonnaRemove.position;

            cellGonnaRemove.dom.remove();
            cellGonnaRemove.horizontalColumn.cells[left] = false;
            cellGonnaRemove.verticalColumn.cells[top] = false;

            cell.value *= 2;
            cell.changePointNumber();
          }
        }
      }
    });
  }
};

class HorizontalColumn extends Column {};

export { VerticalColumn, HorizontalColumn };


function applyCellPosition(cell) {
  const cellCssPosition = {
    top: cell.position.top * 100 + 'px',
    left: cell.position.left * 100 + 'px',
  }
  applyStyles(cell.dom, cellCssPosition);
}

function applyStyles(element, stylesObject) {
  // debugger
  for(let key in stylesObject) {
    element.style[key] = stylesObject[key];
  }

  return element;
}
