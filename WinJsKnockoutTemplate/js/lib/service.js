var app = app || {};
app.service = function(storage, model) {

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
};

define(["storage", "model"], app.service);