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

const ComputedProperty = require ('../computed-property');

/**
 * Create a generic computed property.
 *
 * @param descriptor            Computed property descriptor
 * @returns {ComputedProperty}
 */
function computed (descriptor) {
  return new ComputedProperty (descriptor);
}

module.exports = computed;

computed.constant = require ('./constant');

