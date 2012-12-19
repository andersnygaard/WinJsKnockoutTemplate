require.config({
    paths: {
        "knockout": "/Scripts/knockout-2.2.0"
    }
});

requirejs([
    "service",
    "knockout",
    "toast",
    "viewState"],
    function (service, ko, toast, viewState) {

        var viewModel = new function () {

            var self = this;
            this.service = service;
            this.model = service.getModel();
            this.appName = ko.observable(self.model.appName);

            // Viewstate
            this.viewState = viewState.observable;
            self.viewState.subscribe(function (value) {
                toast.show("ViewState is now " + value);
            });

            // Toast
            this.showToast = function () {
                toast.show("It's a toast message!", "And it's got a body too");
            }

            // Data
            this.saveData = function () {
                service.saveData("myValue");
                toast.show("That's been saved");
            }
        }();

        require(["lifecycle"], function () {
            // Lifecycle subscriptions
            $.subscribe("app/suspending", function () {
                toast.show("It's suspended");
            });

            $.subscribe("app/resuming", function () {
                toast.show("It's resumed");
            });

            $.subscribe("app/settings", function () {
                toast.show("Settings opened");
            });

            $.subscribe("app/unload", function () {
                toast.show("It's unloaded");
            });
        });

        ko.applyBindings(viewModel);
    });