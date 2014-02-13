/**
 * Module dependencies.
 */

var Menu = require('menu');
var inherit = require('inherit');
var isempty = require('isempty');
var offset = require('offset');
var dom = require('dom');

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
 *   - menu:   {String} menu mode (default 'left')
 *   - select: {String} initial item_id select into dropdown
 *   - selectable: {Boolean} defines if dropdown is seloectable (default true)
 *   - muliple: allow check more than one item
 *
 * @api public
 */

function Dropdown(ref, opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref, opts);
  Menu.call(this, this.dropdown);

  this.options = opts = opts || {};
  this.options.menu = false === opts.menu ? false : (opts.menu || 'left');
  this.options.items = opts.items || [];
  this.options.selectable = false !== opts.selectable;

  var el = dom(this.el);

  if (this.options.menu) el.addClass('dropdown-menu');
  if (this.options.classname) el.addClass(this.options.classname);

  ref = this.ref = dom(ref);
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
  this.on('show', function(){ ref.addClass('opened'); });
  this.on('hide', function(){ ref.removeClass('opened'); });
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

  ref = dom(ref);

  if (isempty(this.items)) return;
  if (ref.hasClass('opened')) return this.hide();

  var x, y;

  if (this.options.menu) {
    var p = offset(this.ref[0]);
    var dims = this.ref[0].getBoundingClientRect();

    x = p.left;
    y = p.top + dims.height;

    if ('right' == this.options.menu) {
      x += dims.width - this.dims().width;
    }
  } else {
    x = ev.pageX, y = ev.pageY;
  }

  this.moveTo(x, y);
  this.coor = { x: x, y: y };
  this.show();
};

/**
 * Focus on item
 *
 * @param {String} slug option slug
 * @api pubic
 */

Dropdown.prototype.focus = function(slug, select){
  var selected = this.items[slug];

  if (!selected) throw new Error('Doesn\'t exists `' + slug + '` item.');
  selected = dom(selected);

  var multi = this.options.multiple;
  var new_selection = !selected.hasClass('current');

  if (this.current) {
    if (multi) {
      if (!new_selection) {
        selected.removeClass('current');
        var ind = this.checked.indexOf(this.current);
        this.checked.splice(ind, 1);
        if (select) return;
        return this.emit('uncheck', this.current, this.checked);
      }
    } else if (new_selection) {
      dom(this.items[this.current]).removeClass('current');
    }
  }

  if (new_selection) {
    if (this.options.selectable) {
      var mtd =  'input' == this.ref[0].tagName.toLowerCase() ? 'val' : 'html';
      this.ref[mtd](selected.find('a').html());
      if (!select) this.emit('focus', slug);
    }
    if (multi) {
      this.checked.push(slug);
      if (!select) this.emit('check', slug, this.checked);
    }
  }

  selected.addClass('current');
  this.current = slug;
};

/**
 * Select an item
 *
 * @param {String} slug option slug
 * @api public
 */

Dropdown.prototype.select = function(slug){
  this.focus(slug, true);
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
/**
 * Get Menu dims
 *
 * @return {Object}
 * @api public
 */

Dropdown.prototype.dims = function(){
  var el = dom(this.menu);
  var prev = el.css('display');

  if ('none' == prev) {
    el.css('visibility', 'hidden');
    el.css('display', 'block');
  }

  var s = el[0].getBoundingClientRect();

  el.css('display', prev);
  el.css('visibility', 'visible');
  return s;
};
