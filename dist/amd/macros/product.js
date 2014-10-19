define(
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