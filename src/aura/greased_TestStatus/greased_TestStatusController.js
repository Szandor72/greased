({
    deriveStyles: function (component, event, helper) {
        var status = component.get("v.status");
        var lookup = {
            "RUNNING": "",
            "PASSED": "slds-theme--success",
            "FAILED": "slds-theme--error",
        };
        var style = lookup[status];
        component.set("v.cssTheme", $A.util.isEmpty(style) ? "" : style);

        var icons = {
            "PASSED": "utility:check",
            "FAILED": "utility:close"
        }
        var icon = icons[component.get("v.status")];
        component.set("v.icon", $A.util.isEmpty(icon) ? "" : icon);

        document.title = status;
    },
    toggleAssertions: function (component, event, helper) {
        var toggle = component.getEvent("toggleDisplay");
        toggle.fire();
    }
})