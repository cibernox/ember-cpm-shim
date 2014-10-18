define(
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