define([], function () {
    
    var app = WinJS.Application;
    var webUIApplication = Windows.UI.WebUI.WebUIApplication;

    // App Lifecycle, see
    // http://msdn.microsoft.com/en-us/library/windows/apps/hh464925.aspx

    webUIApplication.addEventListener("suspending", function () {
        $.publish("app/suspending");
    }, false);
    webUIApplication.addEventListener("resuming", function () {
        $.publish("app/resuming");
    }, false);
    app.addEventListener("settings", function () {
        $.publish("app/settings");
    }, false);
});