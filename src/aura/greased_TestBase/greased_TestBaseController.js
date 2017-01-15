({
    doCommonInit: function (component, event, helper) {
        helper.sendToService(component, "c.load", {}, function (loadResult) {
            component.set("v.apexLoaded", true);
            helper.handleLoadRace(component, event, helper);
        });
        //debugger;
    },
    jsReady: function (component, event, helper) {
        component.set("v.javascriptLoaded", true);
        helper.handleLoadRace(component, event, helper);
    },
    handleToggle: function (component, event, helper) {
        helper.handleToggle(component);
    },
    loadDriver: function(component, event, helper) {
        component.set("v.driver", helper.driver(component, event, helper));
    },
    toggleAssertions: function(component, event, helper) {
        helper.handleToggle(component);
    }
})