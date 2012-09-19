
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
 *   - menu:   {Boolean} menu mode (default true)
 *   - select: {String} initial item_id select into dropdown
 *   - noSelectable: {Boolen} defines if dropdown is selectable (default false)
 *
 * @api public
 */

function Dropdown(ref, opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref, opts);

  this.options = opts || {};

  Menu.call(this, this.dropdown);

  // reference element
  var ref = this.ref = o(ref);

  // dropdown-menu mode
  if (this.options.menu) this.el.addClass('dropdown-menu');

  // custom classname
  if (this.options.classname) this.el.addClass(this.options.classname);

  // add options
  this.options.items = this.options.items || [];

  // non-selectable dropdown
  this.options.noSelectable = 'undefined' == typeof this.options.noSelectable
                              ? this.ref.text().length
                              : this.options.noSelectable;

  if (this.options.items.length) {
    this.addItems();
    if (this.options.select) this.focus(this.options.select);
  }

  this.ref.click(this.click.bind(this));
  this.on('select', this.focus.bind(this));

  this.on('show', function(){ ref.addClass('opened'); });
  this.on('hide', function(){ ref.removeClass('opened'); });
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
  var x, y;

  if (this.options.menu) {
    var p = this.ref.position();
    x = p.left, y = p.top + this.ref.outerHeight();
  } else {
    x = ev.pageX, y = ev.pageY;
  }

  this.moveTo(x, y);
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
  if (this.options.noSelectable) return;

  if (this.current) this.current.removeClass('current');
  this.current = this.items[slug];

  if(!this.current) throw new Error('Doesn\'t exists `' + slug + '` item.');
  this.current.addClass('current');
  if (this.options.menu) this.ref.html(o(this.items[slug]).find('a').html());
};
