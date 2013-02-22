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

// Namespace/clas

(function (scope) {

    scope.testRunner = new function () {

        var self = this;

        // Properties
        this.testsRun = 0;
        this.testsPassed = 0;
        this.testsFailed = 0;
        this.timeSpent = "";

        // Help functions
        this._loadScript = function (src, callback) {

            var head, script;

            head = document.getElementsByTagName('head')[0];
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.onreadystatechange = function () {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    callback();
                }
            };
            script.onload = callback;
            script.src = src;

            head.appendChild(script);
        };

        this.run = function () {

            // Add jquery
            if (typeof jQuery === 'undefined') {
                self._loadScript('http://code.jquery.com/jquery.min.js', this._runAll);
            }
            else {
                self._runAll();
            }
        };

        this._runAll = function () {

            this.testsRun = 0;
            this.testsPassed = 0;
            this.testsFailed = 0;
            this.timeSpent = "";
            this.output = "";

            $("#testrunner_navigator").text(navigator.userAgent);

            // Start the stopwatch
            var startDate = new Date();
            var totalTests = 0;
            var key;

            // each testgroup
            for (key in tests._tests) {

                totalTests = totalTests + tests._tests[key].length;

                // each test
                this.output += key + "(" + tests._tests[key].length + ")<br>";
                for (var i = 0; i < tests._tests[key].length; i++) {
                    self._runTest(key, i, this);
                }
            }

            // Stop the stopwatch
            var stopDate = new Date();
            this.timeSpent = (stopDate - startDate) + " ms"

            // Add results
            console.log(Math.floor((this.testsPassed / totalTests) * 100));

            $("#testrunner_percent").css("width", Math.floor((this.testsPassed / totalTests) * 100).toString() + "%");
            $("#testrunner_results").text("Total: " + this.testsRun.toString() + ", passed: " + this.testsPassed.toString() + ", failed: " + this.testsFailed.toString() + ", time: " + this.timeSpent.toString());
            $("#testrunner_output").html(this.output);

        };

        this._runTest = function (k, i, scope) {

            scope.testsRun++;

            try {
                // setup
                if (tests.setup._setup.hasOwnProperty(k)) {
                    tests.setup._setup[k]();
                }

                // test
                tests._tests[k][i]();

                // teardown
                if (tests.tearDown._tearDown.hasOwnProperty(k)) {
                    tests.tearDown._tearDown[k]();
                }

                scope.testsPassed++;
            }
            catch (e) {
                scope.testsFailed++;

                if (e) {
                    scope.output += "<span style='padding-left:15px;color:#ff9999;'>(" + i + "): " + e + "</span><br>";
                }
            }
        };

    };

}(window));