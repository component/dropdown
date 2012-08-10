# Dropdown

  Dropdown component with structural styling.

  ![js dropdown
  component](http://f.cl.ly/items/010I1g3E2I3j2j2E3j0F/Screen%20Shot%202012-08-10%20at%2011.40.20%20AM.png)

## Installation

```
$ npm install dropdown-component
```

## Features

  It inherits all properties of [Menu component](http://www.github/component/menu)

  - events for composition
  - structural CSS letting you decide on style
  - fluent API
  - arrow key navigation

## Events

  It inherits all events of [Menu component](http://www.github/component/menu). It
  not added anymore.

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

  Create a new `Dropdown` associated to `ref` element. Also support the follow
  options:

  - menu: {Boolean} value that defines if dropdown support menu behaviur.
  - items: {Array} of initial items.
  - select: {String} defines the focused item

```js
var Dropdown = require('dropdown');
var dropdown = Dropdown('.dropdown-link', {
    menu: true
  , items: [
        ['apple', '<em>Apple</em>', funcrion (){ console.log('It\'s an Apple!') }]
      , ['orange', '<strong style="color: #f86">orange</strong>']
      , ['banana', '<strong>Banana</strong>']
      , ['strawberry', 'Strawberry']
    ]
  , select: 'banana'
});
```

### Inherits methods:

### Dropdown#add([slug], text, [fn])
### Dropdown#remove(slug)
### Dropdown#has(slug)
### Dropdown#show()
### Dropdown#hide()

### Dropdown#focus(slug):

  Focus dropdown with the item given.

```js
  dropdown.focus('banana');
```

## License

  (The MIT License)
  Copyright(c) 2012 Damian Suarez <rdsuarez@gmail.com>
  
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
