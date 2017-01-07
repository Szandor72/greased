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

## Features

* Works with the LockerService enabled
* Can be used End to End testing full apps a la Selenium or at the smallest component level
* Support for testing Apex calls when loading a component and after user interactions, as well as asserting state changes after Apex calls complete

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

If you are building components for Communities or Sites then you can't control if your users are using "supported" browsers or not. In that case, you can still use promises in your tests but do not use them in you components. If you do this it also means that you cannot run these tests in the unsupported browsers and that means you lose some valuable automatic testing. For that reason, there is [an outstanding issue](https://github.com/stevebuik/greased/issues/8) to provide just enough "then" support as part of Greased so that tests can run in any browser. I'm hoping someone with more javascript skills than me (is that you?) can complete this one because Communities/Sites really need test coverage to be reliable.

## Credits

The idea of running assertions as an application came from watching https://www.youtube.com/watch?v=Hxmbl2Oj_cM but I tried this and it didn't work with the LockerService. I thought about it and realised that I only needed Assertions and Diff so I found https://github.com/flitbit/diff and discovered that it does work under LockerService. Building assertions on top of this was an easy leap.

The idea of testing N instances of the same component came from https://github.com/bhauman/devcards I've used this a lot in Clojurescript development and I figured that Lightning development benefits the same way so I built this into Greased.

Kudos to [Phillip Clark](https://github.com/flitbit), @bob_buzzard and @bhauman for sharing. This kind of cross-pollination is what OSS is all about.

## TODO (looking for volunteers, contact me if you can help)

Check [the FEATURE issues](https://github.com/stevebuik/greased/issues) for new features that would really help everyone who uses this tool. I will sing the praises of anyone who contributes.
