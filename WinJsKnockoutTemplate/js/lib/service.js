define(["storage", "model"], function (storage, model) {

    return {
        getModel: function() {
            return model;
        },
        saveData: function(value) {
            storage.set(value);
        },
        getData: function() {
            return storage.get();
        }
    };
});