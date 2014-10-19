"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;
var computed = Ember.computed;

/**
  Opposite or `Ember.computed.equal`

  @method macros.notEqual
  @param {String} dependentKey Dependent key which value must not be equal to the given value.
  @param {String} targetValue  Value to compare against.
  @return {Boolean} Returns true if the value in dependentKey is different to the targetValue

  @deprecated - 10/18/2014
  Rather than use notEqual, developers should use composed computed property macros

  Example:
    myProp: not(Ember.computed.equal('val', 'a'))
*/
exports["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
  
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}