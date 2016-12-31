({
    handleStartTests: function(component, event, helper) {
        console.log(event.getParam("componentNumber"));
        var driver = event.getParam("driver");

        driver.assert(true, "The widget is ready");
        driver.assert(true, "The widget was ready");

        setTimeout(function() {
            driver.assertEquals({a: 1}, {a: 2}, "The vals match");
            //driver.assert(false, "The widget has value foo");
        }, 1000);
    }
})