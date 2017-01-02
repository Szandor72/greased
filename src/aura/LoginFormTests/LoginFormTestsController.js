({
    handleStartTests: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        var empty = component.find("empty");
        var disabled = component.find("disabled");
        var loginAllowed = component.find("enabled");
        var loginRejected = component.find("rejected");

        test.start()

        //////////// #1 LOGIN DISABLED ////////////

        // use test.wait to block the chain after this function
            .then(test.wait(function (context) {
                console.log("test1");
                empty.set("v.username", "");
            }))
            .then(test.assert(empty.get("v.disabled"), "Login not allowed when username and password are empty"))

            //////////// #2 LOGIN DISABLED ////////////

            // use test.wait to block the chain after this function
            .then(test.assert(disabled.get("v.disabled"), "Login not allowed when password is empty"))

            //////////// #3 LOGIN ENABLED ////////////

            .then(test.wait(function (context) {
                console.log(context);
                loginAllowed.set("v.password", "labrynth");
            }))
            // .then(test.assert(!loginAllowed.get("v.disabled"),
            //     "Login button is enabled when both username and password have been entered"))

            ////////// #4 LOGIN REJECTED ////////////

            .then(test.wait(function (context) {
                loginRejected.set("v.username", "dbowie"); // TODO workaround race condition
                loginRejected.set("v.password", "labrynth");
                loginRejected.login();
            }))
            .then(test.assert(!loginRejected.get("v.disabled"),
                "Login button is still enabled after a failed login attempt"))
            .then(test.assertEquals("Invalid Username or Password", loginRejected.get("v.message"),
                "Apex service message is displayed"))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);

    }
})