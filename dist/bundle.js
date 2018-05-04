/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Cell.js":
/*!************************!*\
  !*** ./src/js/Cell.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = _interopRequireDefault(__webpack_require__(/*! ./styles.js */ "./src/js/styles.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cell =
/*#__PURE__*/
function () {
  function Cell(value) {
    _classCallCheck(this, Cell);

    this.dom = document.createElement('div');
    this.dom.owner = this;
    this.value = value || 2;
    this.changePointNumber(); // this.dom.classList.add(styles.fieldCell);

    this.isThisCell = true;
  }

  _createClass(Cell, [{
    key: "changePointNumber",
    value: function changePointNumber() {
      var value = this.value;
      this.dom.innerText = value;
      this.dom.classList.add(_styles.default.fieldCell, _styles.default.fieldCell + '-' + value);
    }
  }]);

  return Cell;
}();

var _default = Cell;
exports.default = _default;

/***/ }),

/***/ "./src/js/Column.js":
/*!**************************!*\
  !*** ./src/js/Column.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Column =
/*#__PURE__*/
function () {
  function Column(props) {
    _classCallCheck(this, Column);

    var field = this.field = props.field;
    this.cells = [];

    for (var i = 0; i < 4; i++) {
      this.cells.push(false);
    }
  }

  _createClass(Column, [{
    key: "tryMoveCells",
    value: function tryMoveCells(dir) {
      // depending on direction, passing throught column from start or end of array
      if (dir === 'top' || dir === 'left') {
        for (var i = 0; i < this.cells.length; i++) {
          columnMovingCallback(this.cells[i], dir, i);
        }
      } else if (dir === 'bottom' || dir === 'right') {
        for (var _i = this.cells.length - 1; _i >= 0; _i--) {
          columnMovingCallback(this.cells[_i], dir, _i);
        }
      }

      function columnMovingCallback(cell, direction, index) {
        // debugger;
        if (!cell.isThisCell) {
          return;
        }

        var _cell$position = cell.position,
            top = _cell$position.top,
            left = _cell$position.left,
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

        if (direction === 'left' || direction === 'right') {
          orientation = 'horizontal';
          mainCoordinate = 'left';
          mainColumnName = 'horizontalColumn';
          oppositeOrientation = 'vertical';
          oppositeCoordinate = 'top';
          oppositeColumnName = 'verticalColumn';
        } else if (direction === 'top' || direction === 'bottom') {
          orientation = 'vertical';
          mainCoordinate = 'top';
          mainColumnName = 'verticalColumn';
          oppositeOrientation = 'horizontal';
          oppositeCoordinate = 'left';
          oppositeColumnName = 'horizontalColumn';
        } else {
          console.warn('wrong direction');
        }

        mainColumn = cell["".concat(orientation, "Column")];
        oppositeColumn = cell["".concat(oppositeOrientation, "Column")];
        mainColumnLength = mainColumn.cells.length;
        mainCoordValue = cell.position[mainCoordinate];
        oppositeCoordValue = cell.position[oppositeCoordinate];

        if (direction === 'top' || direction === 'left') {
          start = 0;
          end = mainColumnLength - 1;
          vector = -1;
        } else if (direction === 'bottom' || direction === 'right') {
          start = mainColumnLength - 1;
          end = 0;
          vector = 1;
        }

        var initialIndex = mainCoordValue;
        tryMove();

        if (initialIndex !== mainCoordValue) {
          applyCellPosition(cell);
        }

        function tryMove() {
          if (mainCoordValue === start) {
            return;
          }

          var mainColumnCells = mainColumn.cells;
          var targetPosition = mainColumnCells[mainCoordValue + vector];

          if (!targetPosition.isThisCell) {
            changeCellPosition();
            tryMove();
          } else if (targetPosition.isThisCell) {
            if (tryMergeCells()) {
              changeCellPosition();
            }
          }

          function changeCellPosition() {
            var grid = mainColumn.field.grid; // break old chains from columns, because they will be not actual

            cell[mainColumnName].cells[mainCoordValue] = false;
            cell[oppositeColumnName].cells[oppositeCoordValue] = false; // change cell's position in main column

            mainCoordValue += vector;
            cell.position[mainCoordinate] = mainCoordValue; // create new reverse chains with columns
            // cell's mainColumn was not changed

            cell[mainColumnName].cells[mainCoordValue] = cell;
            cell[oppositeColumnName] = grid[mainCoordinate][mainCoordValue];
            cell[oppositeColumnName].cells[oppositeCoordValue] = cell;
          }

          function tryMergeCells() {
            var targetCell = targetPosition,
                value1 = cell.value,
                value2 = targetCell.value;

            if (value1 === value2) {
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
  }]);

  return Column;
}();

;

function applyCellPosition(cell) {
  var cellCssPosition = {
    top: cell.position.top * 100 + 'px',
    left: cell.position.left * 100 + 'px'
  };
  applyStyles(cell.dom, cellCssPosition);
}

function applyStyles(element, stylesObject) {
  for (var key in stylesObject) {
    element.style[key] = stylesObject[key];
  }

  return element;
}

function columnMovingCallback(orientation, direction, cell, index) {
  if (!cell.isThisCell) {
    return;
  }

  var _cell$position2 = cell.position,
      top = _cell$position2.top,
      left = _cell$position2.left,
      mainColumnLength,
      start,
      end,
      vector,
      oppositeOrientation,
      mainCoordinate,
      mainColumn,
      oppositeColumn;

  if (orientation === 'horizontal') {
    oppositeOrientation = 'vertical';
    mainCoordinate = 'left';
  } else if (orientation === 'vertical') {
    oppositeOrientation = 'horizontal';
    mainCoordinate = 'top';
  } else {
    console.warn('orientation must be only horizontal or vertical');
  }

  mainColumn = cell["".concat(orientation, "Column")];
  oppositeColumn = cell["".concat(oppositeOrientation, "Column")];
  mainColumnLength = mainColumn.cells.length;

  if (direction === 'decrease') {
    start = 0;
    end = mainColumnLength - 1;
    vector = -1;
  } else if (direction === 'increase') {
    start = mainColumnLength - 1;
    end = 0;
    vector = 1;
  } else {
    console.warn('direction must be only decrease or increase');
  }

  var initialIndex = cell.position[mainCoordinate];
  tryMove();

  if (initialIndex !== cell.position[mainCoordinate]) {
    applyCellPosition(cell);
  }

  function tryMove() {
    if (index === start) {
      return;
    }

    var mainColumnCells = mainColumn.cells;
    var targetPosition = mainColumnCells[mainCoordinate + vector];

    if (!targetPosition.isThisCell) {
      changeCellPosition();
      tryMove();
    } else if (targetPosition.isThisCell) {
      if (tryMergeCells()) {
        changeCellPosition();
      }
    }

    function changeCellPosition() {
      var grid = cell[mainColumn].field.grid; // get positions = indexes in column

      var mainCoordValue = cell.position[mainCoordinate],
          oppositeCoordValue = cell.position[oppositeCoordinate]; // break old chains from columns, because they will be not actual

      cell[mainColumn].cells[mainCoordinate] = false;
      cell[oppositeColumn].cells[oppositeCoordinate] = false; // change cell's position in main column

      mainCoordValue += vector;
      cell.position[mainCoordinate] = mainCoordValue; // create new reverse chains with columns
      // cell's mainColumn was not changed

      cell[mainColumn].cells[mainCoordValue] = cell;
      cell[oppositeColumn] = grid[mainCoordinate][mainCoordValue];
      cell[oppositeColumn].cells[oppositeCoordinate] = cell;
    }

    function tryMergeCells() {
      var targetCell = targetPosition,
          value1 = cell.value,
          value2 = targetCell.value,
          mainCoordValue = cell.position[mainCoordinate],
          oppositeCoordValue = cell.position[oppositeCoordinate];

      if (value1 === value2) {
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

var _default = Column;
exports.default = _default;

/***/ }),

/***/ "./src/js/Field.js":
/*!*************************!*\
  !*** ./src/js/Field.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cell = _interopRequireDefault(__webpack_require__(/*! ./Cell */ "./src/js/Cell.js"));

var _Column = _interopRequireDefault(__webpack_require__(/*! ./Column */ "./src/js/Column.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var startCellsAmount = 4;

var GameField =
/*#__PURE__*/
function () {
  function GameField(props) {
    _classCallCheck(this, GameField);

    this.dom = document.getElementById(props.id);
    this.dom.owner = this;
    var grid = this.grid = {
      top: this.createColumns(),
      left: this.createColumns()
    }; // in future will be possibility to restore past state

    if (false) {} else {
      this.initNewGrid();
    }
  }

  _createClass(GameField, [{
    key: "createColumns",
    value: function createColumns(columnsDirection) {
      var columnsArray = [];

      for (var i = 0; i < 4; i++) {
        var column = new _Column.default({
          field: this
        });
        columnsArray.push(column);
      }

      return columnsArray;
    }
  }, {
    key: "initNewGrid",
    value: function initNewGrid() {
      for (var i = 0; i < startCellsAmount; i++) {
        this.addNewCell();
      }
    }
  }, {
    key: "activate",
    value: function activate() {
      document.body.addEventListener('keydown', keyPressHandler.bind(this));

      function keyPressHandler(e) {
        var field = this;

        if (e.key === 'ArrowUp') {
          moveCells('top');
        } else if (e.key === 'ArrowDown') {
          moveCells('bottom');
        } else if (e.key === 'ArrowLeft') {
          moveCells('left');
        } else if (e.key === 'ArrowRight') {
          moveCells('right');
        }

        function moveCells(direction) {
          var dir = direction; // run throught each column

          if (dir === 'top' || dir === 'bottom') {
            field.grid.left.forEach(function (item, index) {
              item.tryMoveCells(dir);
            });
          } else if (dir === 'left' || dir === 'right') {
            field.grid.top.forEach(function (item, index) {
              item.tryMoveCells(dir);
            });
          }

          field.addNewCell();
        }
      }
    }
  }, {
    key: "addNewCell",
    value: function addNewCell() {
      var that = this;
      var cell = new _Cell.default();
      defineCellPosition(this);

      function defineCellPosition() {
        cell.position = getRandomPosition();

        if (isPositionFree(cell.position)) {
          var _cell$position = cell.position,
              top = _cell$position.top,
              left = _cell$position.left;
          that.grid.top[top].cells[left] = cell;
          that.grid.left[left].cells[top] = cell;
          cell.horizontalColumn = that.grid.top[top];
          cell.verticalColumn = that.grid.left[left];
          applyCellPosition(cell);
          that.dom.appendChild(cell.dom);
        } else {
          defineCellPosition();
        }

        function isPositionFree(position) {
          var top = position.top,
              left = position.left;
          var grid = that.grid;

          if (grid.top[top].cells[left] && grid.top[top].cells[left].isThisCell) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }]);

  return GameField;
}();

;
var _default = GameField;
exports.default = _default;

function applyCellPosition(cell) {
  var cellCssPosition = {
    top: cell.position.top * 100 + 'px',
    left: cell.position.left * 100 + 'px'
  };
  applyStyles(cell.dom, cellCssPosition);
}

function getRandomPosition() {
  var position = {
    top: getRandomInt(0, 4),
    left: getRandomInt(0, 4)
  };
  return position;
}

; // not including max

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function applyStyles(element, stylesObject) {
  for (var key in stylesObject) {
    element.style[key] = stylesObject[key];
  }

  return element;
}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _styles = _interopRequireDefault(__webpack_require__(/*! ./styles.js */ "./src/js/styles.js"));

var _Field = _interopRequireDefault(__webpack_require__(/*! ./Field.js */ "./src/js/Field.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var field = new _Field.default({
  id: 'field'
});
field.activate();
var resetButton = document.createElement('button');
resetButton.innerText = 'Reset Score';
resetButton.classList.add(_styles.default.resetButton);
document.body.appendChild(resetButton);
resetButton.addEventListener('click', resetField);

function resetField(e) {
  field.dom.innerHTML = '';
  field = new _Field.default({
    id: 'field'
  });
  field.activate();
}

document.body.addEventListener('keypress', function (e) {
  if (e.key === 'q' || e.key === 'й') {
    resetField();
  } else if (e.key === 'f' || e.key === 'а') {
    field.addNewCell();
  }
});
var addCellButton = document.createElement('button');
addCellButton.innerText = 'Add cell';
addCellButton.classList.add(_styles.default.addCellButton);
document.body.appendChild(addCellButton);
addCellButton.addEventListener('click', addCell);

function addCell(e) {
  field.addNewCell();
}

/***/ }),

/***/ "./src/js/styles.js":
/*!**************************!*\
  !*** ./src/js/styles.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var styles = {
  fieldCell: 'field__cell',
  resetButton: 'field__reset-button',
  addCellButton: 'field__add-button'
};
var _default = styles;
exports.default = _default;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0NvbHVtbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvRmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdHlsZXMuanMiXSwibmFtZXMiOlsiQ2VsbCIsInZhbHVlIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwib3duZXIiLCJjaGFuZ2VQb2ludE51bWJlciIsImlzVGhpc0NlbGwiLCJpbm5lclRleHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZXMiLCJmaWVsZENlbGwiLCJDb2x1bW4iLCJwcm9wcyIsImZpZWxkIiwiY2VsbHMiLCJpIiwicHVzaCIsImRpciIsImxlbmd0aCIsImNvbHVtbk1vdmluZ0NhbGxiYWNrIiwiY2VsbCIsImRpcmVjdGlvbiIsImluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0Iiwic3RhcnQiLCJlbmQiLCJ2ZWN0b3IiLCJtYWluQ29sdW1uTGVuZ3RoIiwibWFpbkNvbHVtbiIsIm1haW5Db29yZGluYXRlIiwibWFpbkNvb3JkVmFsdWUiLCJtYWluQ29sdW1uTmFtZSIsIm9wcG9zaXRlQ29sdW1uTmFtZSIsIm9wcG9zaXRlQ29sdW1uIiwib3Bwb3NpdGVDb29yZGluYXRlIiwib3Bwb3NpdGVDb29yZFZhbHVlIiwib3JpZW50YXRpb24iLCJvcHBvc2l0ZU9yaWVudGF0aW9uIiwiY29uc29sZSIsIndhcm4iLCJpbml0aWFsSW5kZXgiLCJ0cnlNb3ZlIiwiYXBwbHlDZWxsUG9zaXRpb24iLCJtYWluQ29sdW1uQ2VsbHMiLCJ0YXJnZXRQb3NpdGlvbiIsImNoYW5nZUNlbGxQb3NpdGlvbiIsInRyeU1lcmdlQ2VsbHMiLCJncmlkIiwidGFyZ2V0Q2VsbCIsInZhbHVlMSIsInZhbHVlMiIsInJlbW92ZSIsImNlbGxDc3NQb3NpdGlvbiIsImFwcGx5U3R5bGVzIiwiZWxlbWVudCIsInN0eWxlc09iamVjdCIsImtleSIsInN0eWxlIiwic3RhcnRDZWxsc0Ftb3VudCIsIkdhbWVGaWVsZCIsImdldEVsZW1lbnRCeUlkIiwiaWQiLCJjcmVhdGVDb2x1bW5zIiwiaW5pdE5ld0dyaWQiLCJjb2x1bW5zRGlyZWN0aW9uIiwiY29sdW1uc0FycmF5IiwiY29sdW1uIiwiYWRkTmV3Q2VsbCIsImJvZHkiLCJhZGRFdmVudExpc3RlbmVyIiwia2V5UHJlc3NIYW5kbGVyIiwiYmluZCIsImUiLCJtb3ZlQ2VsbHMiLCJmb3JFYWNoIiwiaXRlbSIsInRyeU1vdmVDZWxscyIsInRoYXQiLCJkZWZpbmVDZWxsUG9zaXRpb24iLCJnZXRSYW5kb21Qb3NpdGlvbiIsImlzUG9zaXRpb25GcmVlIiwiaG9yaXpvbnRhbENvbHVtbiIsInZlcnRpY2FsQ29sdW1uIiwiYXBwZW5kQ2hpbGQiLCJnZXRSYW5kb21JbnQiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhY3RpdmF0ZSIsInJlc2V0QnV0dG9uIiwicmVzZXRGaWVsZCIsImlubmVySFRNTCIsImFkZENlbGxCdXR0b24iLCJhZGRDZWxsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FB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Z0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MwQixPQUF4Qzs7QUFFQSxTQUFTQSxPQUFULENBQWlCdkIsQ0FBakIsRUFBb0I7QUFDbEI3RCxRQUFNd0QsVUFBTjtBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDRCxJQUFNNUQsU0FBUztBQUNkQyxhQUFXLGFBREc7QUFFYm1GLGVBQWEscUJBRkE7QUFHYkcsaUJBQWU7QUFIRixDQUFmO2VBTWV2RixNIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMuanMnO1xuXG5jbGFzcyBDZWxsIHtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZG9tLm93bmVyID0gdGhpcztcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgfHwgMjtcbiAgICB0aGlzLmNoYW5nZVBvaW50TnVtYmVyKCk7XG4gICAgLy8gdGhpcy5kb20uY2xhc3NMaXN0LmFkZChzdHlsZXMuZmllbGRDZWxsKTtcbiAgICB0aGlzLmlzVGhpc0NlbGwgPSB0cnVlO1xuXG4gIH1cblxuICBjaGFuZ2VQb2ludE51bWJlcigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy5kb20uaW5uZXJUZXh0ID0gdmFsdWU7XG4gICAgdGhpcy5kb20uY2xhc3NMaXN0LmFkZChzdHlsZXMuZmllbGRDZWxsLCBzdHlsZXMuZmllbGRDZWxsICsgJy0nICsgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENlbGw7XG4iLCJjbGFzcyBDb2x1bW4ge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZCA9IHByb3BzLmZpZWxkO1xuXG4gICAgdGhpcy5jZWxscyA9IFtdO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIHRoaXMuY2VsbHMucHVzaChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgdHJ5TW92ZUNlbGxzKGRpcikge1xuICAgIC8vIGRlcGVuZGluZyBvbiBkaXJlY3Rpb24sIHBhc3NpbmcgdGhyb3VnaHQgY29sdW1uIGZyb20gc3RhcnQgb3IgZW5kIG9mIGFycmF5XG4gICAgaWYoZGlyID09PSAndG9wJyB8fCBkaXIgPT09ICdsZWZ0Jykge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29sdW1uTW92aW5nQ2FsbGJhY2sodGhpcy5jZWxsc1tpXSwgZGlyLCBpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoZGlyID09PSAnYm90dG9tJyB8fCBkaXIgPT09ICdyaWdodCcpIHtcbiAgICAgIGZvcihsZXQgaSA9IHRoaXMuY2VsbHMubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb2x1bW5Nb3ZpbmdDYWxsYmFjayh0aGlzLmNlbGxzW2ldLCBkaXIsIGkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbHVtbk1vdmluZ0NhbGxiYWNrKGNlbGwsIGRpcmVjdGlvbiwgaW5kZXgpIHtcbiAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgaWYoIWNlbGwuaXNUaGlzQ2VsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCB7dG9wLCBsZWZ0fSA9IGNlbGwucG9zaXRpb24sXG4gICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgZW5kLFxuICAgICAgICAgIHZlY3RvcixcbiAgICAgICAgICBtYWluQ29sdW1uTGVuZ3RoLFxuICAgICAgICAgIG1haW5Db2x1bW4sXG4gICAgICAgICAgbWFpbkNvb3JkaW5hdGUsXG4gICAgICAgICAgbWFpbkNvb3JkVmFsdWUsXG4gICAgICAgICAgbWFpbkNvbHVtbk5hbWUsXG4gICAgICAgICAgb3Bwb3NpdGVDb2x1bW5OYW1lLFxuICAgICAgICAgIG9wcG9zaXRlQ29sdW1uLFxuICAgICAgICAgIG9wcG9zaXRlQ29vcmRpbmF0ZSxcbiAgICAgICAgICBvcHBvc2l0ZUNvb3JkVmFsdWUsXG4gICAgICAgICAgb3JpZW50YXRpb24sXG4gICAgICAgICAgb3Bwb3NpdGVPcmllbnRhdGlvbjtcblxuICAgICAgaWYoZGlyZWN0aW9uID09PSAnbGVmdCcgfHwgZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgIG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgICBtYWluQ29vcmRpbmF0ZSA9ICdsZWZ0JztcbiAgICAgICAgbWFpbkNvbHVtbk5hbWUgPSAnaG9yaXpvbnRhbENvbHVtbic7XG4gICAgICAgIG9wcG9zaXRlT3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgICBvcHBvc2l0ZUNvb3JkaW5hdGUgPSAndG9wJztcbiAgICAgICAgb3Bwb3NpdGVDb2x1bW5OYW1lID0gJ3ZlcnRpY2FsQ29sdW1uJztcbiAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICd0b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgICBtYWluQ29vcmRpbmF0ZSA9ICd0b3AnO1xuICAgICAgICBtYWluQ29sdW1uTmFtZSA9ICd2ZXJ0aWNhbENvbHVtbic7XG4gICAgICAgIG9wcG9zaXRlT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIG9wcG9zaXRlQ29vcmRpbmF0ZSA9ICdsZWZ0JztcbiAgICAgICAgb3Bwb3NpdGVDb2x1bW5OYW1lID0gJ2hvcml6b250YWxDb2x1bW4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCd3cm9uZyBkaXJlY3Rpb24nKTtcbiAgICAgIH1cblxuICAgICAgbWFpbkNvbHVtbiA9IGNlbGxbYCR7b3JpZW50YXRpb259Q29sdW1uYF07XG4gICAgICBvcHBvc2l0ZUNvbHVtbiA9IGNlbGxbYCR7b3Bwb3NpdGVPcmllbnRhdGlvbn1Db2x1bW5gXTtcbiAgICAgIG1haW5Db2x1bW5MZW5ndGggPSBtYWluQ29sdW1uLmNlbGxzLmxlbmd0aDtcbiAgICAgIG1haW5Db29yZFZhbHVlID0gY2VsbC5wb3NpdGlvblttYWluQ29vcmRpbmF0ZV07XG4gICAgICBvcHBvc2l0ZUNvb3JkVmFsdWUgPSBjZWxsLnBvc2l0aW9uW29wcG9zaXRlQ29vcmRpbmF0ZV07XG5cbiAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ3RvcCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgc3RhcnQgPSAwO1xuICAgICAgICBlbmQgPSBtYWluQ29sdW1uTGVuZ3RoIC0gMTtcbiAgICAgICAgdmVjdG9yID0gLTE7XG4gICAgICB9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAnYm90dG9tJyB8fCBkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgc3RhcnQgPSBtYWluQ29sdW1uTGVuZ3RoIC0gMTtcbiAgICAgICAgZW5kID0gMDtcbiAgICAgICAgdmVjdG9yID0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5pdGlhbEluZGV4ID0gbWFpbkNvb3JkVmFsdWU7XG5cbiAgICAgIHRyeU1vdmUoKTtcblxuICAgICAgaWYoaW5pdGlhbEluZGV4ICE9PSBtYWluQ29vcmRWYWx1ZSkge1xuICAgICAgICBhcHBseUNlbGxQb3NpdGlvbihjZWxsKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdHJ5TW92ZSgpIHtcbiAgICAgICAgaWYobWFpbkNvb3JkVmFsdWUgPT09IHN0YXJ0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFpbkNvbHVtbkNlbGxzID0gbWFpbkNvbHVtbi5jZWxscztcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBtYWluQ29sdW1uQ2VsbHNbbWFpbkNvb3JkVmFsdWUgKyB2ZWN0b3JdO1xuXG4gICAgICAgIGlmKCAhdGFyZ2V0UG9zaXRpb24uaXNUaGlzQ2VsbCApIHtcbiAgICAgICAgICBjaGFuZ2VDZWxsUG9zaXRpb24oKTtcbiAgICAgICAgICB0cnlNb3ZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiggdGFyZ2V0UG9zaXRpb24uaXNUaGlzQ2VsbCApIHtcbiAgICAgICAgICBpZiggdHJ5TWVyZ2VDZWxscygpICkge1xuICAgICAgICAgICAgY2hhbmdlQ2VsbFBvc2l0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQ2VsbFBvc2l0aW9uKCkge1xuICAgICAgICAgIGNvbnN0IGdyaWQgPSBtYWluQ29sdW1uLmZpZWxkLmdyaWQ7XG5cbiAgICAgICAgICAvLyBicmVhayBvbGQgY2hhaW5zIGZyb20gY29sdW1ucywgYmVjYXVzZSB0aGV5IHdpbGwgYmUgbm90IGFjdHVhbFxuICAgICAgICAgIGNlbGxbbWFpbkNvbHVtbk5hbWVdLmNlbGxzW21haW5Db29yZFZhbHVlXSA9IGZhbHNlO1xuICAgICAgICAgIGNlbGxbb3Bwb3NpdGVDb2x1bW5OYW1lXS5jZWxsc1tvcHBvc2l0ZUNvb3JkVmFsdWVdID0gZmFsc2U7XG5cbiAgICAgICAgICAvLyBjaGFuZ2UgY2VsbCdzIHBvc2l0aW9uIGluIG1haW4gY29sdW1uXG4gICAgICAgICAgbWFpbkNvb3JkVmFsdWUgKz0gdmVjdG9yO1xuICAgICAgICAgIGNlbGwucG9zaXRpb25bbWFpbkNvb3JkaW5hdGVdID0gbWFpbkNvb3JkVmFsdWU7XG5cbiAgICAgICAgICAvLyBjcmVhdGUgbmV3IHJldmVyc2UgY2hhaW5zIHdpdGggY29sdW1uc1xuICAgICAgICAgIC8vIGNlbGwncyBtYWluQ29sdW1uIHdhcyBub3QgY2hhbmdlZFxuICAgICAgICAgIGNlbGxbbWFpbkNvbHVtbk5hbWVdLmNlbGxzW21haW5Db29yZFZhbHVlXSA9IGNlbGw7XG4gICAgICAgICAgY2VsbFtvcHBvc2l0ZUNvbHVtbk5hbWVdID0gZ3JpZFttYWluQ29vcmRpbmF0ZV1bbWFpbkNvb3JkVmFsdWVdO1xuICAgICAgICAgIGNlbGxbb3Bwb3NpdGVDb2x1bW5OYW1lXS5jZWxsc1tvcHBvc2l0ZUNvb3JkVmFsdWVdID0gY2VsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRyeU1lcmdlQ2VsbHMoKSB7XG4gICAgICAgICAgbGV0IHRhcmdldENlbGwgPSB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgICAgdmFsdWUxID0gY2VsbC52YWx1ZSxcbiAgICAgICAgICAgICAgdmFsdWUyID0gdGFyZ2V0Q2VsbC52YWx1ZTtcblxuICAgICAgICAgIGlmKHZhbHVlMSA9PT0gdmFsdWUyKSB7XG4gICAgICAgICAgICB0YXJnZXRDZWxsLmRvbS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgdGFyZ2V0Q2VsbFttYWluQ29sdW1uTmFtZV0uY2VsbHNbbWFpbkNvb3JkVmFsdWVdID0gZmFsc2U7XG4gICAgICAgICAgICB0YXJnZXRDZWxsW29wcG9zaXRlQ29sdW1uTmFtZV0uY2VsbHNbb3Bwb3NpdGVDb29yZFZhbHVlXSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjZWxsLnZhbHVlICo9IDI7XG4gICAgICAgICAgICBjZWxsLmNoYW5nZVBvaW50TnVtYmVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBhcHBseUNlbGxQb3NpdGlvbihjZWxsKSB7XG4gIGNvbnN0IGNlbGxDc3NQb3NpdGlvbiA9IHtcbiAgICB0b3A6IGNlbGwucG9zaXRpb24udG9wICogMTAwICsgJ3B4JyxcbiAgICBsZWZ0OiBjZWxsLnBvc2l0aW9uLmxlZnQgKiAxMDAgKyAncHgnLFxuICB9XG4gIGFwcGx5U3R5bGVzKGNlbGwuZG9tLCBjZWxsQ3NzUG9zaXRpb24pO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhlbGVtZW50LCBzdHlsZXNPYmplY3QpIHtcbiAgZm9yKGxldCBrZXkgaW4gc3R5bGVzT2JqZWN0KSB7XG4gICAgZWxlbWVudC5zdHlsZVtrZXldID0gc3R5bGVzT2JqZWN0W2tleV07XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY29sdW1uTW92aW5nQ2FsbGJhY2sob3JpZW50YXRpb24sIGRpcmVjdGlvbiwgY2VsbCwgaW5kZXgpIHtcbiAgaWYoIWNlbGwuaXNUaGlzQ2VsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB7dG9wLCBsZWZ0fSA9IGNlbGwucG9zaXRpb24sXG4gICAgICBtYWluQ29sdW1uTGVuZ3RoLCBzdGFydCwgZW5kLCB2ZWN0b3IsIG9wcG9zaXRlT3JpZW50YXRpb24sXG4gICAgICBtYWluQ29vcmRpbmF0ZSwgbWFpbkNvbHVtbiwgb3Bwb3NpdGVDb2x1bW47XG5cbiAgaWYob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgIG9wcG9zaXRlT3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgIG1haW5Db29yZGluYXRlID0gJ2xlZnQnO1xuICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICBvcHBvc2l0ZU9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIG1haW5Db29yZGluYXRlID0gJ3RvcCc7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdvcmllbnRhdGlvbiBtdXN0IGJlIG9ubHkgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCcpO1xuICB9XG5cbiAgbWFpbkNvbHVtbiA9IGNlbGxbYCR7b3JpZW50YXRpb259Q29sdW1uYF07XG4gIG9wcG9zaXRlQ29sdW1uID0gY2VsbFtgJHtvcHBvc2l0ZU9yaWVudGF0aW9ufUNvbHVtbmBdO1xuICBtYWluQ29sdW1uTGVuZ3RoID0gbWFpbkNvbHVtbi5jZWxscy5sZW5ndGg7XG5cbiAgaWYoZGlyZWN0aW9uID09PSAnZGVjcmVhc2UnKSB7XG4gICAgc3RhcnQgPSAwO1xuICAgIGVuZCA9IG1haW5Db2x1bW5MZW5ndGggLSAxO1xuICAgIHZlY3RvciA9IC0xO1xuICB9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAnaW5jcmVhc2UnKSB7XG4gICAgc3RhcnQgPSBtYWluQ29sdW1uTGVuZ3RoIC0gMTtcbiAgICBlbmQgPSAwO1xuICAgIHZlY3RvciA9IDE7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdkaXJlY3Rpb24gbXVzdCBiZSBvbmx5IGRlY3JlYXNlIG9yIGluY3JlYXNlJyk7XG4gIH1cblxuICBjb25zdCBpbml0aWFsSW5kZXggPSBjZWxsLnBvc2l0aW9uW21haW5Db29yZGluYXRlXTtcblxuICB0cnlNb3ZlKCk7XG5cbiAgaWYoaW5pdGlhbEluZGV4ICE9PSBjZWxsLnBvc2l0aW9uW21haW5Db29yZGluYXRlXSkge1xuICAgIGFwcGx5Q2VsbFBvc2l0aW9uKGNlbGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5TW92ZSgpIHtcbiAgICBpZihpbmRleCA9PT0gc3RhcnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYWluQ29sdW1uQ2VsbHMgPSBtYWluQ29sdW1uLmNlbGxzO1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gbWFpbkNvbHVtbkNlbGxzW21haW5Db29yZGluYXRlICsgdmVjdG9yXTtcblxuICAgIGlmKCAhdGFyZ2V0UG9zaXRpb24uaXNUaGlzQ2VsbCApIHtcbiAgICAgIGNoYW5nZUNlbGxQb3NpdGlvbigpO1xuICAgICAgdHJ5TW92ZSgpO1xuICAgIH0gZWxzZSBpZiggdGFyZ2V0UG9zaXRpb24uaXNUaGlzQ2VsbCApIHtcbiAgICAgIGlmKCB0cnlNZXJnZUNlbGxzKCkgKSB7XG4gICAgICAgIGNoYW5nZUNlbGxQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZUNlbGxQb3NpdGlvbigpIHtcbiAgICAgIGNvbnN0IGdyaWQgPSBjZWxsW21haW5Db2x1bW5dLmZpZWxkLmdyaWQ7XG4gICAgICAvLyBnZXQgcG9zaXRpb25zID0gaW5kZXhlcyBpbiBjb2x1bW5cbiAgICAgIGxldCBtYWluQ29vcmRWYWx1ZSA9IGNlbGwucG9zaXRpb25bbWFpbkNvb3JkaW5hdGVdLFxuICAgICAgICBvcHBvc2l0ZUNvb3JkVmFsdWUgPSBjZWxsLnBvc2l0aW9uW29wcG9zaXRlQ29vcmRpbmF0ZV07XG5cbiAgICAgIC8vIGJyZWFrIG9sZCBjaGFpbnMgZnJvbSBjb2x1bW5zLCBiZWNhdXNlIHRoZXkgd2lsbCBiZSBub3QgYWN0dWFsXG4gICAgICBjZWxsW21haW5Db2x1bW5dLmNlbGxzW21haW5Db29yZGluYXRlXSA9IGZhbHNlO1xuICAgICAgY2VsbFtvcHBvc2l0ZUNvbHVtbl0uY2VsbHNbb3Bwb3NpdGVDb29yZGluYXRlXSA9IGZhbHNlO1xuXG4gICAgICAvLyBjaGFuZ2UgY2VsbCdzIHBvc2l0aW9uIGluIG1haW4gY29sdW1uXG4gICAgICBtYWluQ29vcmRWYWx1ZSArPSB2ZWN0b3I7XG4gICAgICBjZWxsLnBvc2l0aW9uW21haW5Db29yZGluYXRlXSA9IG1haW5Db29yZFZhbHVlO1xuXG4gICAgICAvLyBjcmVhdGUgbmV3IHJldmVyc2UgY2hhaW5zIHdpdGggY29sdW1uc1xuICAgICAgLy8gY2VsbCdzIG1haW5Db2x1bW4gd2FzIG5vdCBjaGFuZ2VkXG4gICAgICBjZWxsW21haW5Db2x1bW5dLmNlbGxzW21haW5Db29yZFZhbHVlXSA9IGNlbGw7XG4gICAgICBjZWxsW29wcG9zaXRlQ29sdW1uXSA9IGdyaWRbbWFpbkNvb3JkaW5hdGVdW21haW5Db29yZFZhbHVlXTtcbiAgICAgIGNlbGxbb3Bwb3NpdGVDb2x1bW5dLmNlbGxzW29wcG9zaXRlQ29vcmRpbmF0ZV0gPSBjZWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyeU1lcmdlQ2VsbHMoKSB7XG4gICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRhcmdldFBvc2l0aW9uLFxuICAgICAgICAgIHZhbHVlMSA9IGNlbGwudmFsdWUsXG4gICAgICAgICAgdmFsdWUyID0gdGFyZ2V0Q2VsbC52YWx1ZSxcbiAgICAgICAgICBtYWluQ29vcmRWYWx1ZSA9IGNlbGwucG9zaXRpb25bbWFpbkNvb3JkaW5hdGVdLFxuICAgICAgICAgIG9wcG9zaXRlQ29vcmRWYWx1ZSA9IGNlbGwucG9zaXRpb25bb3Bwb3NpdGVDb29yZGluYXRlXTtcblxuICAgICAgaWYodmFsdWUxID09PSB2YWx1ZTIpIHtcbiAgICAgICAgdGFyZ2V0Q2VsbC5kb20ucmVtb3ZlKCk7XG5cbiAgICAgICAgdGFyZ2V0Q2VsbFttYWluQ29sdW1uXS5jZWxsc1ttYWluQ29vcmRWYWx1ZV0gPSBmYWxzZTtcbiAgICAgICAgdGFyZ2V0Q2VsbFtvcHBvc2l0ZUNvbHVtbl0uY2VsbHNbb3Bwb3NpdGVDb29yZFZhbHVlXSA9IGZhbHNlO1xuXG4gICAgICAgIGNlbGwudmFsdWUgKj0gMjtcbiAgICAgICAgY2VsbC5jaGFuZ2VQb2ludE51bWJlcigpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgIGRlZmF1bHQgQ29sdW1uO1xuIiwiaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBDb2x1bW4gZnJvbSAnLi9Db2x1bW4nO1xuXG5jb25zdCBzdGFydENlbGxzQW1vdW50ID0gNDtcblxuY2xhc3MgR2FtZUZpZWxkIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb3BzLmlkKTtcbiAgICB0aGlzLmRvbS5vd25lciA9IHRoaXM7XG5cbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkID0ge1xuICAgICAgdG9wOiB0aGlzLmNyZWF0ZUNvbHVtbnMoKSxcbiAgICAgIGxlZnQ6IHRoaXMuY3JlYXRlQ29sdW1ucygpLFxuICAgIH07XG5cbiAgICAvLyBpbiBmdXR1cmUgd2lsbCBiZSBwb3NzaWJpbGl0eSB0byByZXN0b3JlIHBhc3Qgc3RhdGVcbiAgICBpZihmYWxzZSkge1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdE5ld0dyaWQoKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDb2x1bW5zKGNvbHVtbnNEaXJlY3Rpb24pIHtcbiAgICBjb25zdCBjb2x1bW5zQXJyYXkgPSBbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGxldCBjb2x1bW4gPSBuZXcgQ29sdW1uKHsgZmllbGQ6IHRoaXMgfSk7XG4gICAgICBjb2x1bW5zQXJyYXkucHVzaChjb2x1bW4pO1xuICAgIH1cblxuICAgIHJldHVybiBjb2x1bW5zQXJyYXk7XG4gIH1cblxuICBpbml0TmV3R3JpZCgpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RhcnRDZWxsc0Ftb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZE5ld0NlbGwoKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlQcmVzc0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBmdW5jdGlvbiBrZXlQcmVzc0hhbmRsZXIoZSkge1xuICAgICAgY29uc3QgZmllbGQgPSB0aGlzO1xuXG4gICAgICBpZihlLmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIG1vdmVDZWxscygndG9wJyk7XG4gICAgICB9IGVsc2UgaWYoZS5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgIG1vdmVDZWxscygnYm90dG9tJyk7XG4gICAgICB9IGVsc2UgaWYoZS5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgIG1vdmVDZWxscygnbGVmdCcpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgIG1vdmVDZWxscygncmlnaHQnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbW92ZUNlbGxzKGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBkaXIgPSBkaXJlY3Rpb247XG5cbiAgICAgICAgLy8gcnVuIHRocm91Z2h0IGVhY2ggY29sdW1uXG4gICAgICAgIGlmKGRpciA9PT0gJ3RvcCcgfHwgZGlyID09PSAnYm90dG9tJykge1xuICAgICAgICAgIGZpZWxkLmdyaWQubGVmdC5mb3JFYWNoKCAoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0udHJ5TW92ZUNlbGxzKGRpcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZihkaXIgPT09ICdsZWZ0JyB8fCBkaXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBmaWVsZC5ncmlkLnRvcC5mb3JFYWNoKCAoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0udHJ5TW92ZUNlbGxzKGRpcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZC5hZGROZXdDZWxsKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkTmV3Q2VsbCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgY2VsbCA9IG5ldyBDZWxsKCk7XG5cbiAgICBkZWZpbmVDZWxsUG9zaXRpb24odGhpcyk7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVDZWxsUG9zaXRpb24oKSB7XG4gICAgICBjZWxsLnBvc2l0aW9uID0gZ2V0UmFuZG9tUG9zaXRpb24oKTtcblxuICAgICAgaWYoIGlzUG9zaXRpb25GcmVlKGNlbGwucG9zaXRpb24pICkge1xuICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gY2VsbC5wb3NpdGlvbjtcbiAgICAgICAgdGhhdC5ncmlkLnRvcFt0b3BdLmNlbGxzW2xlZnRdID0gY2VsbDtcbiAgICAgICAgdGhhdC5ncmlkLmxlZnRbbGVmdF0uY2VsbHNbdG9wXSA9IGNlbGw7XG4gICAgICAgIGNlbGwuaG9yaXpvbnRhbENvbHVtbiA9IHRoYXQuZ3JpZC50b3BbdG9wXTtcbiAgICAgICAgY2VsbC52ZXJ0aWNhbENvbHVtbiAgID0gdGhhdC5ncmlkLmxlZnRbbGVmdF07XG5cbiAgICAgICAgYXBwbHlDZWxsUG9zaXRpb24oY2VsbCk7XG5cbiAgICAgICAgdGhhdC5kb20uYXBwZW5kQ2hpbGQoY2VsbC5kb20pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lQ2VsbFBvc2l0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGlzUG9zaXRpb25GcmVlKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBwb3NpdGlvbjtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ3JpZDtcblxuICAgICAgICBpZiggZ3JpZC50b3BbdG9wXS5jZWxsc1tsZWZ0XSAmJiBncmlkLnRvcFt0b3BdLmNlbGxzW2xlZnRdLmlzVGhpc0NlbGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVGaWVsZDtcblxuZnVuY3Rpb24gYXBwbHlDZWxsUG9zaXRpb24oY2VsbCkge1xuICBjb25zdCBjZWxsQ3NzUG9zaXRpb24gPSB7XG4gICAgdG9wOiBjZWxsLnBvc2l0aW9uLnRvcCAqIDEwMCArICdweCcsXG4gICAgbGVmdDogY2VsbC5wb3NpdGlvbi5sZWZ0ICogMTAwICsgJ3B4JyxcbiAgfVxuXG4gIGFwcGx5U3R5bGVzKGNlbGwuZG9tLCBjZWxsQ3NzUG9zaXRpb24pO1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Qb3NpdGlvbigpIHtcbiAgbGV0IHBvc2l0aW9uID0ge1xuICAgIHRvcDogZ2V0UmFuZG9tSW50KDAsNCksXG4gICAgbGVmdDogZ2V0UmFuZG9tSW50KDAsNCksXG4gIH07XG5cbiAgcmV0dXJuIHBvc2l0aW9uO1xufTtcblxuLy8gbm90IGluY2x1ZGluZyBtYXhcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhlbGVtZW50LCBzdHlsZXNPYmplY3QpIHtcbiAgZm9yKGxldCBrZXkgaW4gc3R5bGVzT2JqZWN0KSB7XG4gICAgZWxlbWVudC5zdHlsZVtrZXldID0gc3R5bGVzT2JqZWN0W2tleV07XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcy5qcyc7XG5pbXBvcnQgR2FtZUZpZWxkIGZyb20gJy4vRmllbGQuanMnO1xuXG5cbmxldCBmaWVsZCA9IG5ldyBHYW1lRmllbGQoe1xuICBpZDogJ2ZpZWxkJ1xufSk7XG5cbmZpZWxkLmFjdGl2YXRlKCk7XG5cbmNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5yZXNldEJ1dHRvbi5pbm5lclRleHQgPSAnUmVzZXQgU2NvcmUnO1xucmVzZXRCdXR0b24uY2xhc3NMaXN0LmFkZChzdHlsZXMucmVzZXRCdXR0b24pO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZXNldEJ1dHRvbik7XG5cbnJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzZXRGaWVsZCwpO1xuXG5mdW5jdGlvbiByZXNldEZpZWxkKGUpIHtcbiAgZmllbGQuZG9tLmlubmVySFRNTCA9ICcnO1xuICBmaWVsZCA9IG5ldyBHYW1lRmllbGQoe2lkOiAnZmllbGQnfSk7XG4gIGZpZWxkLmFjdGl2YXRlKCk7XG59XG5cbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICBpZihlLmtleSA9PT0gJ3EnIHx8IGUua2V5ID09PSAn0LknKSB7XG4gICAgcmVzZXRGaWVsZCgpO1xuICB9IGVsc2UgaWYoZS5rZXkgPT09ICdmJyB8fCBlLmtleSA9PT0gJ9CwJykge1xuICAgIGZpZWxkLmFkZE5ld0NlbGwoKTtcbiAgfVxufSlcblxuY29uc3QgYWRkQ2VsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuYWRkQ2VsbEJ1dHRvbi5pbm5lclRleHQgPSAnQWRkIGNlbGwnO1xuYWRkQ2VsbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHN0eWxlcy5hZGRDZWxsQnV0dG9uKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWRkQ2VsbEJ1dHRvbik7XG5cbmFkZENlbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRDZWxsKTtcblxuZnVuY3Rpb24gYWRkQ2VsbChlKSB7XG4gIGZpZWxkLmFkZE5ld0NlbGwoKTtcbn1cbiIsImNvbnN0IHN0eWxlcyA9IHtcblx0ZmllbGRDZWxsOiAnZmllbGRfX2NlbGwnLFxuICByZXNldEJ1dHRvbjogJ2ZpZWxkX19yZXNldC1idXR0b24nLFxuICBhZGRDZWxsQnV0dG9uOiAnZmllbGRfX2FkZC1idXR0b24nLFxufVxuXG5leHBvcnQgZGVmYXVsdCBzdHlsZXM7XG4iXSwic291cmNlUm9vdCI6IiJ9