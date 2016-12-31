({
    doInit: function(component, event, helper) {
        var deep = DeepDiff.noConflict();

        var diff = deep.diff;

        var expected = component.get("v.expected");
        var actual = component.get("v.actual");
        var differences = diff(expected, actual);
        var space = 3;
        component.set("v.lhs", JSON.stringify(expected, helper.replacer, space));
        component.set("v.rhs", JSON.stringify(actual, helper.replacer, space));
        component.set("v.diff",JSON.stringify(differences, helper.replacer, space));
        component.set("v.result", differences.length == 0);
    }
})