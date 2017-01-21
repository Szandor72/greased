({
    driver: function (component, event, helper) {
        // to work around LockerService inherited component access, use a component event to populate the baseComponent attribute
        component.getEvent("initEvent").fire();
        // now the base component is accessible to components which extend greased_TestCommon
        var base = component.get("v.baseComponent");
        // make the base component create a driver and load it into it's public attribute
        base.loadDriver();
        // LockerService hoops have been jumped through, return the driver to the test that wants it
        return base.get("v.driver");
    },
    toggleAssertions: function (component, event, helper) {
        var base = component.get("v.baseComponent");
        base.toggleAssertions();
    },
    fireApplicationEvent: function (event, params) {
        return function (context) {
            var appEvent = $A.get(event);
            if ($A.util.isUndefinedOrNull(appEvent)) {
                throw Error("Could not create new event: " + event);
            } else {
                appEvent.setParams(params).fire();
            }
            // return is required to pass context through the promise chain
            return context;
        }
    },
    fireComponentEvent: function (component, event, params) {
        return function (context) {
            var cmpEvent = component.get(event);
            if ($A.util.isUndefinedOrNull(cmpEvent)) {
                throw Error("Could not create new event: " + event);
            } else {
                cmpEvent.setParams(params).fire();
            }
            // return is required to pass context through the promise chain
            return context;
        }
    }
})