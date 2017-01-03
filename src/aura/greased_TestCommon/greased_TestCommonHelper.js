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
                    context.description = description;
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
                return helper.addAssertion(component, "c:greased_AssertionEquals", {
                    expr: expr,
                    expected: expected,
                    description: description
                });
            },
            assertNotEquals: function (expected, expr, description) {
                return helper.addAssertion(component, "c:greased_AssertionNotEquals", {
                    expr: expr,
                    expected: expected,
                    description: description
                });
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

                    var currentGroup = context.group;
                    var isNewGroupRequired = $A.util.isUndefinedOrNull(currentGroup) ||
                        context.description != context.group.get("v.description");

                    if (isNewGroupRequired) {
                        helper.newAssertionGroup(component, context.description,
                            function (group) {
                                var groups = component.get("v.assertionGroups");
                                groups.push(group);
                                context.group = group;
                                component.set("v.assertionGroups", groups);
                                helper.newAssertion(type, params, function (assertion) {
                                    var assertionPassed = assertion.get("v.result");
                                    if (assertionPassed) {
                                        helper.addAssertionToGroup(group, assertion);
                                        resolve(context);
                                    } else {
                                        component.set("v.failure", assertion);
                                        reject(Error(context.description + " : " + params.description));
                                    }
                                });
                            });
                    } else {
                        helper.newAssertion(type, params, function (assertion) {
                            var assertionPassed = assertion.get("v.result");
                            if (assertionPassed) {
                                helper.addAssertionToGroup(currentGroup, assertion);
                                resolve(context);
                            } else {
                                component.set("v.failure", assertion);
                                reject(Error(context.description + " : " + params.description));
                            }
                        });
                    }

                    helper.incrementCount(component);
                });
            });
    },
    incrementCount: function (component) {
        var c = component.get("v.count");
        component.set("v.count", c + 1);
    },
    addAssertionToGroup: function (group, assertion) {
        var assertions = group.get("v.assertions") || [];
        assertions.push(assertion);
        group.set("v.assertions", assertions);
    },
    newAssertionGroup: function (component, description, callback) {
        $A.createComponent("c:greased_AssertionGroup", {description: description},
            function (group, status, errorMessage) {
                if (status === "SUCCESS") {
                    callback(group);
                } else {
                    console.log(errorMessage);
                }
            }
        );
    },
    newAssertion: function (type, params, callback) {
        $A.createComponent(type, params,
            function (newAssertion, status, errorMessage) {
                if (status === "SUCCESS") {
                    callback(newAssertion);
                } else {
                    console.log(errorMessage);
                }
            }
        )
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