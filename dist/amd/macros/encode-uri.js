define(
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