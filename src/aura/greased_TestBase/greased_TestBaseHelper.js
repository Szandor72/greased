({
    // starting tests happens when the javascript and apex callback have both completed i.e. a race condition
    handleLoadRace: function (component, event, helper) {
        var jsLoaded = component.get("v.javascriptLoaded");
        var apexLoaded = component.get("v.apexLoaded");
        var startFn = component.get("v.startFn");
        if (jsLoaded && apexLoaded) {
            $A.log("race complete");
            if (startFn) {
                startFn();
            } else {
                alert("test.start has not been invoked. Add an init handler to this app.");
            }
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
            setAttribute: function (attribute, value) {
                return function (context) {
                    context.focused.set(attribute, value);
                    return context;
                }
            },
            setAttributes: function (values) {
                return function (context) {
                    for (var key in values) {
                        context.focused.set(key, values[key]);
                    }
                    return context;
                }
            },
            assert: function (expr, description) {
                if (helper.isAttributeExpression(expr)) {
                    return helper.addFocusedExpressionAssertion(component, "c:greased_AssertionOK", {
                        expr: expr,
                        description: description
                    });
                } else if (helper.isFunctionExpression(expr)) {
                    return helper.addValueFunctionAssertion(component, helper, "c:greased_AssertionOK",
                        {
                            expr: "n/a",
                            description: description
                        }, expr);
                } else {
                    throw Error("Assertions can evaluate either a 'v.attribute' string of a function when checking values. You passed a: " + (typeof expr))
                }
            },
            assertEquals: function (expected, expr, description) {
                if (helper.isAttributeExpression(expr)) {
                    return helper.addFocusedExpressionAssertion(component, "c:greased_AssertionEquals", {
                        expr: expr,
                        expected: expected,
                        description: description
                    });
                } else if (helper.isFunctionExpression(expr)) {
                    return helper.addValueFunctionAssertion(component, helper, "c:greased_AssertionEquals",
                        {
                            expr: "n/a",
                            expected: expected,
                            description: description
                        }, expr);
                } else {
                    throw Error("Assertions can evaluate either a 'v.attribute' string or a function when checking values. You passed a: " + (typeof expr))
                }
            },
            assertNotEquals: function (expected, expr, description) {
                if (helper.isAttributeExpression(expr)) {
                    return helper.addFocusedExpressionAssertion(component, "c:greased_AssertionNotEquals", {
                        expr: expr,
                        expected: expected,
                        description: description
                    });
                } else if (helper.isFunctionExpression(expr)) {
                    return helper.addValueFunctionAssertion(component, helper, "c:greased_AssertionNotEquals",
                        {
                            expr: "n/a",
                            expected: expected,
                            description: description
                        }, expr);
                } else {
                    throw Error("Assertions can evaluate either a 'v.attribute' string or a function when checking values. You passed a: " + (typeof expr))
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
            sleep: function (ms) {
                return $A.getCallback(
                    function (v) {
                        return new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                resolve(v);
                            }, ms)
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
                console.log("FAILED: Error data will be displayed in console below.");
                console.log(error.message);
                console.log(error.stackTrace);
                component.set("v.status", "FAILED");
            }
        };
    },
    isAttributeExpression: function (expr) {
        return typeof expr == "string" && expr.indexOf("v.") == 0;
    },
    isFunctionExpression: function (expr) {
        return typeof expr == "function";
    },
    addFocusedExpressionAssertion: function (component, type, params) {
        var helper = this;
        return $A.getCallback(
            function (context) { // when invoked using .then, this will wait for the previous promise to resolve
                return new Promise(function (resolve, reject) {

                    if ($A.util.isUndefinedOrNull(context.focused)) {
                        throw Error("No component is focused. Use test.start or test.focus!");
                    }

                    // evaluate the value expression using the focused component
                    var actualValue = context.focused.get(params.expr);
                    // clone the value so that it's immutable i.e. other "threads" don't change it before the assertion can check it
                    var clonedValue = JSON.parse(JSON.stringify(actualValue));
                    // load the value into the params for the assertion
                    params.value = clonedValue;

                    helper.addAssertionAndGroup(component, type, params, context, resolve, reject);

                });
            });
    },
    addValueFunctionAssertion: function (component, helper, type, params, valueFunction) {
        return $A.getCallback(
            function (context) {
                return new Promise(function (resolve, reject) {

                    // invoking the value fn here ensures evaluation of the expr blocks till this promise is executed
                    params.value = valueFunction(context);

                    helper.addAssertionAndGroup(component, type, params, context, resolve, reject);
                });
            });
    },
    incrementCount: function (component) {
        var c = component.get("v.assertionCount");
        component.set("v.assertionCount", c + 1);
    },
    isNewGroupRequired: function (component, context) {
        var currentGroup = component.get("v.currentAssertionGroup");
        return $A.util.isUndefinedOrNull(currentGroup) || context.description != currentGroup.get("v.description");
    },
    addAssertionAndGroup: function (component, type, params, context, resolve, reject) {
        var isNewGroupRequired = this.isNewGroupRequired(component, context);
        var helper = this;
        if (isNewGroupRequired) {
            helper.newAssertionGroup(component, context.description,
                function (group) {
                    var groups = component.get("v.assertionGroups");
                    groups.push(group);
                    component.set("v.assertionGroups", groups);
                    component.set("v.currentAssertionGroup", group);

                    // TODO use promises to chain these together
                    helper.newAssertion(type, params, function (assertion) {
                        helper.addAssertionToCurrent(component, assertion, context, resolve, reject);
                    });
                });
        } else {
            helper.newAssertion(type, params, function (assertion) {
                helper.addAssertionToCurrent(component, assertion, context, resolve, reject);
            });
        }
    },
    addAssertionToCurrent: function (component, assertion, context, resolve, reject) {
        var group = component.get("v.currentAssertionGroup");
        var assertionPassed = assertion.get("v.result");
        this.incrementCount(component);
        if (assertionPassed) {
            this.addAssertionToGroup(group, assertion);
            if (context) {
                resolve(context);
            }
        } else {
            component.set("v.failure", assertion);
            if (context) {
                reject(Error(context.description + " : " + assertion.get("v.description")));
            }
        }
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
    handleToggle: function (component) {
        var show = component.get("v.showAssertions");
        component.set("v.showAssertions", !show);
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