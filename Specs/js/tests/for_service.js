define(['service'], function (service) { 
    tests.add("service - function saveData should save to storage", function () {
        service.saveData("set");
        assert.isTrue(service.getData() == "set");
    });
    
    tests.add("service - function getModel should return model", function () {
        assert.isTrue(service.getModel() != null);
    });
});
