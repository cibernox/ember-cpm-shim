define(
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