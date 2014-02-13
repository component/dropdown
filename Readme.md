# Dropdown

  Dropdown component with structural styling.

  ![js dropdown
  component](http://f.cl.ly/items/010I1g3E2I3j2j2E3j0F/Screen%20Shot%202012-08-10%20at%2011.40.20%20AM.png)

  See Dropdown in action in [here](http://component.github.com/dropdown/).

## Installation

```
$ component install component/dropdown
```

## Features

  It inherits all properties of [Menu component](https://github.com/component/menu)

  - events for composition
  - structural CSS letting you decide on style
  - fluent API
  - arrow key navigation

## Events

  It inherits all events of [Menu component](https://github.com/component/menu)
  and add:

  - `focus`: when an item is correctly selected.

## Dependencies

  * menu-component

## Example

```js
var Dropdown = require('dropdown');

var dropdown = new Dropdown('.fruits-dropdown');

dropdown
.add('Banana')
.add('Apple', function(){ console.log('Apple selected'); })
.add('Lemon', function(){ console.log('Lemon'); })
.add('Remove "Apple"', function(){
  dropdown.remove('Lemon');
})
.focus('Apple');

```

## API
  
### Dropdown(ref, options)
 *
 * Emits:
 *  `focus` when an item is really selected
 *  `check` when an item is checked (multiple mode)
 *  `uncheck` when an item is unchecked (multiple mode)

  Create a new `Dropdown` associated to `ref` element. Also support the follow
  options:

  - menu: `{String}` Set menu behaviur (default 'left').
  - items: `{Array}` Array of initial items.
  - select: `{String}` Initial focused item
  - selectable: `{Boolean}` Defines if dropdown is selectable (default true)
  - classname: `{String}` Additional class(es) to menu element container
  - muliple: `{Boolean}` allow check more than one item

```js
var Dropdown = require('dropdown');
var dropdown = Dropdown('.dropdown-link', {
    menu: 'right'
  , items: [
        ['apple', function (){ console.log('It\'s an Apple!') }]
      , ['orange', '<em>orange</em>']
      , ['banana', '<strong>Banana</strong>']
      , ['strawberry', function() {
            console.log('remove the orange');
            dropdown.remove('orange');
          }
        ]
    ]
  , select: 'banana'
});
```

### Menu inherits methods:

  * Dropdown#add([slug], text, [fn])
  * Dropdown#remove(slug)
  * Dropdown#has(slug)
  * Dropdown#show()
  * Dropdown#hide()

### Dropdown#focus(slug):

  Focus dropdown with the item given.

```js
  dropdown.focus('banana');
```

### Dropdown#select(slug):

  Select dropdown with the item given. it doesn't emit `focus` event.

```js
  dropdown.focus('banana');
```

## License

  (The MIT License)
  Copyright(c) 2012 Damian Suarez &lt;rdsuarez@gmail.com&gt;
  
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  'Software'), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
