define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    /**
       Conditional computed property

       Example:
       ```js
        var Person = Ember.Object.extend({
          canDrink: EmberCPM.Macros.conditional(Ember.computed.gte('age', 21), 'yes', 'no')
        });
        var boy = Person.create({age: 15});

        boy.get('canDrink') // 'no'
      ```
      @method macros.conditions
      @param {String|ComputedProperty} Dependent key or CP with truthy/falsy value.
      @param                           valIfTrue Value if the first params is truthy
      @param                           valIfTrue Value if the first params is falsy
      @return the second or third parameter.
     */
    __exports__["default"] = function EmberCPM_conditional(condition, valIfTrue, valIfFalse) {
      var isConditionComputed = Ember.Descriptor === condition.constructor;
      var propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

      propertyArguments.push(function(/* key, value, oldValue */) {
        var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

        return conditionEvaluation ? valIfTrue : valIfFalse;
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });