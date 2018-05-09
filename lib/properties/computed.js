/*
 * Copyright (c) 2018 One Hill Technologies, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const PropertyDescriptor = require ('./property-descriptor');
const { get } = require ('lodash');

/**
 * @class ComputedProperty
 *
 * Defines computed properties on the target object.
 */
class ComputedProperty extends PropertyDescriptor {
  constructor (descriptor) {
    super (descriptor);
  }
}

function computed (descriptor) {
  return new ComputedProperty (descriptor);
}

/**
 * Create a constant computed property on the target object. A constant property
 * is one that cannot be changed once set. You must provide the property's value
 * when it is declared.
 *
 * @param value
 * @return {ComputedProperty}
 */
computed.constant = function (value, descriptor) {
  const enumerable = get (descriptor, 'enumerable', false);
  const configurable = get (descriptor, 'configurable', false);

  return new ComputedProperty ({
    writeable: false,
    value: value,
    enumerable,
    configurable
  });
};

module.exports = computed;
