/*
Flow Package: core
*/
!function (window, Object, Array, Math, Flow, undefined) {

  // init vars
  var core = Flow.pkg('core'), // define core package
    typeOf = function (obj) { // custom typeOf function
      // init vars
      var type = typeof obj; // get native type string
      // return string, check for array when an object
      return type === 'object' && ~((new Object()).toString.call(obj).indexOf('y')) ? 'array' : type;
    },
    rxps = [ // collection of regular expressions
      /\w/ // 0 - one alpha numeric character
    ],
    /*
    this generator handles any nesting and combination of _var component values...
    ...strings
      > _var: 'foo'
    ...objects
      > _var: {foo: 'bar'}
    ...arrays of strings, arrays and objects
      > _var: ['f', 'o', 'b']
      > _var: [['f'], ['o'], ['b]]
      > _var: [{foo: 'bar'}, {hello: 'world'}]
      > _var: [['g',{foo: 'bar'}], 'alpha', {accts: 9}] // mixed
    */
    genVars = new genData(function (name, value, parent, dataset, flags) { // generator to extract variable pairs from a _var component
      // init vars
      var data = this; // alias self
      // flag when this is an object
      data.O = typeof value === 'object';
      // flag when this is an Array
      data.A = value instanceof Array;
      // flag that this has a value (true by default)
      data.V = 1;
      // if there is a parent...
      if (parent) {
        // if the parent is an array...
        if (parent.A) {
          // if this is an object...
          if (data.O) {
            // exclude from result when this is an object within an array
            flags.exclude = 1;
          }
        } else { // otherwise, when the parent is not an array (assume the parent is an object)...
          // don't scan the children of this object (because it's the value, not a _var config)
          flags.scanValue = 0;
        }
      } else if (data.O) { // otherwise, when the first item is an object...
        // exclude from the result
        flags.exclude = 1;
      }
      // if this data has not been exluced...
      if (!flags.exclude) {
        // if there is no parent, or the parent is an array...
        if (!parent || parent.A) {
          // use the value as the name
          data.name = value;
          // set the value to undefined
          data.value = undefined;
          // flag that this data has no value
          data.V = 0;
        }
        // if the name is invalid...
        if (data.name == null || !/\w/.test(data.name)) {
          // exclude this data
          flags.exclude = 1;
        }
        // if this data is still not excluded...
        if (!flags.exclude) {
          // find and remove any data with the same name
          dataset
            .filter(function (d, i) {
              // get the (one) item with the same name
              return d.name === data.name && ((d.I = i) || 1);
            })
            .forEach(function (d) {
              // remove the duplicate index (only ever one)
              dataset.splice(d.I,1);
            });
        }
      }
    }),
    activeFlows = []; // collection of active flows

  // define traversal event names
  core.events = 'main|in|out|over'.split('|');

  // customize data parsing
  core.dataKey = /^_/; // pattern for identifying data keys
  core.invalidKey = /^toString$|^[@\[]|[\/\|]/; // pattern for identifying invalid keys

  // initialize the package instance with custom properties
  core.init = function () {
    // init vars
    var pkg = this; // alias self
    // collection of arguments for traversal functions
    pkg.args = [];
    // collection of variables
    pkg.vars = {};
    // init locked flag
    pkg.locked = 0;
    // init index of state paths
    pkg.stateIds = {};
    // init child-parent flow trackers
    pkg.childFlows = [];
    pkg.parentFlows = [];
    // collection of targets
    pkg.targets = [];
    // initialize each state
    pkg.states.forEach(function (state, idx) {
      // init vars
      var parent = idx && pkg.states[state.parentIndex]; // capture parent when available
      // index this path with this index position
      pkg.stateIds[state.location] = idx;
      // define array to hold traversal functions
      state.fncs = [];
      // set pendable flag
      state.pendable = parent ? parent.pendable : 0;
      // set isRoot flag, based on index or "_root" component
      state.isRoot = idx < 2 ? 1 : !!state.data._root;
      // set rootIndex to self or the parent's root, based on isRoot flag
      state.rootIndex = state.isRoot ? state.index : parent.rootIndex;
      // set restricted path to this state's location, based on the presence of the "_restrict" component or the parent's restrict path
      state.restrictPath = state.data._restrict ? state.location : (parent ? parent.restrictPath : '');
      // define map function - a curried call to .target()
      state.map = function () {
        // invoke target explicitly
        return pkg.proxy.pkgs.core.target(idx, arguments);
      };
      // add variable configurations for this node
      state.vars = genVars(state.data._vars).map(function (data) {
        // return an object based on the given flags
        return {
          name: data.name, // variable name
          value: data.value, // variable value
          use: data.V // flag indicating whether this value should be used when this variable is scoped
        };
      });
      // if this state's index is not 0...
      if (state.index) {
        // append to parent's map function
        parent.map[state.name] = state.map;
      }
      // set custom toString for passing proxy reference
      state.map.toString = function () {
        // return this state's location
        return state.location;
      };
      // with each traversal name...
      core.events.forEach(function (name, idx) {
        name = '_' + name;
        //  set traversal function to 0 or the corresponding data key (when a function)
        state.fncs[idx] = typeof state.data[name] === 'function' ? state.data[name] : 0;
      });
      // if there is no _on[0] function and this state's value is a function...
      if (!state.fncs[0] && typeof state.value === 'function') {
        // use as the _on[0] traversal function
        state.fncs[0] = state.value;
      }
    });
  };

  // hook into events
  core.onStart = function () {
    // init vars
    var pkg = this; // alias this package
    // activate this flow
    //pkg.activate();
  };
  core.onStop = function () {
    // init vars
    var pkg = this; // alias this package
    // remove self from active flows
    //activeFlows.unshift();
  };
  core.onFinish = function () {
    /*
    // init vars
    var pkg = this, // alias self
      tgts = pkg.targets; // alias targets
    // remove the last target...
    tgts.pop();
    // if there are more targets...
    if (tgts.length) {
      // go to the next target
      pkg.flow.go(tgts[tgts.length - 1]);
    } else { // otherwise, when there are no more targets...
      // clear cache?
      // clear history?
      // remove from activeFlows
      activeFlows.pop();
      // inform parent flows
    }*/
  };

  // executes when a state is traversed - scope is the package instance
  core.onTraverse = function (moveInt) {
    // init vars
    var pkg = this, // the package instance
      state = pkg.states[pkg.flow.currentIndex]; // the state being traversed (prototyped, read-only value)
    // toggle internal flag (trust all calls)
    pkg.trust = 1;
    // if there is an out state...
    if (pkg.outState) {
      console.log('de-scoping', pkg.outState.name, '\n\tvCfgs:', pkg.outState.vars);
      // descope variables in the outstate
      pkg.scopeVars(pkg.outState, 1); 
      // clear the outstate
      pkg.outState = 0;
    }
    // based on the motion...
    switch (moveInt) {
      case 1: // in
        console.log('scoping', state.name, '\n\tvCfgs:', state.vars);
        // scope variables for this state
        pkg.scopeVars(state);
      break;

      case 2: // out
        // set the outState to the current state
        pkg.outState = state;
      break;
    }
    // if there is a function for this motion...
    if (state.fncs[moveInt]) {
      // execute function, in scope of the proxy - pass arguments when traversing _on[0]
      pkg.rtrn = state.fncs[moveInt].apply(pkg.proxy, moveInt ? [] : pkg.args);
    }
    // toggle internal flag (don't trust all calls)
    pkg.trust = 0;
  };

  // define prototype of any package instances
  core.prototype = {
    activate: function () {
      // if there is an active flow...
      if (activeFlows.length) {
        // add this flow as a child of the active flow
        activeFlows[0].childFlows.push(pkg);
        // add the active flow as a parent of this flow
        pkg.parentFlows.push(pkg);
      }
      // add self to activeFlows
      activeFlows.shift(pkg);
    },
    deactivate: function () {
    },
    // return index of the state resolved from a state reference
    /*
    qry - (string|function.toString()|number|object.index) which points to a state
    rootState - object - the state to begin any dynamic referencing
    */
    indexOf: function (qry, root) {
      // init vars
      var pkg = this, // alias self
        states = pkg.states, // alias for minification and performance
        stateIds = pkg.stateIds, // alias for minification and performance
        tokens, // tokens found in tokenized queries
        state, // state used for resolving tokenized queries
        idx = -1, // the index to return for the resolved state (default is -1, indicates when the state could not be found)
        parts; // placeholder for storing string manipulation results
      // use the current state, when root is omitted
      state = root = rootState || pkg.states[pkg.flow.currentIndex];
      // based on the type of qry...
      switch (typeof qry) {
        case 'object':
          // assume the object is a state, and retreive it's index
          qry = qry.index;
        case 'number':
          // ensure the number is an integer
          qry = parseInt(qry);
          // if the index is valid...
          if (states[qry]) {
            // set idx to this number
            idx = qry;
          }
        break;
      
        case 'function':
          // get toString version of this function
          qry = qry + '';
        case 'string':
          // if qry is the _flow or _root id...
          if (qry === '..//' || qry === '//') {
            // set idx to 0 or 1, based on qry
            idx = qry === '//' ? 1 : 0;
          } else { // otherwise, when the string is not the _flow or _root ids...
            // get tokens in this string
            tokens = qry.match(/^(?:(?:\.{1,2}|[@\[][^\/]+)\/?)+/);
            // if there are tokens...
            if (tokens) {
              // if there is no generic or specific cache for this query...
              if (!pkgs.cache.indexOf.hasOwnProperty(tokens[0] + root.index) && !pkgs.cache.indexOf.hasOwnProperty(tokens[0])) {
                // init state to start resolving from
                state = root;
                // get remainder of query, after removing tokens
                qry = qry.substr(0, tokens[0].length);
                // parse the tokens to resolve a state
                qry = genTokens(tokens[0]).forEach(function (data, idx) {
                  // if the last state is valid...
                  if (state) {
                    // based on this token
                    switch (data.value) {
                      case '@child':
                        nextNode = node.firstChildIdx;
                      break;

                      case '@next':
                        nextNode = node.nextIdx;
                      break;

                      case '@oldest':
                        if (parentNode) nextNode = parentNode.lastChildIdx;
                      break;

                      case '@parent':
                      case '..':
                        nextNode = node.parentIdx;
                      break;

                      case '@previous':
                        nextNode = node.previousIdx;
                      break;

                      case '@root': // local root of flow branch
                        nextNode = node.rootIdx;
                      break;

                      case '@program': // root of program
                        // flag that the first token is absolute, while setting the index
                        qryIsAbs = nextNode = 1;
                      break;

                      case '@flow': // phantom node
                        // flag that the first token is absolute
                        qryIsAbs = 1;
                        nextNode = 0;
                      break;

                      case '@youngest':
                        if (parentNode) nextNode = parentNode.firstChildIdx;
                      break;

                      case '@self':
                      case '.':
                        nextNode = node.idx;
                      break;
                    }
                    // update state
                    data.qry.state = state;
                  }
                })[0].qry.state;
                // append qry remainder to state
                // cache the query result
                pkgs.cache.indexOf[tokens[0] + qryIsAbs ? ('' + root.index)] = state ? state.index : -1;
              }
              // return the value of the cached query id, use generic cache-id if the specific one is not present
              idx = pkgs.cache.indexOf.hasOwnProperty(tokens[0] + root.index) ? pkgs.cache.indexOf[tokens[0] + root.index] : pkgs.cache.indexOf[tokens[0]];
            } else { // otherwise, when there are no tokens...
              // if the first character is not a forward slash...
              if (qry.charAt(0) !== '/') {
                // prepend current location
                qry = root.location + qry;
              } else if (qry.charAt(1) !== '/') { // or, when the second character is not a forward slash...
                // prepend the current state's root
                qry = states[root.rootIndex].location + qry.substr(1);
              }
              // if the last character is not a forward slash...
              if (qry.slice(-1) !== '/') {
                // append the final forward slash
                qry += '/';
              }
              // set idx to a string match or -1
              idx = stateIds.hasOwnProperty(qry) ? stateIds[qry] : -1;
            }
          }
        }
      }
      // return cachedresolved index
      return idx;
    },
    valid: function (qry) {
      // init vars
      var pkg = this, // alias self
        current = pkg.states[pkg.flow.currentIndex], // get the current state
        target = pkg.find(qry); // 
      // return the target or -1, based on whether the target is valid, and we're within a trusted function or the target is not restricted...
      return (~target && (pkg.trust || !pkg.states[target].location.indexOf(state.restrictPath))) ? target : 0;
    },
    // add a variable-tracking-object to this package
    getVar: function (name, value) {
      // init vars
      var pkg = this; // alias self
      // return an existing or new variable tracking object
      return (pkg.vars.hasOwnProperty(name)) ? pkg.vars[name] : (pkg.vars[name] = {
        name: name,
        values: arguments.length > 1 ? [value] : []
      });
    },
    // create/remove variable tracking objects and increase/reduce their values
    scopeVars: function (state, descope) {
      // init vars
      var pkg = this; // alias self (for closure)
      // with each variable in the given state
      state.vars.forEach(function (varCfg) {
        // init vars
        var vto = pkg.getVar(varCfg.name); // the variable tracking object with this name
        // if descoping variables...
        if (descope) {
          // remove current value from values
          vto.values.shift();
          // if no other values exist...
          if (!vto.values.length) {
            // remove the variable tracking object
            delete pkg.vars[varCfg.name];
          }
        } else { // otherwise, when scoping a variable tracking object...
          // add new or copied value, based on the config
          vto.values.unshift(varCfg.use ? varCfg.value : vto.values[0]);
        }
      });
    }
  };

  // add method to return map of this flow's states
  core.api.map = function () {
    // return pre-made function-list - from the root state
    return core(this).states[1].map;
  };

  // add method to 
  core.api.query = function () {
    // init vars
    var pkg = core(this), // get package instance
      args = arguments, // alias arguments
      i = 0, node, // loop vars
      nodes = []; //
    for (; node = pkg.findNode(args[i]); i++) {
      nodes.push(node.id);
    }
    // return the node id or false
    return (nodes.length && nodes.length === args.length) ? (nodes.length > 1 ? nodes : nodes[0]) : !1;
  };

  // add method to lock and unlock
  core.api.lock = function () {
  };

  // access and edit scoped variables for a state
  core.api.vars = function (name, value) {
    // init vars
    var pkg = core(this), // get package
      argCnt = arguments.length, // get number of arguments passed
      v, // loop vars
      rtn = false; // value to return (default is false)
    // if passed arguments...
    if (argCnt) {
      // if the name is valid...
      if (typeof name === 'string' && /\w/.test(name)) {
        // resolve variable tracker
        v = pkg.getVar(name);
        // if a value was passed...
        if (argCnt > 1) {
          // set the current value
          v.values[0] = value;
          // flag success with setting the value
          rtn = true;
        } else { // otherwise, when no value is passed...
          // return the current value
          rtn = v.values[0];
        }
      }
    } else { // otherwise, when passed no arguments...
      // prepare to return an array
      rtn = [];
      // with each property in the vars object...
      for (v in pkg.vars) {
        // if this member is not inherited...
        if (pkg.vars.hasOwnProperty(v)) {
          // add to collection of names to return
          rtn.push(v);
        }
      }
      // sort variable names
      rtn.sort();
    }
    // return result of call
    return rtn;
  };

  // access and edit the arguments passed to traversal functions
  core.api.args = function (idx, value) {
    // init vars
    var pkg = core(this), // get package
      args = pkg.args, // alias arguments from this package
      argsLn = args.length, // capture number of args elements
      argCnt = arguments.length, // get number of arguments passed
      idxType = typeOf(idx), // get type of first argument
      rtn = true; // value to return (default is true)
    // if passed arguments and this flow is unlocked...
    if (argCnt && !pkg.locked) {
      // if idx is an array...
      if (idxType === 'array') {
        // replace args with a copy of the idx array
        pkg.args = idx.concat();
      } else if (idxType === 'number') { // or, when idx is a number (assuming an integer)...
        // if a value was passed...
        if (argCnt > 1) {
          // if the value is undefined and the last index was targeted...
          if (value === undefined && idx === argsLn - 1) {
            // remove the last index
            args.pop();
          } else { // otherwise, when not setting the last index to an undefined value...
            // set the value at this index
            args[idx] = value;
          }
        } else if (idx > -1 && idx < argsLn) { // or, when no value is passed and the idx is a valid...
          // return the value at the targeted index
          rtn = args[idx];
        } else { // otherwise, when no value is passed and the index is invalid...
          // flag failure to retrieve this index
          rtn = false;
        }
      } else { // otherwise, when the type of idx is invalid...
        // flag failure to return anything because idx is unrecognized
        rtn = false;
      }
    } else if (!argCnt) { // otherwise, when given no arguments...
      // return a copy of the arguments array (always available - even to locked flows)
      rtn = args.concat();
    }
    // send return value
    return rtn;
  };

  // add method to program api
  core.api.target = function (qry) {
    // init vars
    var pkg = core(this), // alias this package
      tgtState = pkg.valid(qry); // retrieve the targeted state or 0
    // if the destination state is valid...
    if (tgtState) {
      // capture arguments after the tgt
      pkg.args = [].slice.call(arguments).slice(1);
      // set targets array
      pkg.targets = [tgtState];
      // pkg.flow provides control and access to the true flow instance
      pkg.flow.go(idx); // tell flow to go here
      // return result from traversal (if we finish), false if we stop, true if we're in a loop right now
      return pkg.moving ? true : (pkg.hitTarget ? pkg.onResult : false);
    }
    // otherwise, flag inability to target the state
    return false;
  };

  // add method to resume
  core.api.go = function () {
  };

  // delay traversing
  core.api.wait = function () {
    // init vars
    var pkg = core(this), // get package instance
      args = arguments, // alias arguments
      cur = pkg.states[pkg.flow.currentIndex], // 
      cache = pkg.cache.proxy, // 
      argLn = args.length, // 
      fnc = argLn > 1 ? args[0] : 0, // 
      node, // stub to test when fnc is a node reference
      fncOk = !fnc || typeof fnc === 'function' || ((node = pkg.flow.findNode(fnc)) && cur.allowTgt(node)), // 
      time = Math.ceil(Math.abs(args[argLn - 1])), // 
      timeOk = !isNaN(time), // 
      rtn = 1; // 
    // if there are targets or staged waypoints to reach, and the argument's are valid (node is not false)...
    if ((flow.targets.length || flow.stage.waypoints.length) && (!argLn || (timeOk && fncOk && node !== !1))) {
      // if reset traversal cache
      if (cache.status) {
        // 
        delete cache.status.traversal;
      }
      // clear existing delay
      flow.clearDelay();
      // if fnc was a node, make a function that targets it, as the callback
      if (node) {
        // define callback function
        fnc = function () {
          // 
          flow.target(node);
        };
      }
      // set delay to truthy value or delayed traverse call
      pkg.delay.active = argLn ? window.setTimeout(function () {
          // set callback next callback
          pkg.delay.callback = fnc;
          // clear delay
          pkg.delay.active = 0;
          // attempt traversal - invokes callback
          pkg.traverse();
        }, time) : 1;
      // flag that the flow will be (or has been) delayed
      rtn = 0;
    }
    // return boolean flag of success or failure
    return !rtn;
  };
}(this, Object, Array, Math, Flow);