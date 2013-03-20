var app = app || {};

app.storage = function() {
    var self = this;
    var key = "app";

    return {
        setKey: function() {
            self.key = key;
        },
        set: function(value) {
            localStorage.setItem(self.key, value);
        },
        get: function() {
            return localStorage.getItem(self.key);
        }
    };
};

define(app.storage);
