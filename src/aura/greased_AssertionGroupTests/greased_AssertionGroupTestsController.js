({
    doInit: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var input1 = component.find("input1");
        var input2 = component.find("input2");

        var startTests = test.start({
            focused: input1,
            description: "the first input"
        })

        startTests
            .then(test.wait(function(context) {
                helper.toggleAssertions(component, event, helper)
            }))
            .then(test.assertEquals("foo", "v.value","the reason for the expected value"))

            .then(test.focus(input2,"the second input"))
            .then(test.assertEquals("bar", "v.value","the reason for the expected value"))
            .then(test.wait(function(context) {
                input2.set("v.value", "baz")
            }))
            .then(test.assertEquals("baz", "v.value","the reason for the expected value"))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);

    }
})