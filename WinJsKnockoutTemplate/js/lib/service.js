define(["storage", "model"], function (storage, model) {

    var self = this;
    
    this.key = "myKey";

    return {
        getModel: function () {
            return model;
        },
        saveData: function (value) {
            storage.set(self.key, value);
        },
        getData: function (levelName) {
            return storage.get(levelName);
        }
    }
});