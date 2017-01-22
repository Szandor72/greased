({
	doInit : function(component, event, helper) {
		//debugger;
	},
    onSearchTextChange : function(component, event, helper){
        component.set("v.characterCount", component.get("v.searchText").length);
    }
})