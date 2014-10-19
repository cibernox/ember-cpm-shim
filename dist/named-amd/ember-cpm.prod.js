define("ember-cpm",
  ["ember","./macros/among","./macros/all-equal","./macros/encode-uri-component","./macros/encode-uri","./macros/first-present","./macros/fmt","./macros/html-escape","./macros/if-null","./macros/not-among","./macros/not-equal","./macros/not-match","./macros/promise","./macros/safe-string","./macros/join","./macros/sum-by","./macros/sum","./macros/concat","./macros/conditional","./macros/product","./macros/quotient","./macros/difference","./macros/as-float","./macros/as-int","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __dependency22__, __dependency23__, __dependency24__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var among = __dependency2__["default"] || __dependency2__;
    var allEqual = __dependency3__["default"] || __dependency3__;
    var encodeURIComponent = __dependency4__["default"] || __dependency4__;
    var encodeURI = __dependency5__["default"] || __dependency5__;
    var firstPresent = __dependency6__["default"] || __dependency6__;
    var fmt = __dependency7__["default"] || __dependency7__;
    var htmlEscape = __dependency8__["default"] || __dependency8__;
    var ifNull = __dependency9__["default"] || __dependency9__;
    var notAmong = __dependency10__["default"] || __dependency10__;
    var notEqual = __dependency11__["default"] || __dependency11__;
    var notMatch = __dependency12__["default"] || __dependency12__;
    var promise = __dependency13__["default"] || __dependency13__;
    var safeString = __dependency14__["default"] || __dependency14__;
    var join = __dependency15__["default"] || __dependency15__;
    var sumBy = __dependency16__["default"] || __dependency16__;
    var sum = __dependency17__["default"] || __dependency17__;
    var concat = __dependency18__["default"] || __dependency18__;
    var conditional = __dependency19__["default"] || __dependency19__;
    var product = __dependency20__["default"] || __dependency20__;
    var quotient = __dependency21__["default"] || __dependency21__;
    var difference = __dependency22__["default"] || __dependency22__;
    var asFloat = __dependency23__["default"] || __dependency23__;
    var asInt = __dependency24__["default"] || __dependency24__;

    function reverseMerge(dest, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }

    var VERSION = '1.2.2';
    var Macros = {
      among: among,
      allEqual: allEqual,
      encodeURIComponent: encodeURIComponent,
      encodeURI: encodeURI,
      firstPresent: firstPresent,
      fmt: fmt,
      htmlEscape: htmlEscape,
      ifNull: ifNull,
      notAmong: notAmong,
      notEqual: notEqual,
      notMatch: notMatch,
      promise: promise,
      safeString: safeString,
      join: join,
      sumBy: sumBy,
      sum: sum,
      difference: difference,
      concat: concat,
      conditional: conditional,
      asFloat: asFloat,
      asInt: asInt,
      quotient: quotient,
      product: product
    };
    var install = function(){ reverseMerge(Ember.computed, Macros); };


    if (Ember.libraries) {
      Ember.libraries.register('Ember-CPM', VERSION);
    }

    __exports__.VERSION = VERSION;
    __exports__.Macros = Macros;
    __exports__.install = install;

    __exports__["default"] = {
      VERSION: VERSION,
      Macros: Macros,
      install: install
    };
  });
define("ember-cpm/macros/all-equal",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    /**
      Returns true if all the all its dependent values are equal between them.

      Example

      ```javascript
      var Cuboid = Ember.Object.extend({
        cube: allEqual('height', 'width', 'depth'),
        base6: allEqual('width', 'depth', 6),
        side12: allEqual(sum('width', 'depth'), 12),
      });

      var shape = Cuboid.create({
        height: 6,
        width: 6,
        depth: 6
      });

      shape.get('cube');    // true
      shape.get('base6');   // true
      shape.get('side12');  // true
      shape.set('width', 4);
      shape.get('cube');    // false
      ```

      @method macros.allEqual
      @param *arguments Elements that must be equal. It be regular value, a property key or another computed property.
      @return {Boolean} Returns true it all elements are equal
    */
    __exports__["default"] = function EmberCPM_allEqual() {
      var mainArguments = Array.prototype.slice.call(arguments); // all arguments
      var propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        switch (mainArguments.length) {
          case 0:
          case 1:
            return true;
          default:
            var firstVal = getVal.call(this, mainArguments[0]);
            for (var i = 1; i < mainArguments.length; i += 1) {
              if (getVal.call(this, mainArguments[i]) !== firstVal) {
                return false;
              }
            }
            return true;
        }
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/among",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Returns true the given value in is among the supplied options.

      Example

      ```javascript
      var Show = Ember.Object.extend({
        hasCartoonDog: among('pet.name', 'Odie', 'Snoopy')
      });

      var show = Show.create({ pet: { name: 'Garfield' } });

      show.get('hasCartoonDog'); // false
      show.set('pet.name', 'Snoopy');
      show.get('hasCartoonDog'); // true
      ```

      @method macros.among
      @param {String} dependentKey Dependent key which value must be among the given values.
      @param          *values      Values among which the dependentKey must be included.
      @return {Boolean} Returns true the value in the given dependent key is among the privided values.
    */
    __exports__["default"] = function EmberCPM_among(dependentKey) {
      var properties = Array.prototype.slice.call(arguments, 1);

      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        for (var i = 0, l = properties.length; i < l; ++i) {
          if (properties[i] === value) {
            return true;
          }
        }
        return false;
      });
    }
  });
define("ember-cpm/macros/as-float",
  ["../utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var parseComputedPropertyMacro = __dependency1__.parseComputedPropertyMacro;

    /**
      Converts the value in the given dependent key into a float.

      Note that it returns NaN when the dependent key contains `null`, `undefined` or an invalid string.

      Example

      ```javascript
      var item = Ember.Object.extend({
        castedString: asFloat('33.33'),
        castedInt: asFloat('1'),
        castedCP: asFloat(sum('castedString', 'castedInt'))
      }).create();

      item.get('castedString'); // 33.33
      item.get('castedInt');    // 1.0
      item.get('castedCP');     // 34.33
      ```

      @method macros.asFloat
      @param value The value to cast. It can be a number, a numeric string or a property key.
      @return {Number} Returns casted float.
    */
    __exports__["default"] = parseComputedPropertyMacro(parseFloat);
  });
define("ember-cpm/macros/as-int",
  ["../utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var parseComputedPropertyMacro = __dependency1__.parseComputedPropertyMacro;

    /**
      Converts the value in the given dependent key into an integer.

      Note that it returns NaN when the dependent key contains `null`, `undefined` or an invalid string.

      Example

      ```javascript
      var item = Ember.Object.extend({
        stringPrice: '123',
        price: asInt('stringPrice')
        invalid: asInt('abc')
      }).create();

      item.get('price');   // 123
      item.get('invalid'); // NaN
      ```

      @method macros.asInt
      @param value The value to cast. It can be a numbed, a numeric string or a property key.
      @return {Number} Returns casted integer.
    */
    __exports__["default"] = parseComputedPropertyMacro(function (raw) {
      return parseInt(raw, 10);
    });
  });
define("ember-cpm/macros/concat",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var guidFor = Ember.guidFor;
    var arrayComputed = Ember.arrayComputed;

    var a_forEach = Ember.ArrayPolyfills.forEach;
    var a_slice   = Array.prototype.slice;

    /*
       Returns the index where an item is to be removed from, or placed into, for
       an EmberCPM.Macros.concat array.

       This is the index of the item within its dependent array, offset by the
       lengths of all prior dependent arrays.
    */
    function getIndex(changeMeta, instanceMeta, dependentArrayDelta) {
      var dependentArrayGuid = guidFor(changeMeta.arrayChanged);

      if (!(dependentArrayGuid in instanceMeta.dependentGuidToIndex)) {
        recomputeGuidIndexes(instanceMeta, changeMeta.property._dependentKeys, this);
      }

      var dependentArrayLengths = instanceMeta.dependentArrayLengths;
      var dependentArrayIndex = instanceMeta.dependentGuidToIndex[dependentArrayGuid];
      var offset = 0, arrayIndex;

      // offset is the sum of the lengths of arrays to our left
      for (var i = 0; i < dependentArrayIndex; ++i) {
        offset += (dependentArrayLengths[i] || 0);
      }

      arrayIndex = offset + changeMeta.index;
      dependentArrayLengths[dependentArrayIndex] = (get(changeMeta.arrayChanged, 'length') || 0) + dependentArrayDelta;

      return arrayIndex;
    }

    function recomputeGuidIndexes(instanceMeta, keys, context) {
      instanceMeta.dependentGuidToIndex = {};
      a_forEach.call(keys, function (key, idx) {
        instanceMeta.dependentGuidToIndex[guidFor(get(this, key))] = idx;
      }, context);
    }

    /**
      Keeps n arrays concatenated using `Ember.ArrayComputed`.

      Example:
      ```js
      obj = Ember.Object.createWithMixins({
        itemsA: [],
        itemsB: [],
        itemsC: [],
        allItems: EmberCPM.Macros.concat('itemsA', 'itemsB', 'itemsC');
      });

      obj.get('itemsA').pushObjects(['a', 'b']);
      obj.get('allItems') //=> ['a', 'b']

      obj.get('itemsB').pushObjects(['c']);
      obj.get('allItems') //=> ['a', 'b', 'c']

      obj.get('itemsC').pushObjects(['d']);
      obj.get('allItems') //=> ['a', 'b', 'c', 'd']

      obj.get('itemsB').pushObjects(['e', 'f']);
      obj.get('allItems') //=> ['a', 'b', 'c', 'e', 'f', 'd']
      ```

      @method macros.concat
      @param *arguments Dependent keys with the arrays to concat.
      @return {Array}
    */
    __exports__["default"] = function EmberCPM_concat() {
      var args = a_slice.call(arguments);
      args.push({
        initialize: function (array, changeMeta, instanceMeta) {
          instanceMeta.dependentArrayLengths = new Array(changeMeta.property._dependentKeys.length);
          // When items are added or removed, we have access to the array that was
          // changed, but not its dependent key, so we use its guid as the key to
          // determine its index in the array of dependent keys.
          instanceMeta.dependentGuidToIndex = {};

          return array;
        },

        addedItem: function (array, item, changeMeta, instanceMeta) {
          var arrayIndex = getIndex.call(this, changeMeta, instanceMeta, 0);
          array.insertAt(arrayIndex, item);
          return array;
        },

        removedItem: function (array, item, changeMeta, instanceMeta) {
          var arrayIndex = getIndex.call(this, changeMeta, instanceMeta, -1);
          array.removeAt(arrayIndex);
          return array;
        }
      });

      return arrayComputed.apply(null, args);
    }
  });
define("ember-cpm/macros/conditional",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    /**
       Conditional computed property

       Example:
       ```js
        var Person = Ember.Object.extend({
          canDrink: EmberCPM.Macros.conditional(Ember.computed.gte('age', 21), 'yes', 'no')
        });
        var boy = Person.create({age: 15});

        boy.get('canDrink') // 'no'
      ```
      @method macros.conditions
      @param {String|ComputedProperty} Dependent key or CP with truthy/falsy value.
      @param                           valIfTrue Value if the first params is truthy
      @param                           valIfTrue Value if the first params is falsy
      @return the second or third parameter.
     */
    __exports__["default"] = function EmberCPM_conditional(condition, valIfTrue, valIfFalse) {
      var isConditionComputed = Ember.Descriptor === condition.constructor;
      var propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

      propertyArguments.push(function(/* key, value, oldValue */) {
        var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

        return conditionEvaluation ? valIfTrue : valIfFalse;
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/difference",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    /**
      Returns the difference between the given elements

      Example

      ```javascript
      var item = Ember.Object.extend({
        benefit: difference('sellPrice', 'buyPrice')
      }).create({sellPrice: 30, buyPrice: 22});

      item.get('benefit'); // 8
      ```

      @method macros.difference
      @param {Number|String|ComputedProperty} firstNumber First operand
      @param {Number|String|ComputedProperty} lastNumber  Last operand
      @return {Number} Difference between the operands.
    */
    __exports__["default"] = function EmberCPM_difference() {
      var mainArguments = Array.prototype.slice.call(arguments);
      var propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        switch (mainArguments.length) {
          case 0:
            return 0;
          case 1:
            return getVal.call(this, mainArguments[0]);
          default:
            return getVal.call(this, mainArguments[0]) - getVal.call(this, mainArguments[1]);
        }
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/encode-uri-component",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Encodes the given value to make it URL safe

      Example

      ```javascript
      var item = Ember.Object.extend({
        url: 'http://example.com/one and two'
        safeUrl: encodeURIComponent('url')
      }).create();

      item.get('safeUrl'); // 'http%3A%2F%2Fexample.com%2Fone%20and%20two'
      ```

      @method macros.encodeURIComponent
      @param {String} dependentKey String with the dependent key which value will be encoded.
      @return {String} A sanitized string
    */
    __exports__["default"] = function EmberCPM_encodeURIComponent(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) {
          return value;
        }
        return encodeURIComponent(value);
      });
    }
  });
define("ember-cpm/macros/encode-uri",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Encodes the given string to make it a valid url

      Example

      ```javascript
      var item = Ember.Object.extend({
        url: 'http://example.com/one and two'
        safeUrl: encodeURIComponent('url')
      }).create();

      item.get('safeUrl'); // 'http://example.com/one%20and%20two'
      ```

      @method macros.encodeURI
      @param {String} dependentKey String with the dependent key which value will be encoded.
      @return {String} A encoded url
    */
    __exports__["default"] = function EmberCPM_encodeURI(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) {
          return value;
        }
        return encodeURI(value);
      });
    }
  });
define("ember-cpm/macros/first-present",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var isBlank = Ember.isBlank;

    var a_slice = Array.prototype.slice;

    // isBlank was introduced in Ember 1.5, backport if necessary.
    if (!isBlank) {
      isBlank = function(obj) {
        return Ember.isEmpty(obj) || (typeof obj === 'string' && obj.match(/\S/) === null);
      };
    }

    var isPresent = function(value) {
      return !isBlank(value);
    };

    /**
      Returns the first argument that is not blank (as in Ember.isBlank)

      Example

      ```javascript
      var obj = Ember.Object.extend({
        nickname: '',
        name: 'Jean-Luc',
        email: 'jean@starship-enterprise.space',
        displayName: firstPresent('nickname', 'name', 'email')
      }).create();


      item.get('displayName'); // 'Jean-Luc'
      ```

      @method macros.firstPresent
      @param *arguments
      @return The first arguments that is not blank.
    */
    __exports__["default"] = function EmberCPM_firstPresent() {
      var properties = a_slice.call(arguments);
      var computedArgs = a_slice.call(properties);

      computedArgs.push(function() {
        var that = this;
        var property = Ember.A(properties).find(function(key) {
          return isPresent(get(that, key));
        });

        if (property) { return get(that, property); }
      });

      return computed.apply(this, computedArgs);
    }
  });
define("ember-cpm/macros/fmt",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberString = Ember.String;

    var a_slice = Array.prototype.slice;

    /**
      Generates a string interpolating the given values.

      Example

      ```javascript
      var teacher = Ember.Object.extend({
        name: 'Miguel',
        course: 'Javacript',
        catchPhrase: fmt('name', 'course', 'Hi, my name is %@ and I will teach you %@')
      }).create();


      teacher.get('catchPhrase'); // 'Hi, my name is Miguel and I will teach you Javascript'
      ```

      @method macros.fmt
      @param *arguments The last element is the string to format. The rest of the arguments are the dependent key with the values to interpolate.
                        The string interpolations follows the same rules in `Ember.String.fmt`
      @return The formatted string.
    */
    __exports__["default"] = function EmberCPM_fmt() {
      var formatString = '' + a_slice.call(arguments, -1),
          properties   = a_slice.call(arguments, 0, -1),
          propertyArguments = a_slice.call(arguments, 0 , -1);

      propertyArguments.push(function(){
        var values = [], i, value;

        for (i = 0; i < properties.length; ++i) {
          value = get(this, properties[i]);
          if (value === undefined) { return undefined; }
          if (value === null)      { return null; }
          values.push(value);
        }

        return EmberString.fmt(formatString, values);
      });

      return computed.apply(this, propertyArguments);

    }
  });
define("ember-cpm/macros/html-escape",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberHandlebars = Ember.Handlebars;

    /**
      Returns an Handlebars.SafeString with escaped text.

      Example

      ```javascript
      var obj = Ember.Object.extend({
        escaped: htmlEscape('value')
      }).create({value: '<em>Hi</em>'});

      obj.get('escaped'); // '&lt;em&gt;Hi&lt;/em&gt;'
      ```

      @method macros.htmlScape
      @param {String} Dependent key with the string to scape.
      @return {Ember.Handlebars.SafeString} The escaped string.
    */
    __exports__["default"] = function EmberCPM_htmlEscape(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        if (value == null) {
          return value;
        }

        var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
        return new EmberHandlebars.SafeString(escapedExpression);
      });

    }
  });
define("ember-cpm/macros/if-null",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Returns the value in the given dependent key, or if is null, the provided default value.

      Example

      ```javascript
      var obj = Ember.Object.extend({
        username: ifNull('name', 'Anonymous')
      }).create();

      obj.get('username'); // 'Anonymous'
      ```

      @method macros.ifNull
      @param {String} dependentKey Name of the key with the possible null value.
      @param          defaultValue Value that the CP will return if the dependent key is null.
      @return
    */
    __exports__["default"] = function EmberCPM_ifNull(dependentKey, defaultValue) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        return value == null ? defaultValue : value;
      });
    }
  });
define("ember-cpm/macros/join",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var a_slice = Array.prototype.slice;

    /**
      Joins the strings in the given property keys.

      Example

      ```javascript
      var picard = Ember.Object.extend({
        firstName: 'Jean-Luc',
        lastName:  'Picard',
        fullName:  join('firstName', 'lastName', ' ')
      }).create();

      picard.get('fullName'); // 'Jean-Luc Picard'
      ```

      @method macros.join
      @param *arguments The last argument is the separator string. The rest are the dependent keys with the strings to join.
      @return {String}  The joined string.
    */
    __exports__["default"] = function EmberCPM_join() {
      var separator  = a_slice.call(arguments, -1);
      var properties = a_slice.call(arguments, 0, -1);

      var cp = computed(function(){
        var that = this;
        return properties.map(function(key) {
          return get(that, key);
        }).join(separator);
      });

      return cp.property.apply(cp, properties);
    }
  });
define("ember-cpm/macros/mean",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    /**
      Calculate the arithmetic mean of some numeric properties, numeric literals,
      and/or arrays of numeric properties and literals.

      If any of its elements is an array it calculates the mean with its elements.

      Example

      ```javascript
      var obj = Ember.Object.extend({
        lowestPrice: 8,
        highestPrice: 10,
        ages: [10, 20, 30],
        avgPrice: mean('lowestPrice', 'highestPrice'), // 9
        avgAge: mean('ages'),                          // 20
        avgCustom: mean(4, 10)                         // 7
      });
      ```

      @method macros.mean
      @param *arguments It can be a number, an array of numbers, a property key pointing to any of those, or another computed property.
      @return {Number}  The arithmetical mean of the given values.
     */
    __exports__["default"] = function EmberCPM_mean () {
      var mainArguments = Array.prototype.slice.call(arguments);
      var propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        var sum = 0;
        var count = 0;
        var self = this;

        mainArguments.forEach(function (item) {
          var v = getVal.call(self, item);
          switch (Ember.typeOf(v)) {
            case 'number': // Number case
              count += 1;
              sum += v;
              break;
            case 'array': // Array case
              sum += v.reduce(function (p, i) { return p + i;}, 0); // sum of array
              count += v.length;
              break;
            case 'undefined':
            case 'null':
              break;
            default:
              throw 'Unsupported value type: %@'.fmt(Ember.typeOf(v));
          }
        });
        return count > 0 ? sum/count : 0;
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/not-among",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Opposite or `EmberCPM.macros.among`

      @method macros.notAmong
      @param {String} dependentKey Dependent key which value must not be among the given values.
      @param          *values      Values among which the dependentKey must not be included.
      @return {Boolean} Returns false the value in the given dependent key is among the privided values.
    */
    __exports__["default"] = function EmberCPM_notAmong(dependentKey) {
      var properties = Array.prototype.slice.call(arguments, 1);

      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        for (var i = 0, l = properties.length; i < l; ++i) {
          if (properties[i] === value) {
            return false;
          }
        }

        return true;
      });
    }
  });
define("ember-cpm/macros/not-equal",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Opposite or `Ember.computed.equal`

      @method macros.notEqual
      @param {String} dependentKey Dependent key which value must not be equal to the given value.
      @param {String} targetValue  Value to compare against.
      @return {Boolean} Returns true if the value in dependentKey is different to the targetValue
    */
    __exports__["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
      return computed(dependentKey, function(){
        return get(this, dependentKey) !== targetValue;
      });
    }
  });
define("ember-cpm/macros/not-match",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Opposite or `Ember.computed.match`

      @method macros.notMatch
      @param {String} dependentKey Dependent key which value must not be match to the given regexp.
      @param {String} regexp       Regular expression to compare with.
      @return {Boolean} Returns true if the value in dependentKey does not match the given regexp.
    */
    __exports__["default"] = function EmberCPM_notMatch(dependentKey, regexp) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        return typeof value === 'string' ? !value.match(regexp) : true;
      });
    }
  });
define("ember-cpm/macros/product",
  ["../utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var reduceComputedPropertyMacro = __dependency1__.reduceComputedPropertyMacro;

    /**
      Returns an the multiplication of its arguments.

      Example

      ```javascript
      var obj = Ember.Object.extend({
        a: 6,
        b: 7,
        c: 2,
        d: product('a', 'b', 'c'),      // 84
        e: product('a', 'b', 'c', 2)    // 168
      });
      ```

      @method macros.product
      @param *arguments It can be numbers, property keys containing numbers or other computed properties.
      @return {Number} The product of all its arguments.
    */
    __exports__["default"] = reduceComputedPropertyMacro(
      function (prev, item) {
        return prev * item;
      }
    );
  });
define("ember-cpm/macros/promise",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Returns a promise that resolved to the value in the given dependent key

      Example

      ```javascript
        var obj = Ember.Object.extend({
          asPromise: promise('value')
        }).create({value: 'Kangaroo'});
        obj.get('asPromise').then(function(x){ console.log(x); }) // Logs 'Kangaroo'
      ```

      @method macros.promise
      @param {String} dependentKey The property key with the resolve value of the promise.
      @return {Promise} A promise
    */
    __exports__["default"] = function EmberCPM_promise(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) { return value; }
        // TODO: Use RSVP?
        return Ember.$.when(value);
      });
    }
  });
define("ember-cpm/macros/quotient",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    /**
      Returns an the float quotient of divide the first argument by the second one.

      Example

      ```javascript
      var MyType = Ember.Object.extend({
        a: 6,
        b: 2,
        c: 5,
        d: quotient('a', 'b'),                    // 3
        e: quotient('a', 3),                      // 2
        f: quotient(Ember.computed.alias('c'), 2) // 2.5
      });
      ```

      @method macros.quotient
      @param dividend Can be a number, a property key containing a number or another computed property.
      @return {Float} The quotient of the division.
    */
    __exports__["default"] = function EmberCPM_quotient() {
      var mainArguments = Array.prototype.slice.call(arguments);
      var propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        switch (mainArguments.length) {
          case 0:
            return 0;
          case 1:
            return getVal.call(this, mainArguments[0]);
          default:
            return getVal.call(this, mainArguments[0]) / getVal.call(this, mainArguments[1]);
        }
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/safe-string",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberHandlebars = Ember.Handlebars;

    /**
      Casts the value of the given dependent key to a Handlebars.SafeString

      @method macros.safeString
      @param {String} Dependent key with the string to cast.
      @return {Ember.Handlebars.SafeString} The casted string.
    */
    __exports__["default"] = function EmberCPM_safeString(dependentKey) {

      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        return value && new EmberHandlebars.SafeString(value);
      });

    }
  });
define("ember-cpm/macros/sum-by",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var reduceComputed = Ember.reduceComputed;

    /**
     * DEPRECATED - 10/14/2014
     * Rather than use sumBy, developers should use composed computed property macros
     *
     * OLD WAY
     * {
     *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
     *   listValSum: sumBy('list', 'val')
     * }
     *
     * NEW WAY
     * {
     *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
     *   listValSum: sum(mapBy('list', 'val'))
     * }
     */

    __exports__["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
      
      return reduceComputed(dependentKey + '.@each.' + propertyKey, {
        initialValue: 0.0,

        addedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
          return accumulatedValue + parseFloat(get(item, propertyKey));
        },

        removedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
          return accumulatedValue - parseFloat(get(item, propertyKey));
        }
      });
    }
  });
define("ember-cpm/macros/sum",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var reduceComputedPropertyMacro = __dependency2__.reduceComputedPropertyMacro;
    var getVal = __dependency2__.getVal;
    /**
    *  Returns the sum of some numeric properties and numeric constants
    *
    *  Example: 6 + 7 + 2 = 84
    *
    *  Usage:
    *    a: 6,
    *    b: 7,
    *    c: 2,
    *    d: [1, 2, 3, 4],
    *    e: sum('a', 'b', 'c'), // 15
    *    f: sum('a', 'b', 'c', 2) // 17,
    *    g: sum('d') // 10
    */

    function singleValueOrArraySum(val) {
      if (Ember.isArray(val)) {
        return val.reduce(function (prev, item) {return prev + item;});
      }
      else {
        return val;
      }
    }

    var EmberCPM_sum = reduceComputedPropertyMacro(
      function (prev, item) {
        return singleValueOrArraySum(prev) + singleValueOrArraySum(item);
      },
      {
        singleItemCallback: function (item) {
          return singleValueOrArraySum(getVal.call(this, item));
        }
      }
    );

    __exports__["default"] = EmberCPM_sum;
  });
define("ember-cpm/utils",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    /**
     * Retain items in an array based on type
     * @param {array} arr  array to iterate over
     * @param {string} type string representation of type
     *
     * Example:
     * var x = ['a', 'b', 123, {hello: 'world'}];
     *
     * retainByType(x, 'string'); // ['a', 'b']
     * retainByType(x, 'number'); // [123]
     * retainByType(x, 'object'); // [{hello: 'world'}]
     *
     */
    function retainByType(arr, type) {
      return arr.reject(
        function (item) {
          return Ember.typeOf(item) !== type;
        }
      );
    }

    __exports__.retainByType = retainByType;
    function getDependentPropertyKeys(argumentArr) {
      return argumentArr.reduce(
        function (prev, item) {
          switch (Ember.typeOf(item)) {
            case 'string':
              prev.push(item);
              break;
            case 'number':
              break;
            default:
              if (item && item.constructor === Ember.Descriptor) {
                prev.pushObjects(item._dependentKeys);
              }
              break;
          }
          return prev;
        },
        []
      );
    }

    __exports__.getDependentPropertyKeys = getDependentPropertyKeys;/**
     * Evaluate a value, which could either be a property key or a literal
     * @param val value to evaluate
     *
     * if the value is a string, the object that the computed property is installed
     * on will be checked for a property of the same name. If one is found, it will
     * be evaluated, and the result will be returned. Otherwise the string value its
     * self will be returned
     *
     * All non-string values pass straight through, and are returned unaltered
     */
    function getVal(val) {
      if (Ember.typeOf(val) === 'string') {
        return Ember.get(this, val) || val;
      } else if (Ember.typeOf(val) === 'object' && Ember.Descriptor === val.constructor) {
        return val.altKey ? this.get(val.altKey) : val.func.apply(this);
      } else {
        return val;
      }
    }

    __exports__.getVal = getVal;
    /**
     * Generate a "parse-like" computed property macro
     * @param {function} parseFunction single-argument function that
     *  transforms a raw value into a "parsed" value
     *
     * i.e.,
     *
     * parseComputedPropertyMacro(function (raw) {return parseFloat(raw);});
     */
    function parseComputedPropertyMacro (parseFunction) {
      return function parseMacro(dependantKey) {
        var args = [];
        if (dependantKey) {
          args.push(dependantKey);
        }
        args.push(function (propKey, val) {
          if (['undefined', 'null'].indexOf(Ember.typeOf(dependantKey)) !== -1) {
            return NaN; // same as parseInt, parseFloat return for null or undefined
          }
          if (arguments.length === 1) {
            //getter
            var rawValue = this.get(dependantKey);
            // Have to check again for null/undefined values, since the first check
            // could have just been non-null property keys
            if (['undefined', 'null'].indexOf(Ember.typeOf(rawValue)) !== -1) {
              return NaN;
            }
            else {
              // Handle some unexpected behavior for empty-string property keys
              // related:
              //  https://github.com/emberjs/ember.js/commit/b7e82f43c3475ee7b166a2570b061f08c6c6c0f3#diff-22c6caff03531b3e718e9a8d82180833R31
              if ('string' === typeof rawValue && rawValue.length === 0) {
                return NaN;
              }
              else {
                return parseFunction(rawValue);
              }
            }
          }
          else {
            //setter
            //respect the type of the dependent property
            switch (Ember.typeOf(this.get(dependantKey))) {
              case 'number':
                this.set(dependantKey, parseFunction(val));
                break;
              default:
                this.set(dependantKey, val.toString());
                break;
            }
            return val;
          }
        });
        return Ember.computed.apply(this, args);
      };
    }

    __exports__.parseComputedPropertyMacro = parseComputedPropertyMacro;/**
     * Return a computed property macro
     * @param {[type]} reducingFunction [description]
     */
    function reduceComputedPropertyMacro(reducingFunction, options) {
      var opts = options || {};
      var singleItemCallback = opts.singleItemCallback || function (item) {return getVal.call(this,item);};

      return function () {
        var mainArguments = Array.prototype.slice.call(arguments); // all arguments
        var propertyArguments = getDependentPropertyKeys(mainArguments);

        propertyArguments.push(function () {
          var self = this;
          switch (mainArguments.length) {

            case 0:   // Handle zero-argument case
              return 0;

            case 1:   // Handle one-argument case
              return singleItemCallback.call(this, mainArguments[0]);

            default:  // Handle multi-argument case
              return mainArguments.reduce(
                function (prev, item, idx, enumerable) {
                  // Evaluate "prev" value if this is the first time the reduce callback is called
                  var prevValue = idx === 1 ? getVal.call(self, prev) : prev,

                    // Evaluate the "item" value
                    itemValue = getVal.call(self, item);

                  // Call the reducing function, replacing "prev" and "item" arguments with
                  // their respective evaluated values
                  return reducingFunction.apply(self, [prevValue, itemValue, idx, enumerable]);

                }
              );
          }
        });
        return Ember.computed.apply(this, propertyArguments);
      };
    }

    __exports__.reduceComputedPropertyMacro = reduceComputedPropertyMacro;
  });