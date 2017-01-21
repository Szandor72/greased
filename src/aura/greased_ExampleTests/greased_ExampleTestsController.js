({
    doInit: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var example1 = component.find("ex1");

        var startTests = test.start({
            focused: example1,
            description: "Testing the Lightning ui:inputSelect",
        })

        startTests

            .then(test.assertEquals("0", "v.count", "The default value comes from the options"))
            .then(test.assertEquals([0, 1, 2], "v.options", "options are loaded from child option tags. Interesting!"))

            .then(test.setAttribute("v.options", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

            // if you want to assert against javascript expressions, you can use test.assert with "value functions".
            // the reason you must wrap a function around your expression is to delay the evaluation until the promise
            // chain reaches your expression. If you try using a value without a fn, you'll be told how to assert properly.

            .then(test.assert(function () { // this is the "value function"
                return example1.get("v.options").length == 10;
            }, "all the bottles are hanging on the wall"))
            .then(test.assertEquals(10, function () {
                return example1.get("v.options").length;
            }, "10 green bottles are hanging on the wall"))
            .then(test.assertNotEquals(9, function () {
                return example1.get("v.options").length;
            }, "not nine green bottles are hanging on the wall"))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);


    }
})