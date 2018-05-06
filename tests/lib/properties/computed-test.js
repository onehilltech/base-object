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

const { expect } = require ('chai');
const { computed } = require ('../../../lib');
const PropertyDescriptor = require ('../../../lib/properties/property-descriptor');

describe ('lib | properties | computed', function () {
  it ('should define a computed property', function () {
    let obj = {
      fullName: computed ({
        get () {}
      })
    };

    expect (obj.fullName).to.be.instanceof (PropertyDescriptor);
  });

  describe ('computed.constant', function () {
    let obj = {
      DEFAULT_SIZE: computed.constant (5)
    };

    expect (obj.DEFAULT_SIZE).to.be.instanceof (PropertyDescriptor);
  })
});