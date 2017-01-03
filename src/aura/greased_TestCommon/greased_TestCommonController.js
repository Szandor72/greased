({
    doInit: function (component, event, helper) {
        helper.sendToService(component, "c.load", {}, function (loadResult) {
            component.set("v.apexLoaded", true);
            helper.handleLoadRace(component, event, helper);
        })
    },
    jsReady: function (component, event, helper) {
        component.set("v.javascriptLoaded", true);
        helper.handleLoadRace(component, event, helper);
    },
    filter: function (component, event, helper) {
        helper.filterAssertions(component);
    }
})