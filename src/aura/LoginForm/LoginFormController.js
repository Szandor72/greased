({
    doInit: function (component, event, helper) {
        helper.sendToService(component, "c.load", {}, function (loadResult) {
            console.log("loading username: "+loadResult.username);
            component.set("v.username", loadResult.username);
        });
    },
    adjust: function (component, event, helper) {
        var un = component.get("v.username");
        var pw = component.get("v.password");
        component.set("v.disabled", $A.util.isEmpty(un) || $A.util.isEmpty(pw));
    },
    doLogin: function (component, event, helper) {
        component.set("v.message", "Logging you in..");
        helper.sendToService(component, "c.login", {
            username: component.get("v.username"),
            password: component.get("v.password")
        }, function (loginResult) {
            $A.log(loginResult);
            component.set("v.message", loginResult.MSG);
        });
    }
})