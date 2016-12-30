({
    jsReady: function (component, event, helper) {
        var appEvent = $A.get("e.c:greased_StartTestingEvent");
        appEvent.setParams({driver: component, componentNumber: 0});
        appEvent.fire();
    },
    assertOK: function (component, event, helper) {
        var params = event.getParam('arguments');
        helper.addAssertionOK(component, params.result, params.description);
    },
    assertEquals: function (component, event, helper) {
        var params = event.getParam('arguments');
        helper.addAssertionEquals(component, params.expected, params.actual, params.description);
    },
    assertNotEquals: function (component, event, helper) {
        var params = event.getParam('arguments');
        helper.addAssertionNotEquals(component, params.expected, params.actual, params.description);
    }
})