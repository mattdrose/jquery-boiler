/*
 * Added for Saucelabs
 * https://github.com/axemclion/grunt-saucelabs#test-result-details-with-qunit
 */
var log = [];
var testName;

QUnit.done(function (test_results) {
  var tests = [];
  for(var i = 0, len = log.length; i < len; i++) {
    var details = log[i];
    tests.push({
      name: details.name,
      result: details.result,
      expected: details.expected,
      actual: details.actual,
      source: details.source
    });
  }
  test_results.tests = tests;

  window.global_test_results = test_results;
});
QUnit.testStart(function(testDetails){
  QUnit.log(function(details){
    if (!details.result) {
      details.name = testDetails.name;
      log.push(details);
    }
  });
});

(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('Basic Plugin Functionality', {
    // This will run before each test in this module.
    setup: function() {
      this.$el1 = $('#js-test-1');
      this.$el2 = $('#js-test-2');
      this.$els = $('.js-test');

      $.boiler('test', {});
    },
    teardown: function() {
      this.$els.removeData('test');
    }
  });

  test('Added to fn namespace', function() {
    expect(1);

    ok(!!$.fn.test);
  });

  test('Chainable', function() {
    expect(1);

    strictEqual(this.$els.test(), this.$els);
  });

  test("Plugin cached in elements data attribute", function() {
    expect(1);

    this.$el1.test();
    ok(!!this.$el1.data('test'));
  });

  test("Plugin applied to each element in a group", function() {
    expect(1);

    var isOk = true;

    this.$els.test();

    this.$els.each(function(){
      if (!$(this).data('test')) {
        isOk = false;
      }
    });

    ok(isOk);

  });

  test("Each instance of plugin is seperate", function() {
    expect(1);

    this.$els.test();

    notStrictEqual(this.$el1.data('test'), this.$el2.data('test'));

  });

  /*
   *
   */

  module('Caching Dom Objects', {
    // This will run before each test in this module.
    setup: function() {
      this.$el = $('#js-test-1');

      $.boiler('test', {});
    },
    teardown: function() {
      this.$el.removeData('test');
    }
  });

  test("Dom element is cached", function() {
    expect(2);

    this.$el.test();

    strictEqual(this.$el[0], this.$el.data('test').$el[0]);
    strictEqual(this.$el[0], this.$el.data('test').el);
  });

  test("Original selector is cached", function() {
    expect(1);

    this.$el.test();

    strictEqual(this.$el.data('test')._selector, '#js-test-1');
  });

  /*
   *
   */

  module('Plugin Methods and Variables', {
    // This will run before each test in this module.
    setup: function() {
      this.$el = $('<div>');

      $.boiler('test', {
        pub: 'public',
        _private: true,
        exclaim: function(input) {
          return input + '!';
        },
        getThis: function() {
          return this;
        },
        setText: function(val) {
          this.$el.text(val);
        }
      });

      this.$el.test();
    },
    teardown: function() {
      this.$el.removeData('test');
    }
  });

  test("Plugin object gives access to passed objects", function() {
    expect(2);

    strictEqual(this.$el.data('test').pub, 'public');
    strictEqual(this.$el.data('test').exclaim('itemTwo'), 'itemTwo!');
  });

  test("Easily set public variables", function() {
    expect(1);

    this.$el.test('pub', 'foo');

    strictEqual(this.$el.data('test').pub, 'foo');
  });

  test("'this' gives context to plugin within method", function() {
    expect(1);

    strictEqual(this.$el.data('test').getThis(), this.$el.data('test'));
  });

  test("Easily call methods", function() {
    expect(1);

    this.$el.test('setText', 'Hello World!');

    strictEqual(this.$el.text(), 'Hello World!');
  });

  /*
   *
   */

  module('Settings', {
    // This will run before each test in this module.
    setup: function() {
      this.$el = $('#js-test-1');

      $.boiler('test', {
        defaults: {
          one: '1',
          two: '2',
          three: '3'
        },
        data: ['one']
      });
    },
    teardown: function() {
      this.$el.removeData('test');
    }
  });

  test("Defaults are cached", function() {
    expect(1);

    this.$el.test();

    deepEqual(this.$el.data('test').defaults, {
      one: '1',
      two: '2',
      three: '3'
    });
  });

  test("Data attributes are cached", function() {
    expect(1);

    this.$el.test();

    deepEqual(this.$el.data('test').data, {
      one: 'ONE'
    });
  });

  test("User options are cached", function() {
    expect(1);

    this.$el.test({
      foo: 'bar'
    });

    deepEqual(this.$el.data('test').options, {
      foo: 'bar'
    });
  });

  test("Settings properly give priority to data > options > defaults", function() {
    expect(1);

    this.$el.test({
      one: 'one',
      two: 'two'
    });

    deepEqual(this.$el.data('test').settings, {
      one: 'ONE',
      two: 'two',
      three: '3'
    });
  });

  /*
   *
   */

  module('Events', {
    // This will run before each test in this module.
    setup: function() {
      this.$el = $('<div>');
    },
    teardown: function() {
      this.$el.removeData('test');
    }
  });

  test("Events run properly", function() {
    expect(2);

    $.boiler('test', {
      events: {
        'click': 'onClick',
        'mouseenter': 'onHover'
      },
      foo: 'bar',
      onClick: function() {
        this.foo = 'click';
      },
      onHover: function() {
        this.foo = 'hover';
      }
    });

    this.$el.test();

    this.$el.trigger('click');
    strictEqual(this.$el.data('test').foo, 'click');

    this.$el.trigger('mouseenter');
    strictEqual(this.$el.data('test').foo, 'hover');
  });

  test("Propogated events run properly", function() {
    expect(3);

    $.boiler('test', {
      events: {
        'click li span': 'onClick',
      },
      onClick: function(e, el) {
        $(el).addClass('is-clicked');
      }
    });

    $('#js-test-3').test();
    $('#js-target-1').click();
    $('#js-target-2').click();
    $('#js-target-3').click();

    ok($('#js-target-1').hasClass('is-clicked'));
    ok(!$('#js-target-2').hasClass('is-clicked'));
    ok($('#js-target-3').hasClass('is-clicked'));
  });

}(jQuery));
