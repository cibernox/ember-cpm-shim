define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    /**
      Returns a promise that resolved to the value in the given dependent key

      Example

      ```javascript
        var obj = Ember.Object.extend({
          asPromise: promise('value')
        }).create({value: 'Kangaroo'});
        obj.get('asPromise').then(function(x){ console.log(x); }) // Logs 'Kangaroo'
      ```

      @method macros.promise
      @param {String} dependentKey The property key with the resolve value of the promise.
      @return {Promise} A promise
    */
    __exports__["default"] = function EmberCPM_promise(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) { return value; }
        // TODO: Use RSVP?
        return Ember.$.when(value);
      });
    }
  });