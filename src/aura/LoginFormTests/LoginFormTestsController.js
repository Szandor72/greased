({
    handleStartTests: function (component, event, helper) {
        // TODO waiting for the boxcar + delay can be done in super component and resolve the start promise there

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var empty = component.find("empty");
        var disabled = component.find("disabled");
        var loginAllowed = component.find("enabled");
        var loginRejected = component.find("rejected");

        var startTests = test.start({
            focused: empty, // you can set the initial focus in test.start or using test.focus (see below)
            any: "data you want available in all assertions"
        })

        // using a single chain for now. TODO fork into parallel chains once delayed attr read is solved

        //////////// #1 EMPTY ////////////

        startTests
            .then(test.assert("v.loaded", "The 1st form will have both fields empty and should be disabled"))
            .then(test.wait(function (context) { // use test.wait to block the chain after this function
                empty.set("v.username", "");
            }))
            .then(test.assertEquals("", "v.username", "Username attribute is empty"))
            .then(test.assert("v.disabled", "Login not allowed when username and password are empty"))

            //////////// #2 DISABLED ////////////

            .then(test.focus(disabled, 'The 2nd login form has no changes made so should remain disabled'))
            .then(test.assert("v.disabled", "Login not allowed when password is empty"))

            //////////// #3 ENABLED ////////////

            .then(test.focus(loginAllowed, 'The 3rd login form will have both fields populated so should allow login attempts'))
            .then(test.wait(function (context) {
                loginAllowed.set("v.password", "labrynth");
            }))
            .then(test.assertEquals("labrynth", "v.password", "Password attribute has been updated"))
            .then(test.assertEquals(false, "v.disabled",
                "Login button is enabled when both username and password have been entered"))

            ////////// #4 REJECTED ////////////

            .then(test.focus(loginRejected, 'The 4th login form will have both fields populated so should allow login attempts'))
            .then(test.wait(function (context) {
                loginRejected.set("v.password", "labrynth");
            }))
            // whenDone blocks the chain until the done fn is called
            .then(test.whenDone(function (context, done) {
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