!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.EmberCPM=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var among = _dereq_("./macros/among")["default"] || _dereq_("./macros/among");
var allEqual = _dereq_("./macros/all-equal")["default"] || _dereq_("./macros/all-equal");
var encodeURIComponent = _dereq_("./macros/encode-uri-component")["default"] || _dereq_("./macros/encode-uri-component");
var encodeURI = _dereq_("./macros/encode-uri")["default"] || _dereq_("./macros/encode-uri");
var firstPresent = _dereq_("./macros/first-present")["default"] || _dereq_("./macros/first-present");
var fmt = _dereq_("./macros/fmt")["default"] || _dereq_("./macros/fmt");
var htmlEscape = _dereq_("./macros/html-escape")["default"] || _dereq_("./macros/html-escape");
var ifNull = _dereq_("./macros/if-null")["default"] || _dereq_("./macros/if-null");
var notAmong = _dereq_("./macros/not-among")["default"] || _dereq_("./macros/not-among");
var notEqual = _dereq_("./macros/not-equal")["default"] || _dereq_("./macros/not-equal");
var notMatch = _dereq_("./macros/not-match")["default"] || _dereq_("./macros/not-match");
var promise = _dereq_("./macros/promise")["default"] || _dereq_("./macros/promise");
var safeString = _dereq_("./macros/safe-string")["default"] || _dereq_("./macros/safe-string");
var join = _dereq_("./macros/join")["default"] || _dereq_("./macros/join");
var sumBy = _dereq_("./macros/sum-by")["default"] || _dereq_("./macros/sum-by");
var sum = _dereq_("./macros/sum")["default"] || _dereq_("./macros/sum");
var concat = _dereq_("./macros/concat")["default"] || _dereq_("./macros/concat");
var conditional = _dereq_("./macros/conditional")["default"] || _dereq_("./macros/conditional");
var product = _dereq_("./macros/product")["default"] || _dereq_("./macros/product");
var quotient = _dereq_("./macros/quotient")["default"] || _dereq_("./macros/quotient");
var difference = _dereq_("./macros/difference")["default"] || _dereq_("./macros/difference");
var asFloat = _dereq_("./macros/asFloat")["default"] || _dereq_("./macros/asFloat");
var asInt = _dereq_("./macros/asInt")["default"] || _dereq_("./macros/asInt");

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

exports.VERSION = VERSION;
exports.Macros = Macros;
exports.install = install;

exports["default"] = {
  VERSION: VERSION,
  Macros: Macros,
  install: install
};
},{"./macros/all-equal":2,"./macros/among":3,"./macros/asFloat":4,"./macros/asInt":5,"./macros/concat":6,"./macros/conditional":7,"./macros/difference":8,"./macros/encode-uri":10,"./macros/encode-uri-component":9,"./macros/first-present":11,"./macros/fmt":12,"./macros/html-escape":13,"./macros/if-null":14,"./macros/join":15,"./macros/not-among":16,"./macros/not-equal":17,"./macros/not-match":18,"./macros/product":19,"./macros/promise":20,"./macros/quotient":21,"./macros/safe-string":22,"./macros/sum":24,"./macros/sum-by":23}],2:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var getVal = _dereq_("../utils").getVal;
var getDependentPropertyKeys = _dereq_("../utils").getDependentPropertyKeys;

/**
  Returns true if all the all its dependent values are equal between them.

  Example

  ```javascript
  var Cuboid = Ember.Object.extend({
    cube: allEqual('height', 'width', 'depth')
  });

  var shape = Cuboid.create({
    height: 6,
    width: 6,
    depth: 6
  });

  shape.get('cube'); // true
  shape.set('width', 4);
  shape.get('cube'); // false
  ```

  @method macros.allEqual
  @param *arguments Values or dependent keys that must be equal. It can be a values or the key of a
                    property in the object of the computed property.
  @return {Boolean} Returns true it all elements are equal
*/
exports["default"] = function EmberCPM_allEqual() {
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
},{"../utils":25}],3:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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
exports["default"] = function EmberCPM_among(dependentKey) {
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
},{}],4:[function(_dereq_,module,exports){
"use strict";
var parseComputedPropertyMacro = _dereq_("../utils").parseComputedPropertyMacro;

/**
  Converts the value in the given dependent key into a float.

  Note that it returns NaN when the dependent key contains `null`, `undefined` or an invalid string.

  Example

  ```javascript
  var item = Ember.Object.extend({
    stringPrice: '123.45',
    price: asFloat('stringPrice')
  }).create();

  item.get('price'); // 123.45
  ```

  @method macros.asFloat
  @param {String} dependentKey Dependent key which value will be casted to a float.
  @return {Number} Returns casted float.
*/
exports["default"] = parseComputedPropertyMacro (parseFloat);
},{"../utils":25}],5:[function(_dereq_,module,exports){
"use strict";
var parseComputedPropertyMacro = _dereq_("../utils").parseComputedPropertyMacro;

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
  @param {String} dependentKey Dependent key which value will be casted to a integer.
  @return {Number} Returns casted integer.
*/
exports["default"] = parseComputedPropertyMacro(function (raw) {
  return parseInt(raw, 10);
});
},{"../utils":25}],6:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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
exports["default"] = function EmberCPM_concat() {
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
},{}],7:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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
exports["default"] = function EmberCPM_conditional(condition, valIfTrue, valIfFalse) {
  var isConditionComputed = Ember.Descriptor === condition.constructor;
  var propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

  propertyArguments.push(function(/* key, value, oldValue */) {
    var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

    return conditionEvaluation ? valIfTrue : valIfFalse;
  });

  return Ember.computed.apply(this, propertyArguments);
}
},{}],8:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var getVal = _dereq_("../utils").getVal;
var getDependentPropertyKeys = _dereq_("../utils").getDependentPropertyKeys;

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
exports["default"] = function EmberCPM_difference() {
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
},{"../utils":25}],9:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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
exports["default"] = function EmberCPM_encodeURIComponent(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) {
      return value;
    }
    return encodeURIComponent(value);
  });
}
},{}],10:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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
exports["default"] = function EmberCPM_encodeURI(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) {
      return value;
    }
    return encodeURI(value);
  });
}
},{}],11:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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
  return ! isBlank(value);
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
exports["default"] = function EmberCPM_firstPresent() {
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
},{}],12:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var EmberString = Ember.String;

var a_slice = Array.prototype.slice;

exports["default"] = function EmberCPM_fmt() {
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
},{}],13:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

exports["default"] = function EmberCPM_htmlEscape(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    if (value == null) {
      return value;
    }

    var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
    return new EmberHandlebars.SafeString(escapedExpression);
  });

}
},{}],14:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_ifNull(dependentKey, defaultValue) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}
},{}],15:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var a_slice = Array.prototype.slice;

exports["default"] = function EmberCPM_join() {
  var separator  = a_slice.call(arguments, -1),
      properties = a_slice.call(arguments, 0, -1);

  var cp = computed(function(){
    var that = this;
    return properties.map(function(key) {
      return get(that, key);
    }).join(separator);
  });

  return cp.property.apply(cp, properties);
}
},{}],16:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notAmong(dependentKey) {
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
},{}],17:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}
},{}],18:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notMatch(dependentKey, regexp) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}
},{}],19:[function(_dereq_,module,exports){
"use strict";
var reduceComputedPropertyMacro = _dereq_("../utils").reduceComputedPropertyMacro;

/**
*  Returns the product of some numeric properties and numeric constants
*
*  Example: 6 * 7 * 2 = 84
*
*  Usage:
*    a: 6,
*    b: 7,
*    c: 2,
*    d: product('a', 'b', 'c'), // 84
*    e: product('a', 'b', 'c', 2) // 168
*/

exports["default"] = reduceComputedPropertyMacro(
  function (prev, item) {
    return prev * item;
  }
);
},{"../utils":25}],20:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

// TODO: Use RSVP?
exports["default"] = function EmberCPM_promise(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return Ember.$.when(value);
  });
}
},{}],21:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var getVal = _dereq_("../utils").getVal;
var getDependentPropertyKeys = _dereq_("../utils").getDependentPropertyKeys;

exports["default"] = function EmberCPM_quotient() {
  var mainArguments = Array.prototype.slice.call(arguments), // all arguments
    propertyArguments = getDependentPropertyKeys(mainArguments);

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
},{"../utils":25}],22:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

exports["default"] = function EmberCPM_safeString(dependentKey) {

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new EmberHandlebars.SafeString(value);
  });

}
},{}],23:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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

exports["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
  
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
},{}],24:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var reduceComputedPropertyMacro = _dereq_("../utils").reduceComputedPropertyMacro;
var getVal = _dereq_("../utils").getVal;
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

exports["default"] = EmberCPM_sum;
},{"../utils":25}],25:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

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

exports.retainByType = retainByType;
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

exports.getDependentPropertyKeys = getDependentPropertyKeys;/**
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

exports.getVal = getVal;
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
  return function parseMacro (dependantKey) {
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

exports.parseComputedPropertyMacro = parseComputedPropertyMacro;/**
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

exports.reduceComputedPropertyMacro = reduceComputedPropertyMacro;
},{}]},{},[1])
(1)
});