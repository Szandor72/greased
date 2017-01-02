({
    driver: function (component, event, helper) {
        return {
            start: function (context) { // this will return a promise i.e. cause the chain to wait
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        $A.log("Starting test chain..");
                        component.set("v.status", "RUNNING");
                        resolve(context);
                    }, 1000);
                });
            },
            assert: function (expr, description) {
                return helper.addAssertion(component, "c:greased_AssertionOK", {
                    expr: expr,
                    description: description
                });
            },
            assertEquals: function (expected, expr, description) {
                if (!component.get("v.failed")) {
                    return helper.addAssertion(component, "c:greased_AssertionEquals", {
                        expr: expr,
                        expected: expected,
                        description: description
                    });
                }
            },
            assertNotEquals: function (expected, expr, description) {
                if (!component.get("v.failed")) {
                    return helper.addAssertion(component, "c:greased_AssertionNotEquals", {
                        expr: expr,
                        expected: expected,
                        description: description
                    });
                }
            },
            wait: function (handler) {
                return $A.getCallback( // allows changes to lightning attributes https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_promises.htm
                    function (v) {
                        return new Promise(function (resolve, reject) {
                            try {
                                handler(v);
                                resolve(v);
                            } catch (e) {
                                reject(e);
                            }
                        });
                    });
            },
            whenDone: function (handler) {
                return $A.getCallback( // allows changes to lightning attributes https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_promises.htm
                    function (v) {
                        return new Promise(function (resolve, reject) {
                            try {
                                handler(v, function () {
                                    resolve(v);
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                    });
            },
            pass: function (context) {
                console.log("PASSED: " + JSON.stringify(context));
                component.set("v.status", "PASS");
            },
            fail: function (error) {
                console.log(error);
                component.set("v.status", "FAIL");
            }
        };
    },
    addAssertion: function (component, type, params) {
        var helper = this;
        return $A.getCallback( // see above comment in "wait"
            function (context) { // when invoked using .then, this will wait for the previous promise to resolve
                return new Promise(function (resolve, reject) {
                    // TODO current change
                    params.value = context.current.get(params.expr);
                    $A.log('asserting: ' + params.description + " " + params.expr + " " + params.result);
                    $A.log('context: ' + JSON.stringify(context));
                    $A.log('params: ' + JSON.stringify(params));
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
                                    resolve(context);
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