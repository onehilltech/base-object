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

const PropertyDescriptor = require ('../../../lib/properties/property-descriptor');
const { expect } = require ('chai');

describe ('lib | properties | PropertyDescriptor', function () {
  describe ('defineProperty', function () {
    it ('should define a property on the target object', function () {
      let obj = {
        firstName: 'Jack',
        lastName: 'Black',
      };

      let property = new PropertyDescriptor ({
        get () { return `${this.firstName} ${this.lastName}`; }
      });

      property.defineProperty (obj, 'fullName');

      expect (obj.fullName).to.equal ('Jack Black');
    });
  });
});