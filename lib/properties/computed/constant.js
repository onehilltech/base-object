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

const { get } = require ('lodash');
const ComputedProperty = require ('../computed-property');

/**
 * Define a property that cannot be changed.
 *
 * @param value
 * @param descriptor
 * @return {ComputedProperty}
 */
function constant (value, descriptor) {
  const enumerable = get (descriptor, 'enumerable', false);
  const configurable = get (descriptor, 'configurable', false);

  const property = new ComputedProperty ({
    writeable: false,
    enumerable,
    configurable,

    get () {
      return value;
    },

    set () {
      throw new Error (`${property.name} is a constant property and cannot be changed.`)
    }
  });

  return property;
}

module.exports = constant;
