tests.setup.add("asserts_all_should_pass", function () {
    console.log("asserts setup");
});

tests.tearDown.add("asserts_all_should_pass", function () {
    console.log("asserts teardown");
});

tests.add("asserts_all_should_pass", function () {

    console.log("test is now running");

    assert.throwsException(function () { throw "message" });
    assert.isTrue(true);
    assert.isFalse(false);
    assert.areEqual(1, 1);
    assert.areNotEqual(1, 2);
    assert.isNull(null);
    assert.isNotNull("");
    assert.isInstanceOfType(1, "number");
    assert.isNotInstanceOfType(1, "string");
});

tests.add("asserts_fail", function () {

    assert.fail("This test was supposed to fail");

});