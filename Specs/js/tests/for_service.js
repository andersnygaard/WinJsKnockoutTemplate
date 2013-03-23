define(["service"], function () { 
    tests.add("service - function saveData should save to storage", function () {
        var storage = {};
        storage.set = sinon.spy();
        var model = sinon.stub().returns({});
        var mockedService = app.service(storage, model);
        mockedService.saveData("set");

        assert.isTrue(storage.set.calledOnce);
    });
    
    tests.add("service - function getData should get from storage", function () {
        var storage = {};
        storage.get = sinon.spy();
        var model = "model";
        var mockedService = app.service(storage, model);
        mockedService.getData();

        assert.isTrue(storage.get.calledOnce);
    });

    tests.add("service - function getModel should return model", function () {
        var storage = {};
        storage.set = sinon.stub();
        var model = "model";
        var mockedService = app.service(storage, model);
        
        assert.isTrue(mockedService.getModel() == "model");
    });
});
