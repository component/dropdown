/**
 * Module dependencies.
 */

var Menu = require('menu')
  , classes = require('classes')
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
 *   - menu:   {Boolean} menu mode (default true)
 *   - select: {String} initial item_id select into dropdown
 *   - selectable: {Boolean} defines if dropdown is selectable (default true)
 *
 * @api public
 */

function Dropdown(ref, opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref, opts);

  this.options = opts || {};

  Menu.call(this, this.dropdown);

  // css element class handler
  var elclasses = classes(this.el[0]);

  // dropdown-menu mode
  if (this.options.menu) elclasses.add('dropdown-menu');

  // custom classname
  if (this.options.classname) elclasses.add(this.options.classname);

  // initial items option
  this.options.items = this.options.items || [];

  // reference element
  var ref = this.ref = o(ref);

  // selectable dropdown
  this.options.selectable = false !== this.options.selectable;

  if (this.options.items.length) {
    for (var i = 0; i < this.options.items.length; i++) {
      var item = this.options.items[i];
      item = item instanceof Array ? item : [item, null, null];
      this.add(item[0], item[1], item[2]);
    }
    if (this.options.select) this.focus(this.options.select);
  }

  this.ref.click(this.onClick.bind(this));
  this.on('select', this.focus.bind(this));

  // reference element class handler
  var refclasses = classes(ref[0]);
  this.on('show', function(){ refclasses.add('opened'); });
  this.on('hide', function(){ refclasses.remove('opened'); });
}

/**
 * Inherits from `Menu.prototype`.
 */

Dropdown.prototype.__proto__ = Menu.prototype;

/**
 * Add click event to reference element
 *
 * @param {Object} ev event object
 * @api private
 */

Dropdown.prototype.onClick = function(ev){
  ev.preventDefault();
  ev.stopPropagation();
  var x, y;

  if (this.options.menu) {
    var p = this.ref.offset();
    x = p.left, y = p.top + this.ref.outerHeight();
  } else {
    x = ev.pageX, y = ev.pageY;
  }

  this.moveTo(x, y);
  this.show();
};

/**
 * Focus on item
 *
 * @param {String} slug option slug
 * @api pubic
 */

Dropdown.prototype.focus = function(slug){
  if (this.current) {
    classes(this.current[0]).remove('current');
  }

  this.current = this.items[slug];
  if (!this.current) throw new Error('Doesn\'t exists `' + slug + '` item.');

  classes(this.current[0]).add('current');

  if (this.options.selectabl && this.options.menu) {
    this.ref.html(o(this.items[slug]).find('a').html());
  }
};
