({
    handleInit: function (component, event, helper) {
        // set base component in an attribute so it can be read by fns invoked from sub-components
        // using a component event for this is a workaround to LockerService inheritance access behaviour
        component.set("v.baseComponent", component.find("base"));
        event.stopPropagation();
    }
})