# jQuery Boiler [![Build Status](https://travis-ci.org/mattdrose/jquery-boiler.svg?branch=master)](https://travis-ci.org/mattdrose/jquery-boiler) [![Sauce Test Status](https://saucelabs.com/buildstatus/jquery-boiler)](https://saucelabs.com/u/jquery-boiler)

jQuery Boiler is a lightweight jQuery plugin to help you quickly build your own custom plugins. It uses best practices to ensure that you're using the
best development pattern without all the hassle.

## Installation

### Bower

```
bower install jquery-boiler
```

## Usage

Make sure jQuery Boiler is loaded before your plugin. Whether it be loaded as an AMD module, or a script tag in your header.

### Initiate

Create a new plugin by passing `$.boiler` your plugins name and the *plugin object*.

``` javascript
$.boiler('tooltip', {});
```

Once `$.boiler` has been run, you can call it like you would any other plugin.

``` javascript
$('.js-tooltip').tooltip();
```

And yes, this is chainable :).

## The Plugin Object

The plugin object you pass contains your settings and variables, as well as your private and public methods. The plugin object is the heart of your plugin since you'll have access to this object via the ```this``` keyword in all of your private and public methods.

Technically you can run this object however you want, but there are certain key items that the plugin object is expecting.

**Understanding this concept requires you understand both [Setting Up The Object](#setting-up-the-object) and [Using The Object](#using-the-object).**

### Setting Up The Object

#### `defaults`

`defaults` are the default settings for your plugin. When a user uses your plugin, they'll have the opportunity to pass their own settings to overwrite these values.

##### Example

``` javascript
$.boiler('tooltip', {
  defaults: {
    tip: 'This is a tip!'
  }
});
```

Once the `defaults` are set, they can be overwritten by the user when the plugin is initiated.

``` javascript
$('.js-tooltip').tooltip({
  tip: 'And he tipped his hat like this.'
});
```

#### `events`

`events` are bound to the element that the plugin is bound to. The associated values are the names of the methods that will be run when the event is triggered.

##### Example

``` javascript
$.boiler('tooltip', {
  events: {
    mouseEnter: 'open',
    mouseLeave: 'close'
  }
});
```

**Note**: You can delegate these events by passing a selector after the event name: `'click .child': 'onClick'`.

#### `data`

`data` is a list of `data-attributes` that the plugin will look for to overwrite the settings.

##### Example

``` javascript
$.boiler('tooltip', {
  data: ['tip']
});
```

Now you can set `tip` using the dom elements `data-attribute`.

``` html
<span class="js-tooltip" data-tip="Urr body in da club gettin tipsy!">Holla!</span>
```

**Note**: This data value will overwrite both the default and user set values.

#### `init`

`init` is a function that will automatically be run when the plugin is initiated. This is a good place to cache elements or do any heavy lifting to prepare the plugin for action.

##### Example

``` javascript
$.boiler('tooltip', {
  init: function() {
    var plugin = this;

    plugin.$wrapper =
      $('<div/>').addClass('js-tooltip__wrapper');

    plugin.$tip =
      $('<div/>').addClass('js-tooltip__tip')
                 .html(plugin.settings.tip);

    plugin.$el.wrap(plugin.$wrapper);
    plugin.$wrapper.append(plugin.$tip);
  }
});
```

#### `publicMethods`

Public methods are methods that can easily be run by the user.

##### Example

``` javascript
$.boiler('tooltip', {
  open: function() {
    var plugin = this;

    plugin.$tip.fadeIn(plugin.settings.animationSpeed);
  }
});
```

The user can run this function by calling the plugin after it's been initiated.

``` javascript
// Initiate
$('.js-tooltip').tooltip();

// Call public method
$('.js-tooltip').tooltip('open');
```

**Note**: The user can pass variables to the function in the same way.

``` javascript
$('.js-tooltip').tooltip('updateTip', 'This is a new tip!');
```

#### `_privateMethods`

Private methods are methods that can be run from within the plugin, but they can't be accessed by the user. These methods can be recognized by having a prefixed underscore.

### Using The Object

#### `var plugin = this;`

You can reference the plugin object from within a method by calling `this`. It's good practice to store this value into a plugin variable.

##### Example

``` javascript
$.boiler('tooltip', {
  open: function() {
    var plugin = this;
  }
});
```

#### `plugin.$el`

You have access to the dom element that the plugin has been bound to through `plugin.$el` (jQuery object), and `plugin.el` (dom element).

#### `plugin.settings`

`plugin.settings` are the settings for the plugin based on `defaults`, `options`, and `data`. `settings` take priority based on `data` > `options` > `defaults`.

##### Example

``` javascript
$.boiler('tooltip', {
  defaults: {
    tip: 'This is the default tip.'
  },
  logTip: function() {
    var plugin = this;
    console.log(plugin.settings.tip);
  }
});

$('.js-tooltip').tooltip({
  tip: 'This is the user option tip.'
}).tooltip('logTip');
// Logs 'This is the user option tip.'
```

**Note**: The plugin object also gives you access to `plugin.defaults`, `plugin.options`, and `plugin.data`.

### Hackability

At any time you can access the full plugin object using the cached `data-attribute`.

``` javascript
$('#js-tooltip').tooltip({
  tip: 'My last tip.'
});

console.log($('#js-tooltip').data('tooltip').settings.tip) // 'My last tip.';
```

## Browser Tests Status

[![Sauce Test Status](https://saucelabs.com/browser-matrix/jquery-boiler.svg)](https://saucelabs.com/u/jquery-boiler)
