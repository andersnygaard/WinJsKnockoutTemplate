define(["knockout"], function (ko) {
    
    var self = this;

    this.viewStates = [];
    for (var key in Windows.UI.ViewManagement.ApplicationViewState) {
        self.viewStates.push(key);
    }
    this.current = viewStates[Windows.UI.ViewManagement.ApplicationView.value];
    this.currentAsObservable = ko.observable(current);

    window.addEventListener("resize", function (e) {
        var viewState = Windows.UI.ViewManagement.ApplicationView.value;
        self.current = self.viewStates[viewState];
        self.currentAsObservable(self.viewStates[viewState]);
        $.publish("app/resize", viewState);
    });

    return {
        all: self.viewStates,
        current: self.current,
        observable: ko.computed(function(){
            return self.currentAsObservable();
        })
    };
});
