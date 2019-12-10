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

const { get, set } = require ('lodash');
const ComputedProperty = require ('../computed-property');

/**
 * Create a constant computed property on the target object. A constant property
 * is one that cannot be changed once set. You must provide the property's value
 * when it is declared.
 *
 * @param name
 * @param descriptor
 * @return {ComputedProperty}
 */
function alias (name, descriptor) {
  const enumerable = get (descriptor, 'enumerable', false);
  const configurable = get (descriptor, 'configurable', false);

  return new ComputedProperty ({
    enumerable,
    configurable,

    get () {
      return get (this, name);
    },

    set (value) {
      set (this, name, value);
    }
  });
}

module.exports = alias;
