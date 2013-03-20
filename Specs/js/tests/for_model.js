define(['model'], function (model) {
    tests.add("model - should expose property appName", function () {
        assert.isTrue(model.appName != "");
    });
});
