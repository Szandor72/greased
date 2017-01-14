({
    doInit: function (component, event, helper) {
        var deep = DeepDiff.noConflict();

        var diff = deep.diff;

        var expected = component.get("v.expected");
        var actual = component.get("v.value");
        var differences = diff(expected, actual);
        var space = 3;
        var passed = $A.util.isUndefined(differences) || differences.length == 0;
        component.set("v.lhs", JSON.stringify(expected, helper.replacer, space));
        component.set("v.rhs", JSON.stringify(actual, helper.replacer, space));
        component.set("v.result", passed);
        if (!passed) {
            component.set("v.problem", JSON.stringify(differences, helper.replacer, space));
        }
    }
})