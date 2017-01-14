({
	doInit : function(component, event, helper) {
		var testDriver = helper.driver(component, event, helper);
        var brandNewComponent = component.find("brandNewComponent");
        var searchTerm = "Josephine von Eichendorff";
        var textInput = brandNewComponent.find("searchInput");
        var myTests = testDriver.start({
            focused: brandNewComponent,
            description: "Test the initial state of the c:searchBarInputText",
        });
        //debugger;
        myTests
        .then(testDriver.assertEquals("","v.searchText","Search Text is initially empty"))
        .then(testDriver.assert(true,"No warning badge is shown"))
        .then(testDriver.wait(function(context){
            textInput.set("v.value", searchTerm);
        }))
        .then(testDriver.assertEquals(searchTerm.length,"v.characterCount", "Character count must match search term length"))
        .then(testDriver.pass).catch(testDriver.fail);
	}    
})