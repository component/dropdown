
/**
 * Module dependencies.
 */

var classes = require('classes');
var css = require('css');
var event = require('event');
var isArray = require('is-array');
var isEmpty = require('is-empty');
var inherit = require('inherit');
var Menu = require('menu');
var offset = require('offset');
var query = require('query');

/**
 * Export `Dropdown` constructor.
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
 * @public
 */

function Dropdown(ref, opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref, opts);
  Menu.call(this);

  this.options = opts = opts || {};
  this.options.menu = false === opts.menu ? false : (opts.menu || 'left');
  this.options.items = opts.items || [];
  this.options.selectable = false !== opts.selectable;

  // add classes to base "el"
  var elClasses = classes(this.el);
  if (this.options.menu) elClasses.add('dropdown-menu');
  if (this.options.classname) elClasses.add(this.options.classname);

  this.ref = 'string' == typeof ref ? query(ref) : ref;
  event.bind(this.ref, 'click', this.onclick.bind(this));

  if (this.options.items.length) {
    for (var i = 0; i < this.options.items.length; i++) {
      var item = this.options.items[i];
      item = isArray(item) ? item : [ item, null, null ];
      this.add(item[0], item[1], item[2]);
    }
    if (this.options.select) this.focus(this.options.select);
  }

  this.checked = [];

  // reference element class handler
  this.on('select', this.focus.bind(this));
  this.on('show', this.addOpenedClass.bind(this));
  this.on('hide', this.removeOpenedClass.bind(this));
}

/**
 * Inherits from `Menu.prototype`.
 */

inherit(Dropdown, Menu);

/**
 * Adds "opened" class to `ref`.
 *
 * @private
 */

Dropdown.prototype.addOpenedClass = function(){
  classes(this.ref).add('opened');
};

/**
 * Removes "opened" class from `ref`.
 *
 * @private
 */

Dropdown.prototype.removeOpenedClass = function(){
  classes(this.ref).remove('opened');
};

/**
 * "click" event handler for the `ref`.
 *
 * @param {Object} ev event object
 * @api private
 */

Dropdown.prototype.onclick = function(ev){
  ev.preventDefault();
  ev.stopPropagation();

  var ref = this.ref;

  if (isEmpty(this.items)) return;
  if (classes(ref).has('opened')) return this.hide();

  var x, y;

  if (this.options.menu) {
    var p = offset(ref);
    var dims = ref.getBoundingClientRect();

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

  if (!selected) throw new Error('Item: `' + slug + '` does not exist.');
  var selectedClasses = classes(selected);

  var multi = this.options.multiple;
  var newSelection = !selectedClasses.has('current');

  if (this.current) {
    if (multi) {
      if (!newSelection) {
        selectedClasses.remove('current');
        var ind = this.checked.indexOf(this.current);
        this.checked.splice(ind, 1);
        if (select) return;
        return this.emit('uncheck', this.current, this.checked);
      }
    } else if (newSelection) {
      classes(this.items[this.current]).remove('current');
    }
  }

  if (newSelection) {
    if (this.options.selectable) {
      var a = query('a', selected);
      if ('input' == this.ref.tagName.toLowerCase()) {
        this.ref.value = a.innerHTML;
      } else {
        this.ref.innerHTML = a.innerHTML;
      }
      if (!select) this.emit('focus', slug);
    }
    if (multi) {
      this.checked.push(slug);
      if (!select) this.emit('check', slug, this.checked);
    }
  }

  selectedClasses.add('current');
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
  this.clear();
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
  var el = this.el;

  var prev = css(el, 'display');

  if ('none' == prev) {
    css(el, 'visibility', 'hidden');
    css(el, 'display', 'block');
  }

  var s = el.getBoundingClientRect();

  css(el, 'display', prev);
  css(el, 'visibility', 'visible');

  return s;
};
