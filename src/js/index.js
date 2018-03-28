'use strict';

import styles from './styles.js';
import GameField from './Field.js';


const field = new GameField({
  id: 'field'
});

field.activate();

// for(let i = 0; i < 4; i++) {
//
//   const cell = new Cell();
//
//   cell.position = getRandomPosition();
//
//   applyStyles(cell, stylesObject)
//
//   field.dom.appendChild(cell);

  // returns random string in form like '1:1' or '2:3' and this is its position
  // in field grid.
  // The first number is top, and the second is left
  // function getRandomPosition() {
  //   let position = `${ '' + getRandomInt(0,4) }:${ '' + getRandomInt(0,4) }`;
  //   // debugger;
  //   return position;
  // };

// }


function applyStyles(element, stylesObject) {
  for(let key in stylesObject) {
    element.styles.key = stylesObject[key];
  }

  return element;
}
//
// // Возвращает случайное целое число между min (включительно) и max (не включая max)
// // Использование метода Math.round() даст вам неравномерное распределение!
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }
