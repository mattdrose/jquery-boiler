/**
 * This is an example of creating a plugin with jquery.boiler.
 * It acts as reference and will not actually create a functioning plugin :)
 *
 * jquery.boiler
 * @param {string} namespace - The name of your plugin
 * @param {object} base - The base of your plugin
 */

$.boiler('tooltip', {

  /* The default settings for the plugin. These can be overwritten by the
     options passed on initiation. */
  defaults: {
    tip: 'This is a tip!',
    animationSpeed: 500
  },

  /* Events to bind onto the plugins dom element(s). You can use these events
     to call a function within the plugin. */
  events: {
    mouseEnter: 'open',
    mouseLeave: 'close'
  },

  /* A list of supported data-attribute variables. These will overwrite
     both the defaults and the options in the plugins settings. */
  data: ['tip'],

  /* The function which runs on initiation. A good time to cache. */
  init: function(){

    /* 'this' always refers to the plugin. It's good practice to store a
       reference. */
    var plugin = this;

    /* cache */
    plugin.$wrapper =
      $('<div/>').addClass('js-tooltip__wrapper');

    plugin.$tip =
      $('<div/>').addClass('js-tooltip__tip')
                 .html(plugin.settings.tip);

    /* plugin.el and plugin.$el are references to the dom element. */
    plugin.$el.wrap(plugin.$wrapper);
    plugin.$wrapper.append(plugin.$tip);

  },

  /* Public methods like this are accessible outside of the plugin. Private
     methods begin with _. These methods can't be accessed outside of the
     plugin. */
  open: function(){
    /* The plugin object gives you full access to the plugin */
    var plugin = this;

    /* The plugin settings are created from data, options, and defaults.
       Settings take priority as follows: data > options > defaults */
    plugin.$tip.fadeIn(plugin.settings.animationSpeed);
  },

  close: function(){
    var plugin = this;
    plugin.$tip.fadeOut(plugin.settings.animationSpeed);
  }
});
