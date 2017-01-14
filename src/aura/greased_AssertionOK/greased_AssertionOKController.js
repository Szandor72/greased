({
    doInit: function (component, event, helper) {
        var actual = component.get("v.value");
        component.set("v.result", actual);
        if (!actual) {
            component.set("v.problem", "Value is not truthy");
        }
    }
})