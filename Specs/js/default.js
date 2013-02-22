require.config({
    baseUrl: 'js/lib',
    paths: {
        tests: '../tests'
    }
});

var runTests = function() {
    MSApp.execUnsafeLocalFunction(testRunner.run);
};

requirejs(["tests/for_storage",
           "tests/for_service"], function () {

    WinJS.Application.start();
    setTimeout(runTests, 1000);
});
