({
    handleStartTests: function (component, event, helper) {
        // TODO waiting for the boxcar + delay can be done in super component and resolve the start promise there

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var empty = component.find("empty");
        var disabled = component.find("disabled");
        var loginAllowed = component.find("enabled");
        var loginRejected = component.find("rejected");

        test.start({
            current: empty, // TODO set an array of components and then set a module string to move through them
            some: "data you want available in all assertions"
        })

        // using a single chain for now. TODO fork into parallel chains once delayed attr read is solved

        //////////// #1 EMPTY ////////////

            .then(test.assert("v.loaded", "Form is in the loaded state after the Apex callback"))
            .then(test.wait(function (context) { // use test.wait to block the chain after this function
                empty.set("v.username", "");
            }))
            //.then(test.assertEquals(undefined, "v.username", "Username attribute is empty"))
            .then(test.assert("v.disabled", "Login not allowed when username and password are empty"))

            //////////// #2 DISABLED ////////////

            .then(function (context) {
                context.current = disabled;
                return context;
            })
            .then(test.assert("v.disabled", "Login not allowed when password is empty"))

            //////////// #3 ENABLED ////////////

            .then(function (context) {
                context.current = loginAllowed;
                return context;
            })
            .then(test.wait(function (context) {
                loginAllowed.set("v.password", "labrynth");
            }))
            .then(test.assertEquals("labrynth", "v.password", "Password attribute has been updated"))
            .then(test.assertEquals(false, "v.disabled",
                "Login button is enabled when both username and password have been entered"))

            ////////// #4 REJECTED ////////////

            .then(function (context) {
                context.current = loginRejected;
                return context;
            })

            .then(test.wait(function (context) {
                loginRejected.set("v.password", "labrynth");
            }))
            // whenDone blocks the chain until the done fn is called
            .then(test.whenDone(function (context, done) {
                console.log(context);
                loginRejected.login(done);
            }))
            .then(test.assertEquals("Invalid Username or Password", "v.message",
                "Apex service message is displayed to the user"))
            .then(test.assertEquals(false, "v.disabled",
                "Login button is still enabled after a failed login attempt"))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);

    }
})