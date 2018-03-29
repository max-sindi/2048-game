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
