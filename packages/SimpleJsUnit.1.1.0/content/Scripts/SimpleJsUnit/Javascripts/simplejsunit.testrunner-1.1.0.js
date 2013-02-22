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

(function(scope) {

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
                this._loadScript('http://code.jquery.com/jquery.min.js', this._runAll);
            }
            else {
                this._runAll();
            }
        };

        this._runAll = function () {

            this.testsRun = 0;
            this.testsPassed = 0;
            this.testsFailed = 0;
            this.timeSpent = "";
            this.output = "";

            $("#testRunner_dialog_background").remove();
            $("#testRunner_dialog").remove();

            // Dialog
            var $background = jQuery('<div/>', {
                id: 'testRunner_dialog_background',
                style: 'border: 3px solid #ff0000;background-color:#444444;position:absolute;top:10px;right:10px;min-height:200px;width:450px;padding:10px;-moz-opacity:.50; filter:alpha(opacity=60); opacity:.60;'
            });

            var $elem = jQuery('<div/>', {
                id: 'testRunner_dialog',
                style: 'border: 3px solid #000044;position:absolute;top:10px;right:10px;min-height:200px;width:450px;padding:10px;'
            });

            // Labels & values
            jQuery('<div style = "color: #ffffff; font-size: 24px;">SimpleJsUnit TestRunner</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;vertical-align:top;">Total number of tests</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:290px;" id = "testRunner_total"></div>').appendTo($elem);

            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;vertical-align:top;">Run</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:290px;" id = "testRunner_run"></div>').appendTo($elem);

            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;vertical-align:top;">Passed</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:290px;" id = "testRunner_passed"></div>').appendTo($elem);

            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;vertical-align:top;">Failed</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:290px;" id = "testRunner_failed"></div>').appendTo($elem);

            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;padding-top:20px;vertical-align:top;">Time spent:</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:290px;padding-top:20px;" id = "testRunner_time"></div>').appendTo($elem);

            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;padding-top:20px;vertical-align:top;">Output:</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:320px;padding-top:20px;max-height:200px;overflow:auto;" id = "testRunner_output"></div>').appendTo($elem);

            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:130px;padding-top:20px;vertical-align:top;">&nbsp;</div>').appendTo($elem);
            jQuery('<div style = "color: #ffffff; font-size: 14px;display:inline-block;width:290px;padding-top:20px;"><button id = "btn_testrunner_close">Close testrunner</button></div>').appendTo($elem);

            // Attach to DOM
            $background.appendTo($('body'));
            $elem.appendTo($('body'));

            $("#btn_testrunner_close").on("click", function (event) {
                $("#testRunner_dialog_background").empty().remove();
                $("#testRunner_dialog").empty().remove();
            });

            // Start the stopwatch
            var startDate = new Date();
            var totalTests = 0;
            var key;

            // each testgroup
            for (key in tests._tests) {

                totalTests = totalTests + tests._tests[key].length;

                var d = tests._tests[key];

                // each test
                for (var i = 0; i < tests._tests[key].length; i++) {

                    self._runTest(key, i, this);

                }
            }

            // Stop the stopwatch
            var stopDate = new Date();
            this.timeSpent = (stopDate - startDate) + " ms"

            $("#testRunner_total").text(totalTests.toString());
            $("#testRunner_time").text(this.timeSpent);
            $("#testRunner_run").text(this.testsRun);
            $("#testRunner_passed").text(this.testsPassed);
            $("#testRunner_failed").text(this.testsFailed);
            $("#testRunner_output").html(this.output);

            $("#testRunner_dialog_background").height($("#testRunner_dialog").height());
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
                    scope.output += k + "(" + i + "):<br>" + e + "<br><br>";
                }
            }
        };

    };

}(window));