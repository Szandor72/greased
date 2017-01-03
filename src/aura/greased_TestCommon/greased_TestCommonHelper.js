({
    // starting tests happens when the javascript and apex callback have both completed i.e. a race condition
    handleLoadRace: function (component, event, helper) {
        var jsLoaded = component.get("v.javascriptLoaded");
        var apexLoaded = component.get("v.apexLoaded");
        var startFn = component.get("v.startFn");
        if (jsLoaded && apexLoaded) {
            $A.log("race complete");
            startFn();
        }
    },
    driver: function (component, event, helper) {
        return {
            start: function (context) { // this will return a promise i.e. cause the chain to wait
                $A.log("start called by test");
                return new Promise(function (resolve, reject) {
                    var startFn = function () {
                        $A.log("Starting test chain..");
                        component.set("v.status", "RUNNING");
                        resolve(context);
                    };
                    component.set("v.startFn", startFn);
                });
            },
            focus: function (focusedComponent, description) {
                return function (context) {
                    context.focused = focusedComponent;
                    return context;
                }
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
                return $A.getCallback(
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
                return $A.getCallback(
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
                console.log("PASSED: Test context data will be displayed in console below.");
                console.log(context);
                component.set("v.status", "PASSED");
            },
            fail: function (error) {
                console.log(error);
                component.set("v.status", "FAILED");
            }
        };
    },
    addAssertion: function (component, type, params) {
        var helper = this;
        return $A.getCallback(
            function (context) { // when invoked using .then, this will wait for the previous promise to resolve
                return new Promise(function (resolve, reject) {
                    if ($A.util.isUndefinedOrNull(context.focused)) {
                        throw Error("No component is focused. Use test.start or test.focus!");
                    }
                    params.value = context.focused.get(params.expr);
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
    },
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
    },
    sendToService: function (component, method, params, callback) {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                callback(response.getReturnValue());
            } else if (component.isValid() && state === "ERROR") {
                $A.error("service call ERROR");
                this.showUnexpectedError(component);
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    $A.error("service call ERROR: " + errors[0].message);
                    this.showUnexpectedError(component);
                } else {
                    $A.error("Unknown error");
                    this.showUnexpectedError(component);
                }
            }
        });
        $A.enqueueAction(action);
    }
})