({
    doInit: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var initial = component.find("initial");
        var loaded = component.find("loaded");
        var running = component.find("running");
        var passed = component.find("passed");
        var failed = component.find("failed");

        var startTests = test.start({
            focused: initial,
            description: "In the initial state"
        })

        startTests
            .then(test.setAttribute("v.status", "INIT"))
            .then(test.assertEquals("", "v.cssTheme", "Initial CSS style"))


            .then(test.focus(loaded, 'In the loading state'))
            .then(test.setAttribute("v.status", "LOADING"))
            .then(test.assertEquals("", "v.cssTheme", "Loading CSS style"))


            .then(test.focus(running, 'In the running state'))
            .then(test.setAttribute("v.status", "RUNNING"))
            .then(test.assertEquals("slds-theme--success", "v.cssTheme", "Running CSS style"))


            .then(test.focus(passed, 'In the passed state'))
            .then(test.setAttribute("v.status", "PASSED"))
            .then(test.assertEquals("slds-theme--success", "v.cssTheme", "Passed CSS style"))
            .then(test.assertEquals("utility:check", "v.icon", "Passed icon"))

            .then(test.focus(failed, 'In the failed state'))
            .then(test.setAttribute("v.status", "FAILED"))
            .then(test.assertEquals("slds-theme--error", "v.cssTheme", "Failed CSS style"))
            .then(test.assertEquals("utility:close", "v.icon", "Failed icon"))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);

    }
})