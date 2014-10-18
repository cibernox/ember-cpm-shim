"use strict";
var parseComputedPropertyMacro = require("../utils").parseComputedPropertyMacro;

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