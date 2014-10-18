"use strict";
var Ember = require("ember")["default"] || require("ember");
var getVal = require("../utils").getVal;
var getDependentPropertyKeys = require("../utils").getDependentPropertyKeys;

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