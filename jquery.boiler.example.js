/**
 * This is an example of creating a plugin with jquery.boiler.
 * It acts as reference and will not actually create a functioning plugin :)
 *
 * jquery.boiler
 * @param {string} namespace - The name of your plugin
 * @param {object} base - The base of your plugin
 */



$.boiler('pluginName', {

  /* The default settings for the plugin. These can be overwritten by the
     options passed on initiation. */
  defaults: {
    foo: 'bar',
    doThis: false
  },

  /* Events to bind onto the plugins dom element(s). You can use these events
     to call a function within the plugin. */
  events: {
    click: '_privateMethod'
  },

  /* A list of supported data-attribute variables. These will overwrite 
     both the defaults and the options in the plugins settings. */
  data: ['foo'],

  /* The function which runs on initiation. A good time to cache. */
  init: function(){

    /* 'this' always refers to the plugin. It's good practice to store a 
       reference. */
    var plugin = this;

    /* plugin.el and plugin.$el are references to the dom element. */
    plugin.$foobar = plugin.$el.find('.foobar');

    /* The plugin settings are created from data, options, and defaults.
       Settings take priority as follows: data > options > defaults */
    if(plugin.settings.doThis) plugin.settings.doThis.call(plugin.el);

    /* The plugin object give you full access to the plugin */
    plugin.publicMethod();

  },

  /* Private methods begin with _. These methods can't be accessed outside of
     the plugin. */
  _privateMethod: function(e){},

  /* Public methods are accessible outside of the plugin. */
  publicMethod: function(message){
    alert(message);
  }

});




// Initiate the plugin
$('#js-hook').pluginName({
  foo: 'dawg'
});

// Call a public method
$('#js-hook').pluginName('plublicMethod', 'This is a message parameter');

// Access the plugin object through the elements data object
console.log( $('#js-hook').data('pluginName').settings.foo ); //dawg


