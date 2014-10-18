define(
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