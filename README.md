# greased
End to End testing for Lightning Components

![Demo](demo.gif "Demo")

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

* /c/LoginFormTests.app : a sample test for a sample login component
* /c/greased_TestStatusTests.app : tests for the components that make up the tool

The best way to learn how to use the tool is to [look at the sample app test](https://github.com/stevebuik/greased/blob/master/src/aura/LoginFormTests/LoginFormTestsController.js). 
The comments there should be clear but please log an issue if something is not clear and I'll fix it.

## TODO

* better diff display for assertEquals component
* custom logger with control toggles switched on from the url/attribute and links
* non-supported browser thenable support
* SauceLabs/Selenium script to run a test
* ANT htmlunit task to invoke from CI
