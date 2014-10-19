"use strict";
var Ember = require("ember")["default"] || require("ember");
var getVal = require("../utils").getVal;
var getDependentPropertyKeys = require("../utils").getDependentPropertyKeys;

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
exports["default"] = function EmberCPM_quotient() {
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