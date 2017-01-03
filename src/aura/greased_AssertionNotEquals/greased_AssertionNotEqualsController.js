({
    doInit: function (component, event, helper) {
        var deep = DeepDiff.noConflict();

        var diff = deep.diff;

        var expected = component.get("v.expected");
        var actual = component.get("v.value");
        var differences = diff(expected, actual);

        var space = 3;
        component.set("v.lhs", JSON.stringify(expected, null, space));
        component.set("v.rhs", JSON.stringify(actual, null, space));

        var passed = !$A.util.isUndefined(differences) && differences.length > 0;
        component.set("v.result", passed);

        if (passed) {
            component.set("v.problem", "Attribute value was the same");
        }
    }

})