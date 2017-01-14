({
    sendToService: function (component, method, params, callback) {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                callback(response.getReturnValue());
            } else if (component.isValid() && state === "ERROR") {
                $A.error("service call ERROR");
                this.showUnexpectedError(component);
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    $A.error("service call ERROR: " + errors[0].message);
                    this.showUnexpectedError(component);
                } else {
                    $A.error("Unknown error");
                    this.showUnexpectedError(component);
                }
            }
        });
        $A.enqueueAction(action);
    }
})