({
    doInit: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var empty = component.find("empty");
        var full = component.find("full");

        var startTests = test.start({
            focused: empty,
            description: "A group with no assertions"
        })

        startTests
            .then(test.wait(function (context) {
                empty.set("v.description", "A medium length description");
            }))

            .then(test.focus(full, 'A group containing assertions'))
            .then(test.wait(function (context) {
                full.set("v.description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
                helper.newAssertion("c:greased_AssertionOK",
                    {
                        expr: "v.description",
                        description: "The description in this group is populated"
                    }, function (assertion) {
                        helper.addAssertionToGroup(full, assertion);
                    });
                helper.newAssertion("c:greased_AssertionNotEquals",
                    {
                        expr: "v.description",
                        description: "Lorem...."
                    }, function (assertion) {
                        helper.addAssertionToGroup(full, assertion);
                    });
                helper.newAssertion("c:greased_AssertionEquals",
                    {
                        expr: "v.description",
                        description: "Lorem...."
                    }, function (assertion) {
                        helper.addAssertionToGroup(full, assertion);
                    });
            }))
            // .then(test.assertEquals("", "v.cssTheme", "Loading CSS style"))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);

    }
})