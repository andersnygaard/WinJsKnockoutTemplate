var app = app || {};

app.toast = function () {
    
    return {
        show: function(title, body) {
            var notifications = Windows.UI.Notifications;
            var templateType;

            if (!body)
                templateType = notifications.ToastTemplateType.toastText01;
            else
                templateType = notifications.ToastTemplateType.toastText02;

            var xml = notifications.ToastNotificationManager.getTemplateContent(templateType);

            var textNodes = xml.getElementsByTagName("text");
            textNodes.forEach(function(value, index) {
                if (index == 0) {
                    value.appendChild(xml.createTextNode(title));
                } else if (index == 1) {
                    value.appendChild(xml.createTextNode(body));
                } else {
                    value.appendChild(xml.createTextNode("Toast3!"));
                }
            });

            var toast = new notifications.ToastNotification(xml);
            var notifier = notifications.ToastNotificationManager.createToastNotifier();

            notifier.show(toast);
        }
    };
};

define(app.toast);