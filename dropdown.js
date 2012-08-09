
/**
 * Module dependencies.
 */

var Menu = require('menu')
  , o = require('jquery');

/**
 * Expose `Dropdown`.
 */

module.exports = Dropdown;

/**
 * Initialize a new `Dropdown`.
 *
 * Emits:
 *
 *   - "show" when shown
 *   - "hide" when hidden
 *   - "remove" with the item name when an item is removed
 *   - "select" (item) when an item is selected
 *   - * dropdown item events are emitted when clicked
 *
 * @api public
 */

function Dropdown() {
  if (!(this instanceof Dropdown)) return new Dropdown;
  Menu.call(this, this.dropdown);
};

/**
 * Inherits from `Menu.prototype`.
 */

Dropdown.prototype.__proto__ = Menu.prototype;

