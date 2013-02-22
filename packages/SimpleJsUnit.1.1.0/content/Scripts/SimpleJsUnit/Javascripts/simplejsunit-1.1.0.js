"use strict";

// SimpleJsUnit and its testrunner is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. See http://creativecommons.org/licenses/by-sa/3.0/
//
// You are free:
// - to Share — to copy, distribute and transmit the work
// - to Remix — to adapt the work
// - to make commercial use of the work 
//
// Under the following conditions:
// - Attribution — You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
// - Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one. 
//
// https://twitter.com/#!/anders_nygaard


(function (scope) {

    // Undefined
    var _simpleJsUnitUndefined;

    scope.simpleJsUnit = new function(){

        // Properties
        this._version = "1.1.0";
        this._undefined = _simpleJsUnitUndefined;

        // Logging
        if (!"console" in window || typeof console == "undefined") {
    
            var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
            "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

            window.console = {};
            for (var i = 0; i < names.length; ++i)
                window.console[names[i]] = function() {}
        }

        this._addToLog = function (text) {
            console.log(text);
        };


        // Type checking
        this._typeOf = function (something) {

            var result = typeof something;
            try {
                switch (result) {
                    case 'string':
                        break;
                    case 'boolean':
                        break;
                    case 'number':
                        break;
                    case 'object':
                    case 'function':
                        switch (something.constructor) {
                            case new String().constructor:
                                result = 'String';
                                break;
                            case new Boolean().constructor:
                                result = 'Boolean';
                                break;
                            case new Number().constructor:
                                result = 'Number';
                                break;
                            case new Array().constconstructor:
                                result = 'Array';
                                break;
                            case new RegExp().constructor:
                                result = 'RegExp';
                                break;
                            case new Date().constructor:
                                result = 'Date';
                                break;
                            case Function:
                                result = 'Function';
                                break;
                            default:
                                var m = something.constructor.toString().match(/function\s*([^( ]+)\(/);
                                if (m) {
                                    result = m[1];
                                }
                                else {
                                    break;
                                }
                        }
                        break;
                }
            } finally {
                result = result.substr(0, 1).toUpperCase() + result.substr(1);
                return result;
            }
        };
        this._checkType = function (actual, expected, exception) {
            if (simpleJsUnit._typeOf(actual) !== expected) {
                throw exception;
            }
        };

        this.fluentScope = function(){
    
            var self = this;

            this._scope;

            // Fluent interface
            this.should = function () {

                return self;
            };

            this.throwException = function (message) {

                // Assert
                assert.throwsException(this._scope, message);
            };

            this.beTrue = function (message) {

                // Assert
                assert.isTrue(this._scope, message);
            };

            this.beFalse = function (message) {

                // Assert
                assert.isFalse(this._scope, message);
            };

            this.beSameAs = function (expected, message) {

                // Assert
                assert.areEqual(this._scope, expected, message);
            };

            this.notBeSameAs = function (exptexted, message) {

                // Assert
                assert.areNotEqual(this._scope, exptexted, message);
            };

            this.beNull = function (message) {

                // Assert
                assert.isNull(this._scope, message);
            };

            this.notBeNull = function (message) {

                // Assert
                assert.isNotNull(this._scope, message);
            };

            this.beInstanceOf = function (expected, message) {

                // Assert
                assert.isInstanceOfType(this._scope, expected, message);
            };

            this.notBeInstanceOf = function (expected, message) {

                // Assert
                assert.isNotInstanceOfType(this._scope, expected, message);
            };

            this.fail = function (message) {

                // Assert
                assert.fail(message);
            }
        };
    };

    scope.assert = {
        throwsException: function (fn, message) {

            // Check input
            simpleJsUnit._checkType(fn, "Function", "Invalid input parameter 'fn', expected function but got " +  simpleJsUnit._typeOf(fn).toLowerCase());

            // Assert
            try {
                fn();
            } catch (e) {
                return;
            }

            if(message)
                throw message.toString();
            else
                throw "Provided function did not fail";
        },
        isTrue: function (actual, message) {

            // Check input
            simpleJsUnit._checkType(actual, "Boolean", "Invalid input parameter 'actual', expected boolean but got " +  simpleJsUnit._typeOf(actual).toLowerCase());

            // Assert
            if (actual !== true) {
                if(message)
                    throw message.toString();
                else
                    throw "Expected true";
            }

        },
        isFalse: function (actual, message) {

            // Check input
            simpleJsUnit._checkType(actual, "Boolean", "Invalid input parameter 'actual', expected boolean but got " +  simpleJsUnit._typeOf(actual).toLowerCase());

            // Assert
            if (actual !== false) {
                if(message)
                    throw message.toString();
                else
                    throw "Expected false";
            }
        },
        areEqual: function (actual, expected, message) {

            // Assert
            if (expected !== actual) {
                if(message)
                    throw message.toString();
                else
                    throw "Provided parameters are not equal";
            }
        },
        areNotEqual: function (actual, expected, message) {

            // Assert
            if (expected === actual) {
                if(message)
                    throw message.toString();
                else
                    throw "Provided parameters are equal";
            }
        },
        isNull: function (actual, message) {

            // Assert
            if (actual !== null) {
                if(message)
                    throw message.toString();
                else
                    throw "Expected null";
            }
        },
        isNotNull: function (actual, message) {

            // Assert
            if (actual === null) {
                if(message)
                    throw message.toString();
                else
                    throw "Expected not null";
            }
        },
        isInstanceOfType: function (actual, expected, message) {

            // Check input
            simpleJsUnit._checkType(expected, "String", "Invalid input parameter 'exptected', expected string but got " +  simpleJsUnit._typeOf(expected).toLowerCase());

            // Assert
            if (simpleJsUnit._typeOf(actual).toLowerCase() !== expected.toLowerCase()) {
                if(message)
                    throw message.toString();
                else
                    throw "Provided parameter is not instance of given type";
            }
        },
        isNotInstanceOfType: function (actual, expected, message) {

            // Check input
            simpleJsUnit._checkType(expected, "String", "Invalid input parameter 'exptected', expected string but got " +  simpleJsUnit._typeOf(expected).toLowerCase());

            // Assert
            if (simpleJsUnit._typeOf(actual).toLowerCase() === expected.toLowerCase()) {
            if(message)
                throw message.toString();
            else
                throw "Provided parameter is instance of given type";
            }
        },
        fail: function (message) {

            // Just trow message
            if(message)
                    throw message.toString();
                else
                    throw "Test failed";
        }
    };

    scope.tests = {
    
        _tests: [],
        setup: {
            _setup: [],
            add: function (testgroup, fn) {

                // Check input
                simpleJsUnit._checkType(testgroup, "String", "Invalid input, testGroup is not of type 'String'");
                simpleJsUnit._checkType(fn, "Function", "Invalid input, fn is not of type 'Function'");

                // Add setup function
                var key = testgroup.toString();
                if (!(this._setup.hasOwnProperty(key))) {
                    this._setup[key] = [];
                }

                this._setup[key] = fn;

                // Add to log
                simpleJsUnit._addToLog("Setup function added to '" + testgroup + "' test group");
            }
        },
        tearDown: {
            _tearDown: [],
            add: function (testgroup, fn) {

                // Check input
                simpleJsUnit._checkType(testgroup, "String", "Invalid input, testGroup is not of type 'String'");
                simpleJsUnit._checkType(fn, "Function", "Invalid input, fn is not of type 'Function'");

                // Add tearDown function
                var key = testgroup.toString();
                if (!(this._tearDown.hasOwnProperty(key))) {
                    this._tearDown[key] = [];
                }

                this._tearDown[key] = fn;

                // Add to log
                simpleJsUnit._addToLog("Teardown function added to '" + testgroup + "' test group");
            }
        },
        add: function (testGroup, fn) {

            // Check input
            simpleJsUnit._checkType(testGroup, "String", "Invalid input, testGroup is not of type 'String'");
            simpleJsUnit._checkType(fn, "Function", "Invalid input, fn is not of type 'Function'");

            // Add test
            var key = testGroup.toString();
            if (!(this._tests.hasOwnProperty(key))) {
                this._tests[key] = [];
            }

            this._tests[key].push(fn);

            // Add to log
            simpleJsUnit._addToLog("Test added to '" + testGroup + "' test group");
        },
        clear: function() {
            this._tests = [];
        },
        run: function () {

            var testResults = {
                numberOfTests: 0,
                run: 0,
                passed: 0,
                failed: 0,
                output: "",
                time: ""
            };

            var startDate = new Date();

            var k, i;

            // each testgroup
            for (k in this._tests) {

                testResults.numberOfTests += this._tests[k].length;

                // each test
                for (i = 0; i < this._tests[k].length; i++) {

                    testResults.run++;

                    try {
                        // setup
                        if (this.setup._setup.hasOwnProperty(k)) {
                            this.setup._setup[k]();
                        }

                        // test
                        this._tests[k][i]();

                        // tearDown
                        if (this.tearDown._tearDown.hasOwnProperty(k)) {
                            this.tearDown._tearDown[k]();
                        }

                        testResults.passed++;
                    }
                    catch (e) {
                        testResults.failed++;

                        if (e) {
                            testResults.output += k + "(" + i.toString() + ") - " + e;
                        }
                    }
                }
            }

            var stopDate = new Date();
            testResults.time = (stopDate - startDate).toString() + " ms";

            // Add to log
            simpleJsUnit._addToLog(testResults.run.toString() + " test(s) run in " + testResults.time + ". " + testResults.passed.toString() + " test(s) passed, " + testResults.failed.toString() + " test(s) failed");

            return testResults;

    }

    };

    scope.that = function (scope) {

        var f = new simpleJsUnit.fluentScope();
        f._scope = scope;
        return f;
    };
    
})(window);