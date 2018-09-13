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

const {BaseObject, Mixin, computed} = require ('../../lib');

const {expect} = require ('chai');
const {AssertionError} = require ('assert');

describe ('lib | BaseObject', function () {
  describe ('class', function () {
    it ('should have a set of class properties', function () {
      expect (BaseObject).to.have.keys (['PrototypeMixin','ClassMixin','extend','extendClass', 'create', 'isSubclassOf']);
      expect (BaseObject).to.be.a ('function');
    });
  });

  describe ('extend', function () {
    it ('should extend base object with no additional properties', function () {
      const A = BaseObject.extend ();

      expect (A).to.be.a ('function');
      expect (A).to.have.keys (['PrototypeMixin','ClassMixin','extend','create','isSubclassOf']);
      expect (Object.keys (A.prototype)).to.have.length (0);

      let a = new A ();
      expect (Object.keys (a)).to.eql (['__boid__']);
    });

    it ('should extend base object with properties', function () {
      const A = BaseObject.extend ({
        name: 'John',
        a () { },
        b () { }
      });

      expect (A.prototype).to.have.keys (['a','b','name']);

      let a = new A ();
      expect (a.a).to.be.a ('function');
      expect (a.b).to.be.a ('function');
      expect (a.name).to.be.a ('string');
    });

    it ('should support multiple levels of inheritance', function () {
      const C1 = BaseObject.extend ({
        a () {
          return 1;
        }
      });

      const C2 = C1.extend ({
        a () {
          return this._super.call (this, ...arguments) + 2;
        }
      });

      const C3 = C2.extend ({
        a () {
          return this._super.call (this, ...arguments) + 3;
        }
      });

      const c = new C3 ();

      expect (c.a ()).to.equal (6);
    });

    it ('should override base methods', function () {
      const Base = BaseObject.extend ({
        a () {
          return 1;
        }
      });

      const A = Base.extend ({
        a ( ) {
          return this._super.call (this, ...arguments) + 2;
        }
      });

      const a = new A ();

      expect (a.a ()).to.equal (3);
    });

    it ('should overwrite base method', function () {
      const Base = BaseObject.extend ({
        a () {
          return 1;
        }
      });

      const A = Base.extend ({
        a ( ) {
          return 2;
        }
      });

      const a = new A ();

      expect (a.a ()).to.equal (2);
    });

    it ('should mixin an object', function () {
      const Base = BaseObject.extend ({
        a () {
          return 1;
        }
      });

      const M = Mixin.create ({
        z () {
          return 10;
        }
      });

      const A = Base.extend (M, {
        a ( ) {
          return 2;
        }
      });

      const a = new A ();

      expect (a.z ()).to.equal (10);
    });

    it ('should overwrite mixin', function () {
      const Base = BaseObject.extend ({
        a () {
          return 1;
        }
      });

      const M = Mixin.create ({
        z () {
          return 10;
        }
      });

      const A = Base.extend (M, {
        z ( ) {
          return 2;
        }
      });

      const a = new A ();

      expect (a.z ()).to.equal (2);
    });

    it ('should override mixin', function () {
      const Base = BaseObject.extend ({
        a () {
          return 1;
        }
      });

      const M = Mixin.create ({
        z () {
          return 10;
        }
      });

      const A = Base.extend (M, {
        z ( ) {
          return this._super.call (this, ...arguments) + 2;
        }
      });

      const a = new A ();

      expect (a.z ()).to.equal (12);
    });
  });

  describe ('extendClass', function () {
    it ('should extend a raw class', function () {
      class A {
        a () {
          this.base = true;
        }
      }

      let B = BaseObject.extendClass (A,  {
        a () {
          this._super.call (this, ...arguments);
        },

        b () {
          this.derived = true;
        }
      });

      let b1 = new B ();
      expect (b1).to.be.instanceof (B);
      expect (b1).to.be.instanceof (A);

      b1.a ();
      expect (b1.base).to.equal (true);

      b1.b ();
      expect (b1.derived).to.equal (true);

      let b2 = B.create ();
      expect (b2).to.be.instanceof (B);
      expect (b2).to.be.instanceof (B);

      let C = B.extend ({
        c () {

        }
      });

      let c = new C ();
      expect (c).to.be.instanceof (A);
    });
  });

  describe ('create', function () {
    it ('should create an object', function () {
      const A = BaseObject.extend ({
        name: null,

        a () { }
      });

      let a = A.create ();

      expect (a.name).to.be.null;
    });

    it ('should initialize properties', function () {
      const A = BaseObject.extend ({
        name: null,

        a () {

        }
      });

      let a = A.create ({
        name: 'Jack'
      });

      expect (a.name).to.equal ('Jack');
    });
  });

  describe ('isSubclassOf', function () {
    const A = BaseObject.extend ();
    const B = A.extend ({});
    const C = B.extend ({});

    const D = BaseObject.extend ();

    // You cannot be a subclass of yourself.
    expect (A.isSubclassOf (A)).to.equal (false);

    // C extends B extends A
    expect (B.isSubclassOf (A)).to.equal (true);
    expect (C.isSubclassOf (A)).to.equal (true);
    expect (C.isSubclassOf (B)).to.equal (true);

    // different type hierarchy.
    expect (D.isSubclassOf (A)).to.equal (false);
  });

  describe ('concatProperties', function () {
    it ('should concat properties', function () {
      const A = BaseObject.extend ({
        concatProperties: ['names'],

        names: ['James','Sue']
      });

      const B = A.extend ({
        names: ['Jennifer', 'Alan']
      });

      let b = new B ();

      expect (b.concatProperties).to.eql (['names']);
      expect (B.prototype.names).to.eql (['James','Sue','Jennifer','Alan']);
      expect (b.names).to.eql (['James','Sue','Jennifer','Alan']);
    });

    it ('should allow extend type to add to concatProperties', function () {
      const A = BaseObject.extend ({
        concatProperties: ['names'],

        names: ['James','Sue']
      });

      const B = A.extend ({
        concatProperties: ['words'],

        names: ['Jennifer', 'Alan'],
        words: 'good morning'.split (' ')
      });

      const C = B.extend ({
        words: 'good night'.split (' ')
      });

      let a = new A ();
      let b = new B ();
      let c = new C ();

      // check the prototypes of each
      expect (A.prototype.concatProperties).to.eql (['names']);
      expect (B.prototype.concatProperties).to.eql (['names','words']);
      expect (C.prototype.concatProperties).to.eql (['names','words']);

      // check the instances of each
      expect (a.concatProperties).to.eql (['names']);
      expect (a.names).to.eql (['James','Sue']);

      expect (b.concatProperties).to.eql (['names','words']);
      expect (b.names).to.eql (['James','Sue','Jennifer','Alan']);

      expect (c.concatProperties).to.eql (['names','words']);
      expect (c.names).to.eql (['James','Sue','Jennifer','Alan']);
      expect (c.words).to.eql (['good','morning','good','night']);
    });

    it ('should allow instance to concat properties', function () {
      const A = BaseObject.extend ({
        concatProperties: ['names'],

        names: ['James','Sue']
      });

      let a = new A ({
        names: ['Adam','Will']
      });

      expect (A.prototype.names).to.eql (['James','Sue']);
      expect (a.names).to.eql (['James','Sue','Adam','Will']);
    });

    it ('should not allow instance to update concatProperties', function () {
      const A = BaseObject.extend ({
        concatProperties: ['names'],

        names: ['James','Sue']
      });

      expect (() => new A ({
          concatProperties: ['words']
        })
      ).to.throw (AssertionError);
    })
  });

  describe ('mergedProperties', function () {
    it ('should merge properties', function () {
      const A = BaseObject.extend ({
        mergedProperties: ['options'],

        options: {
          open: true
        }
      });

      const B = A.extend ({
        options: {
          debug: false
        }
      });

      const b = new B ();

      expect (B.prototype.options).to.eql ({
        open: true,
        debug: false
      });

      expect (b.options).to.eql ({
        open: true,
        debug: false
      });
    });

    it ('should update the mergedProperties in extend classes', function () {
      const A = BaseObject.extend ({
        mergedProperties: ['options'],

        options: {
          open: true
        }
      });

      const B = A.extend ({
        mergedProperties: ['actions'],

        options: {
          debug: false
        },

        actions: {
          post: '/post'
        }
      });

      const C = B.extend ({
        actions: {
          get: '/get',
          post: '/post2'
        }
      });

      expect (A.prototype.mergedProperties).to.eql (['options']);
      expect (A.prototype.options).to.eql ({open: true});

      expect (B.prototype.mergedProperties).to.eql (['options','actions']);
      expect (B.prototype.options).to.eql ({open: true, debug: false});
      expect (B.prototype.actions).to.eql ({ post: '/post' });

      expect (C.prototype.mergedProperties).to.eql (['options','actions']);
      expect (C.prototype.options).to.eql ({open: true, debug: false});
      expect (C.prototype.actions).to.eql ({ get: '/get', post: '/post2' });
    });

    it ('should allow instance of merge properties', function () {
      const A = BaseObject.extend ({
        mergedProperties: ['options'],

        options: {
          open: true
        }
      });

      const a = new A ({
        options: {
          debug: false
        }
      });

      expect (A.prototype.mergedProperties).to.eql (['options']);
      expect (A.prototype.options).to.eql ({open: true});
      expect (a.options).to.eql ({open: true, debug: false});

    });

    it ('should not allow instance of update mergedProperties', function () {
      const A = BaseObject.extend ({
        mergedProperties: ['options'],
      });

      expect (() => new A ({
          mergedProperties: ['actions']
        })
      ).to.throw (AssertionError);
    });
  });

  describe ('properties', function () {
    it ('should support computed property on types', function () {
      let Person = BaseObject.extend ({
        firstName: null,

        lastName: null,

        fullName: computed ({
          enumerable: true,
          get () { return `${this.firstName} ${this.lastName}`},
          set (value) {
            [this.firstName, this.lastName] = value.split (' ');
          }
        }),

        DEFAULT_NAME: computed.constant ('Adam Staples')
      });

      let p1 = new Person ({firstName: 'John', lastName: 'Doe'});
      let p2 = new Person ({firstName: 'Jane', lastName: 'Doe'});

      // test the getter
      expect (p1.fullName).to.equal ('John Doe');
      expect (p2.fullName).to.equal ('Jane Doe');

      // test the setter
      p1.fullName = 'Jack Black';
      expect (p1.firstName).to.equal ('Jack');
      expect (p1.lastName).to.equal ('Black');

      // test constant
      expect (p1.DEFAULT_NAME).to.equal ('Adam Staples');
      p1.DEFAULT_NAME = 'Susan Rice';
      expect (p1.DEFAULT_NAME).to.equal ('Adam Staples');

      // test the enumerable
      let found;

      for (let key in p1) {
        found = (key === 'fullName');
        if (found) break;
      }

      expect (found).to.be.true;
    });

    it ('should support computed property on instances', function () {
      let Person = BaseObject.extend ({firstName: null, lastName: null});

      let p1 = Person.create ({
        firstName: 'John',
        lastName: 'Doe',
        fullName: computed ({
          enumerable: true,
          get () { return `${this.firstName} ${this.lastName}`},
          set (value) {
            [this.firstName, this.lastName] = value.split (' ');
          }
        })
      });

      let p2 = Person.create ({
        firstName: 'Jane',
        lastName: 'Doe',
        fullName: computed ({
          enumerable: true,
          get () { return `${this.firstName} ${this.lastName}`},
          set (value) {
            [this.firstName, this.lastName] = value.split (' ');
          }
        })
      });

      // test the getter
      expect (p1.fullName).to.equal ('John Doe');
      expect (p2.fullName).to.equal ('Jane Doe');

      // test the setter
      p1.fullName = 'Jack Black';
      expect (p1.firstName).to.equal ('Jack');
      expect (p1.lastName).to.equal ('Black');

      // test the enumerable
      let found;

      for (let key in p1) {
        found = (key === 'fullName');
        if (found) break;
      }

      expect (found).to.be.true;
    });

    it ('should create a constant property', function () {
      let A = BaseObject.extend ({
        DEFAULT_VALUE: computed.constant (5)
      });

      let a = new A ();

      expect (a.DEFAULT_VALUE).to.equal (5);

      a.DEFAULT_VALUE = 10;

      expect (a.DEFAULT_VALUE).to.equal (5);
    });
  });
});
