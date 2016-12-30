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
    }

})