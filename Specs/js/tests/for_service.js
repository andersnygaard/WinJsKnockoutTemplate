define([], function () {

    var spy = sinon.spy();

    define("storage", function() {
        return {
            set: spy,
            get: spy
        };
    });
        
    define("model", function () {
        return {
            isMockModel: true
        };
    });

    require(["service"], function (service) {
        tests.add("service - function getModel should return model", function () {
            assert.isTrue(service.getModel().isMockModel, "getModel is not returning dependent model object");
        });
        
        tests.add("service - function saveData should save to storage", function () {
            spy.reset();
            service.saveData("set");
            assert.isTrue(spy.calledWith("set"));
        });
        
        tests.add("service - function getData should get from storage", function () {
            spy.reset();
            service.saveData("get");
            assert.isTrue(spy.calledWith("get"));
        });
    });
});