describe( 'Permission', function () {

  var flow;

  it( 'should deny access to privileged methods and tags, based on the caller', function () {
    flow = new Flow({
      deny: {
        _perms: '!world'
      }
    });
    flow.perms().world.should.be.ok;
    flow.go(1).should.be.ok;
    flow.target(0).should.be.ok;
    flow.go('//deny');
    flow.perms().world.should.not.be.ok;
    flow.go(1).should.not.be.ok;
    flow.target(0).should.not.be.ok;
  });

  it( 'should be ignored by blessed callbacks', function () {
    var callback;
    flow = new Flow(function () {
      this.perms(false);
      callback = this.callbacks(0, 0, 1);
    });
    flow.go(1);
    flow.perms().world.should.not.be.ok;
    flow.go(0).should.not.be.ok;
    flow.state.index.should.equal(1);
    callback();
    flow.state.index.should.equal(0);
  });

  it( 'should allow "owner" and "world" by default', function () {
    flow = new Flow();
    flow.perms().should.eql({owner:true, world: true});
  });

  describe ( 'format', function () {

    it( 'should be read as an object via `.perms()`', function () {
      flow = new Flow();
      flow.perms().should.be.a('object');
    });

    describe ( 'string', function () {

      it( 'should permit the named group', function () {
        var spy = sinon.spy();
        flow = new Flow({
          _perms: false,
          _on: function () {
            this.perms().world.should.not.be.ok;
            this.perms('world');
            this.perms().world.should.be.ok;
            spy();
          }
        });
        flow.go(1);
        spy.should.have.been.calledOnce;
      });

      it( 'should deny the named group if prefixed by an exclamation', function () {
        var spy = sinon.spy();
        flow = new Flow({
          _perms: true,
          _on: function () {
            this.perms().world.should.be.ok;
            this.perms('!world');
            this.perms().world.should.not.be.ok;
            spy();
          }
        });
        flow.go(1);
        spy.should.have.been.calledOnce;
      });

    });

    describe ( 'object', function () {

      it( 'should permit groups matching keys paired to a truthy value', function () {
        var spy = sinon.spy();
        flow = new Flow({
          _perms: false,
          _on: function () {
            this.perms().world.should.not.be.ok;
            this.perms({
              world: 1
            });
            this.perms().world.should.be.ok;
            spy();
          }
        });
        flow.go(1);
        spy.should.have.been.calledOnce;
      });

      it( 'should deny groups matching keys paired to a falsy value', function () {
        var spy = sinon.spy();
        flow = new Flow({
          _perms: true,
          _on: function () {
            this.perms().world.should.be.ok;
            this.perms({
              world: 0
            });
            this.perms().world.should.not.be.ok;
            spy();
          }
        });
        flow.go(1);
        spy.should.have.been.calledOnce;
      });

    });

    describe ( 'boolean', function () {

      it( 'should permit all groups when `true`', function () {
        var spy = sinon.spy();
        flow = new Flow({
          _perms: false,
          _on: function () {
            this.perms().should.eql({world:false, owner: false});
            this.perms(true);
            this.perms().should.eql({world:true, owner: true});
            spy();
          }
        });
        flow.go(1);
        spy.should.have.been.calledOnce;
      });

      it( 'should deny all groups when `false`', function () {
        var spy = sinon.spy();
        flow = new Flow({
          _perms: true,
          _on: function () {
            this.perms().should.eql({world:true, owner: true});
            this.perms(false);
            this.perms().should.eql({world:false, owner: false});
            spy();
          }
        });
        flow.go(1);
        spy.should.have.been.calledOnce;
      });

    });

  });

  describe ( 'setting', function () {

    it( 'should be done via `_capture` and `.perms()`', function () {
      flow = new Flow({
        _perms: 'foo',
        _on: function () {
          this.perms('!world');
        }
      });
      flow.go(1);
      flow.perms().should.include.keys('foo', 'world', 'owner');
      flow.perms().world.should.not.be.ok;
    });

    it( 'should expose new groups within the nearest `_perms` ancestor', function () {
      var permName = 'bar';
      flow = new Flow({
        _perms: 'world',
        a: function () {
          this.perms(permName);
        }
      });
      flow.go(1);
      flow.perms().should.not.include.key(permName);
      flow.go('//a');
      flow.perms().should.include.key(permName);
      flow.go(1);
      flow.perms().should.include.key(permName);
      flow.go(0);
      flow.perms().should.not.include.key(permName);
    });

  });

});