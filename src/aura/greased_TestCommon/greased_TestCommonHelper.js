({
    addAssertionOK: function (component, result, description) {
        if (!component.get("v.failed")) {
            this.addAssertion(component, "c:greased_AssertionOK", {result: result, description: description});
        }
    },
    addAssertionEquals: function (component, expected, actual, description) {
        if (!component.get("v.failed")) {
            this.addAssertion(component, "c:greased_AssertionEquals", {
                expected: expected,
                actual: actual,
                description: description
            });
        }
    },
    addAssertionNotEquals: function (component, result, description) {
        if (!component.get("v.failed")) {
            this.addAssertion(component, "c:greased_AssertionNotEquals", {
                expected: expected,
                actual: actual,
                description: description
            });
        }
    },
    addAssertion: function (component, type, params) {
        var helper = this;
        $A.createComponent(
            type, params,
            function (newComponent, status, errorMessage) {
                if (status === "SUCCESS") {
                    var assertions = component.get("v.assertions");
                    if ($A.util.isUndefined(assertions)) {
                        assertions = [newComponent]
                    } else {
                        assertions.push(newComponent);
                    }
                    component.set("v.assertions", assertions);
                    helper.filterAssertions(component);
                    if (!component.get("v.failed") && !newComponent.get("v.result")) {
                        component.set("v.failed", true);
                    }
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        )
    },
    filterAssertions: function (component) {
        var showSuccess = component.get("v.showSuccesses");
        var all = component.get("v.assertions");
        var visible = [];
        for (var i=0; i<all.length; i++) {

            console.log(all[i].get("v.description")+ " ->" + all[i].get("v.result"))
            if (showSuccess || (!showSuccess && !all[i].get("v.result"))) {
                visible.push(all[i]);
            }
        }
        component.set("v.visibleAssertions", visible);
    }
})