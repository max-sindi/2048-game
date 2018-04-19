'use strict';

import styles from './styles.js';
import GameField from './Field.js';


let field = new GameField({
  id: 'field'
});

field.activate();

const resetButton = document.createElement('button');
resetButton.innerText = 'Reset Score';
resetButton.classList.add(styles.resetButton);
document.body.appendChild(resetButton);

resetButton.addEventListener('click', resetField,);

function resetField(e) {
  field.dom.innerHTML = '';
  field = new GameField({id: 'field'});
  field.activate();
}

document.body.addEventListener('keypress', (e) => {
  if(e.key === 'q' || e.key === 'й') {
    resetField();
  } else if(e.key === 'f' || e.key === 'а') {
    field.addNewCell();
  }
})

const addCellButton = document.createElement('button');
addCellButton.innerText = 'Add cell';
addCellButton.classList.add(styles.addCellButton);
document.body.appendChild(addCellButton);

addCellButton.addEventListener('click', addCell);

function addCell(e) {
  field.addNewCell();
}
