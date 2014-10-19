define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var reduceComputed = Ember.reduceComputed;

    /**
      Sums the mapped values on the key in the elements of the given array.

      This property is deprecated. Use a composition of `sum` and `mapBy`, like: `listValSum: sum(mapBy('list', 'val'))`

      @method macros.sumBy
      @param {String} dependentKey The key with the array.
      @param {String} propertyKey  The key of the items we want to sum by.
      @return {Number} The product of all its arguments.
      @deprecated
    */
    __exports__["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
      
      return reduceComputed(dependentKey + '.@each.' + propertyKey, {
        initialValue: 0.0,

        addedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
          return accumulatedValue + parseFloat(get(item, propertyKey));
        },

        removedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
          return accumulatedValue - parseFloat(get(item, propertyKey));
        }
      });
    }
  });