({
    deriveStyles: function (component, event, helper) {
        var lookup = {
            "RUNNING": "slds-theme--success",
            "PASSED": "slds-theme--success",
            "FAILED": "slds-theme--error",
        };
        var style = lookup[component.get("v.status")];
        component.set("v.cssTheme", $A.util.isEmpty(style) ? "" : style);

        var icons = {
            "PASSED": "utility:check",
            "FAILED": "utility:close"
        }
        var icon = icons[component.get("v.status")];
        component.set("v.icon", $A.util.isEmpty(icon) ? "" : icon);
    },
    toggleAssertions: function(component, event, helper) {
        var toggle = component.getEvent("toggleDisplay");
        toggle.fire();
    }
})