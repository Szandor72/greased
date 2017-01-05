# Greased Development
End to End testing for Lightning Components

![Demo](demo.gif "Demo")

Salesforce has plans (Safe-Harbour) to release a testing framework for Lightning but you can use this now. 

It's basically a Selenium test written in Lightning flavoured javascript. 
By testing this way, you can use the test during development to decrease your time to feedback.

## Benefits

Testing components using this technique provides two benefits:

* Normal testing, assertions and regression protection
* Faster development feedback by viewing N copies of your component in different states at the same time
* Works with the LockerService enabled

## Install

<p>Production
<a href="https://githubsfdeploy.herokuapp.com/app/githubdeploy/stevebuik/greased">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
</p>

<p>Sandbox
<a href="https://githubsfdeploy-sandbox.herokuapp.com/app/githubdeploy/stevebuik/greased">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
</p>

then change your browser uri to:

* /c/greased_LoginFormTests.app : a sample test for a sample login component
* /c/greased_TestStatusTests.app : tests for the components that make up the tool

The best way to learn how to use the tool is to [look at the sample app test](https://github.com/stevebuik/greased/blob/master/src/aura/greased_LoginFormTests/greased_LoginFormTestsController.js). 
The comments there should be clear but please log an issue if something is not clear and I'll fix it.

## Supported Browsers

Since most actions in Lightning are asynchronous, the test scripts are built using chains of Promises. The 
[documentation states](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_promises.htm) that promises are available in all supported browsers.

If you are building components for Communities or Sites then you can't control if your users are using "supported" browsers or not. In that case, you can still use promises in your tests but do not use them in you components. If you do this it also means that you cannot run these tests in the unsupported browsers and that means you lose some valuable automatic testing. For that reason, there is a TODO below to provide just enough "then" support as part of Greased so that tests can run in any browser.


## TODO (looking for volunteers, contact me if you can help)

* attribute to skip the fake apex call/race condition. used for tests that are client side only
* focus descriptions can be displayed in UI above components
* forked chains example i.e. parallel testing of N components
* better diff display for assertEquals component
* custom logger with control toggles switched on from the url/attribute and links
* non-supported browser thenable support
* SauceLabs/Selenium script to run a test
* ANT htmlunit task to invoke from CI
