﻿require.config({
    paths: {
        "knockout": "/Scripts/knockout-2.2.0",
        "mapping": "/Scripts/knockout.mapping-latest"
    }
});

requirejs([
    "service",
    "knockout",
    "toast",
    "viewState",
    "language",
    "navigation"],
    function (service, ko, toast, viewState, language, navigation) {

        var ViewModel = function () {

            var self = this;
            this.service = service;
            this.model = service.getModel();

            // Viewstate
            this.viewState = viewState.observable;
            self.viewState.subscribe(function (value) {
                toast.show("ViewState is now " + value);
            });

            this.items = {
                howto: {
                    click: function () {
                        window.location = "howto.html";
                    }
                },
                toast: {
                    click: function(){
                        toast.show(language.get("greeting"), "And it's got a body too");
                    }
                },
                data: {
                    click: function () {
                        self.service.saveData("myValue");
                        toast.show("That's been saved");
                    }
                },
                language: {
                    click: function () {
                        toast.show(language.get("greeting"));
                    }
                }
            };
        };

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
        });

        WinJS.Resources.processAll();
        WinJS.Application.start();
        ko.applyBindings(new ViewModel());
    });