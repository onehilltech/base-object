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

/**
 * @class PropertyDescriptor
 *
 * Base class for all property definitions. The default behavior of the property
 * descriptor class is to define a ES6 property via Object.defineProperty() on the
 * target BaseObject. This can be defined on the object prototype, or an instance of
 * the prototype.
 *
 * Subclasses can override the behavior of defineProperty() to provide a customized
 * behavior for how to define a property on the target object.
 */
class PropertyDescriptor {
  constructor (descriptor) {
    this.descriptor = descriptor;
  }

  /**
   * Define a property on the target object.
   *
   * @param obj         Target object.
   * @param name        Name of the property.
   */
  defineProperty (obj, name) {
    Object.defineProperty (obj, name, this.descriptor);
  }
}

module.exports = PropertyDescriptor;
