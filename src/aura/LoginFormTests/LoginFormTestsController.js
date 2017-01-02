({
    handleStartTests: function (component, event, helper) {
        //console.log(event.getParam("componentNumber"));

        var test = helper.driver(component, event, helper);

        test.start({inital: 10})
            .then(test.assert(true, "The widget is ready"))
            .then(test.assert(true, "The widget is ready 2"))
            .then(test.promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("p3");
                    resolve("passed");
                }, 3000);
            }))
            .then(test.assert(true, "The widget is ready 3"))
            .then(test.assert(false, "The widget is ready 4"))
            .then(test.assert(true, "The widget is ready 5"))

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);


    }
})