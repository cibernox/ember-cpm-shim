"use strict";
var parseComputedPropertyMacro = require("../utils").parseComputedPropertyMacro;

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
  @param {String} dependentKey Depedent key which value will be casted to a float.
  @return {Number} Returns casted float.
*/
exports["default"] = parseComputedPropertyMacro (parseFloat);