({
	doInit : function(component, event, helper) {
		//debugger;
	},
    onSearchInputChange : function(component, event, helper){
        var searchText = component.find("searchInput").get("v.value");
        component.set("v.searchText", searchText);
        component.set("v.characterCount", searchText.length);
    }
})