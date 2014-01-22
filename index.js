/**
 * Module dependencies.
 */

var Menu = require('menu')
  , classes = require('classes')
  , inherit = require('inherit')
  , o = require('jquery');

/**
 * Expose `Dropdown`.
 */

module.exports = Dropdown;

/**
 * Initialize a new `Dropdown`.
 *
 * Emits:
 *  `focus` when an item is really selected
 *  `check` when an item is checked (multiple mode)
 *  `uncheck` when an item is unchecked (multiple mode)
 *
 * @param {String|Object} element reference
 * @param {Object} options:
 *
 *   - items:  {Object} array of the initial items
 *   - menu:   {Boolean} menu mode (default true)
 *   - select: {String} initial item_id select into dropdown
 *   - selectable: {Boolean} defines if dropdown is seloectable (default true)
 *   - muliple: allow check more than one item
 *
 * @api public
 */

function Dropdown(ref, opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref, opts);
  Menu.call(this, this.dropdown);

  this.options = opts || {};
  this.options.menu = false !== this.options.menu;
  this.options.items = this.options.items || [];
  this.options.selectable = false !== this.options.selectable;

  var elclasses = classes(this.el);
  if (this.options.menu) elclasses.add('dropdown-menu');
  if (this.options.classname) elclasses.add(this.options.classname);

  var ref = this.ref = o(ref);
  if (this.options.items.length) {
    for (var i = 0; i < this.options.items.length; i++) {
      var item = this.options.items[i];
      item = item instanceof Array ? item : [item, null, null];
      this.add(item[0], item[1], item[2]);
    }
    if (this.options.select) this.focus(this.options.select);
  }

  this.ref.on('click', this.onclick.bind(this, this.ref[0]));
  this.on('select', this.focus.bind(this));

  this.checked = [];

  // reference element class handler
  var refclasses = classes(ref[0]);
  this.on('show', function(){ refclasses.add('opened'); });
  this.on('hide', function(){ refclasses.remove('opened'); });
}

/**
 * Inherits from `Menu.prototype`.
 */

inherit(Dropdown, Menu);

/**
 * Add click event to reference element
 *
 * @param {DOM} ref dom reference to target
 * @param {Object} ev event object
 * @api private
 */

Dropdown.prototype.onclick = function(ref, ev){
  ev.preventDefault();
  ev.stopPropagation();

  if (o.isEmptyObject(this.items)) return;
  if (classes(ref).has('opened')) return this.hide();

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
  var selected = this.items[slug];
  if (!selected) throw new Error('Doesn\'t exists `' + slug + '` item.');

  var multi = this.options.multiple;
  var css_selected = classes(selected);
  var new_selection = !css_selected.has('current');

  if (this.current) {
    if (multi) {
      if (!new_selection) {
        css_selected.remove('current');
        var ind = this.checked.indexOf(this.current);
        this.checked.splice(ind, 1);
        return this.emit('uncheck', this.current, this.checked);
      }
    } else if (new_selection) {
      classes(this.items[this.current]).remove('current');
    }
  }

  if (new_selection) {
    if (this.options.selectable) {
      var mtd =  'input' == this.ref[0].tagName.toLowerCase() ? 'val' : 'html';
      this.ref[mtd](o(selected).find('a').html());
      this.emit('focus', slug);
    }
    if (multi) {
      this.checked.push(slug);
      this.emit('check', slug, this.checked);
    }
  }

  css_selected.add('current');
  this.current = slug;
};

/**
 * Option setter
 *
 * @param {String} k
 * @param {*} v
 * @api public
 */

Dropdown.prototype.option = function(k, v){
  this.options[k] = v;
  return this;
};

/**
 * Remove all items
 *
 * @api public
 */

Dropdown.prototype.empty = function(){
  for (var k in this.items) {
    this.items[k].remove();
  }
  this.items = [];
  this.checked = [];
  this.current = null;
};
