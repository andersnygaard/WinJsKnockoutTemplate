define(["storage"], function (storage) {
    tests.add("storage - should be instance when required with requireJs", function () {
        assert.isNotNull(storage, "Storage module returns null");
    });
    tests.add("storage - should set value and retrievet it", function () {
        var value = "aaa";
        storage.set(value);
        var newValue = storage.get();
        assert.areEqual(value, newValue, "Unable to retrieve the same value. Is " + newValue + ", should be '" + value + "'");
    });
});