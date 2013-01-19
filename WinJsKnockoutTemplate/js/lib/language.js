define(function () {
    var self = this;

    return {
        get: function (key) {

            return WinJS.Resources.getString(key).value;
        }
    };
});
