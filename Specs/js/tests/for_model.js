define(function () {
    tests.add("model - should expose property appName", function () {
        var model = app.model();
        assert.isTrue(model.appName != "");
    });
});
