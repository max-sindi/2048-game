import styles from './styles.js';

class Cell {
  constructor(value) {
    this.dom = document.createElement('div');
    this.dom.owner = this;
    this.value = value || 2;
    this.changePointNumber();
    // this.dom.classList.add(styles.fieldCell);
    this.isThisCell = true;

  }

  changePointNumber() {
    const value = this.value;
    this.dom.innerText = value;
    this.dom.classList.add(styles.fieldCell, styles.fieldCell + '-' + value);
  }
}

export default Cell;
