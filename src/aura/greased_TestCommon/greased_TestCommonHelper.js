({
    driver: function (component, event, helper) {
        return {
            start: function (context) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        $A.log("starting tests");
                        component.set("v.status", "RUNNING");
                        resolve(context);
                    }, 3000);
                });
            },
            assert: function (result, description) {
                return helper.addAssertion(component, "c:greased_AssertionOK", {
                    result: result,
                    description: description
                });
            },
            assertEquals: function (expected, actual, description) {
                if (!component.get("v.failed")) {
                    return helper.addAssertion(component, "c:greased_AssertionEquals", {
                        expected: expected,
                        actual: actual,
                        description: description
                    });
                }
            },
            assertNotEquals: function (expected, actual, description) {
                if (!component.get("v.failed")) {
                    return helper.addAssertion(component, "c:greased_AssertionNotEquals", {
                        expected: expected,
                        actual: actual,
                        description: description
                    });
                }
            },
            promise: function (handler) {
                return new function (v) {
                    return new Promise(handler);
                }
            },
            pass: function (context) {
                component.set("v.status", "PASS");
            },
            fail: function (error) {
                component.set("v.status", "FAIL");
            }
        };
    },
    addAssertion: function (component, type, params) {
        var helper = this;
        return $A.getCallback( // allows changes to lightning attributes https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_promises.htm
            function (value) { // when invoked using .then, this will wait for the previous promise to resolve
                return new Promise(function (resolve, reject) {
                    $A.log('asserting: ' + params.description);
                    $A.createComponent(type, params,
                        function (newComponent, status, errorMessage) {
                            if (status === "SUCCESS") {

                                // add the new assertion component to the UI
                                var assertions = component.get("v.assertions");
                                if ($A.util.isUndefined(assertions)) {
                                    assertions = [newComponent]
                                } else {
                                    assertions.push(newComponent);
                                }
                                component.set("v.assertions", assertions);

                                // filter assertions to only show what user wants to see
                                // TODO move all filtering to an AssertGroup component.
                                helper.filterAssertions(component);

                                // control continuation of test
                                var assertionPassed = newComponent.get("v.result");
                                if (!component.get("v.failed") && !assertionPassed) {
                                    component.set("v.failed", true);
                                }

                                // promise handling
                                if (assertionPassed) {
                                    resolve(value);
                                } else {
                                    $A.log("rejecting: " + params.description);
                                    reject(Error("Assertion failed: " + params.description));
                                }

                            } else if (status === "INCOMPLETE") {
                                reject(Error("No response from server or client is offline."));
                            }
                            else if (status === "ERROR") {
                                reject(Error(errorMessage));
                            }
                        }
                    );
                });
            });
    }
    ,
    filterAssertions: function (component) {
        var showSuccess = component.get("v.showSuccesses");
        var all = component.get("v.assertions") || [];
        var visible = [];
        for (var i = 0; i < all.length; i++) {
            if (showSuccess || (!showSuccess && !all[i].get("v.result"))) {
                visible.push(all[i]);
            }
        }
        component.set("v.visibleAssertions", visible);
    }
})