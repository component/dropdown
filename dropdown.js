
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
 * @param {String|Object} element reference
 * @param {Object} options:
 *
 *   - items:  {Object} array of the initial items
 *   - menu:   {Boolean} menu mode. Default true.
 *   - select: {String} initial item_id select into dropdown
 *
 * @api public
 */

function Dropdown(ref, opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref, opts);

  this.options = opts || {};

  Menu.call(this, this.dropdown);

  // reference element
  this.ref = o(ref);

  // dropdown-menu mode
  if (this.options.menu) this.el.addClass('dropdown-menu');

  // add options
  this.options.items = this.options.items || [];
  if (this.options.items.length) {
    this.addItems();
    this.focus(this.options.select || this.options.items[0][0]);
  }

  this.ref.click(this.click.bind(this));
  this.on('select', this.focus.bind(this));
};

/**
 * Inherits from `Menu.prototype`.
 */

Dropdown.prototype.__proto__ = Menu.prototype;

/**
 * Add click event to reference element
 *
 * @api private
 */

Dropdown.prototype.click = function(ev){
  ev.preventDefault();
  ev.stopPropagation();
  var coors = {};

  if (this.options.menu) {
    var p = this.ref.position();
    coors = { x: p.left, y: p.top + this.ref.outerHeight() };
  } else {
    coors = { x: ev.pageX, y: ev.pageY };
  }

  this.moveTo(coors.x, coors.y);
  this.ref.addClass('opened');
  this.show();
};

/**
 * Add items into dropdown menu
 *
 * @api private
 */

Dropdown.prototype.addItems = function(){
  for (var i = 0; i < this.options.items.length; i++) {
    var item = this.options.items[i];
    this.add(item[0], item[1], item[2]);
  };
}

/**
 * Focus on item
 */

Dropdown.prototype.focus = function (slug) {
  if (this.current) this.current.removeClass('current');
  this.current = this.items[slug].addClass('current');

  if (this.options.menu) this.ref.html(o(this.items[slug]).find('a').html());
  this.ref.removeClass('opened');
};
