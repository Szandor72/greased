({
	doInit : function(component, event, helper) {
		var testDriver = helper.driver(component, event, helper);
        var brandNewComponent = component.find("brandNewComponent");
        var searchInputComponent = brandNewComponent.find("searchInput");
        var searchTerm_Success = "Josephine von Eichendorff";
        var searchTerm_Failure = "su";
        //var textInput = brandNewComponent.find("searchInput");
        var myTests = testDriver.start({
            focused: brandNewComponent,
            description: "Test the initial state of the c:searchBarInputText"
        });
        //debugger;
        myTests
        .then(testDriver.assertEquals("", "v.searchText", "Search Text is initially empty"))
        //.then(testDriver.assert(true, "No warning badge is shown"))
        .then(testDriver.focus(searchInputComponent))
        .then(testDriver.setAttribute("v.value", searchTerm_Success))
        .then(testDriver.focus(brandNewComponent))
        .then(testDriver.assertEquals(searchTerm_Success, "v.searchText", "searchText must match Input value"))
        .then(testDriver.assertEquals(searchTerm_Success.length, "v.characterCount", "Character count must match search term length"))
        .then(testDriver.pass).catch(testDriver.fail);
	}
})