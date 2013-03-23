define(["storage"], function (storage) {
    tests.add("storage - should set value and retrievet it", function () {
        var value = "aaa";
        storage.set(value);
        var newValue = storage.get();
        assert.areEqual(value, newValue, "Unable to retrieve the same value. Is " + newValue + ", should be '" + value + "'");
    });
});