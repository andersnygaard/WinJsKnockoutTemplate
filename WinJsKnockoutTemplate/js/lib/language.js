var app = app || {};

app.language = function() {
    var self = this;

    return {
        get: function(key) {
            return WinJS.Resources.getString(key).value;
        }
    };
};

define(app.language);
