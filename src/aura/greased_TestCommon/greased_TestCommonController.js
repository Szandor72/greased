({
    jsReady: function (component, event, helper) {
        var appEvent = $A.get("e.c:greased_StartTestingEvent");
        appEvent.setParams({driver: component, componentNumber: 0});
        appEvent.fire();
    },
    filter: function (component, event, helper) {
        helper.filterAssertions(component);
    }
})