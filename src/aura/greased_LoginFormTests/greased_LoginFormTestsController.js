({
    doInit: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var empty = component.find("empty");
        var disabled = component.find("disabled");
        var loginAllowed = component.find("enabled");
        var loginRejected = component.find("rejected");

        var usedByAll = "data you want available to all parts of the chain";

        // IMPORTANT: focus descriptions must be unique since they control how assertions are groups
        var startTests = test.start({
            focused: empty, // you can set the initial focus in test.start or using test.focus (see below)
            description: "The 1st form will have both fields empty and should be disabled",
        })

        // using a single chain. TODO fork into parallel chains once delayed attr read is solved

        //////////// #1 EMPTY ////////////

        startTests
            .then(test.assert("v.loaded", "The form should be loaded before tests start"))
            .then(test.wait(function (context) { // use test.wait to block the chain after this function
                // do anything in here. if you want to set attributes on the focused component, use test.setAttribute. See below.
                empty.set("v.username", ""); // or set attributes on any component directly on any component
            }))
            .then(test.assertEquals("", "v.username", "Username attribute is empty"))
            .then(test.assert("v.disabled", "Login not allowed when username and password are empty"))

            //////////// #2 DISABLED ////////////

            .then(test.focus(disabled, 'The 2nd login form has no changes made so should remain disabled'))
            .then(test.assert("v.disabled", "Login not allowed when password is empty"))

            //////////// #3 ENABLED ////////////

            .then(test.focus(loginAllowed, 'The 3rd login form will have both fields populated so should allow login attempts'))
            .then(test.setAttribute("v.password", "labrynth")) // an abbreviated way to set a single attribute. prefer this for brevity
            .then(test.assertNotEquals("", "v.password", "Password attribute has a value")) // not useful but demonstrates assertNotEquals
            .then(test.assertEquals("labrynth", "v.password", "Password attribute has been updated"))
            .then(test.assertEquals(false, "v.disabled",
                "Login button is enabled when both username and password have been entered"))
            .then(test.wait(function (context) {
                var allowed = loginAllowed.get("v.disabled");
                // an alternative way to assert a value. just use if.
                // this will not create an assertion in the test but will throw an error if it fails
                // this will be easier in future https://github.com/stevebuik/greased/issues/22
                if (allowed) {
                    throw Error("Login button is enabled when both username and password have been entered");
                }
            }))

            ////////// #4 REJECTED ////////////

            .then(test.focus(loginRejected, 'The 4th login form will have both fields populated so should allow login attempts'))
            .then(test.setAttributes({"v.password":"labrynth"})) // another abbreviated way to set attributes. this supports N attributes in one call
            .then(test.wait(function (context) {
                loginRejected.set("v.password", "labrynth");
                // using usedByAll is a closure i.e. this anonymous fn is able to access (close over) the variables from above
                // this is how you can create data accessible to the entire chain
                console.log(usedByAll);
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