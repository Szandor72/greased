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

## Design requirements

Testing always seems to encourage good design and the same happens with Greased. Public attributes are part of a components API and they are primarily how you drive and assert about the state of components.

API methods (aura:method) are another good way to expose behaviours for testing. 

Eventually there will be a @TestVisible equivalent for Lightning. For now there are occasions where you need to expose attributes as public when it doesn't really feel like a public API. [A possible alternative](https://github.com/stevebuik/greased/issues/11)

When Apex calls are made, you need to invoke using a function which takes a callback. This allows the test (Promise) to wait for your Apex to return before proceeding. There is an example of this in the sample app/test.

## Change Log

Jan 11, 2017: added test.setAttribute and test.setAttributes to reduce boilerplate in tests 

## Supported Browsers

Since most actions in Lightning are asynchronous, the test scripts are built using chains of Promises. The 
[documentation states](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_promises.htm) that promises are available in all supported browsers.

If you are building components for Communities or Sites then you can't control if your users are using "supported" browsers or not. In that case, you can still use promises in your tests but do not use them in your components. If you do this it also means that you cannot run these tests in the unsupported browsers and that means you lose some valuable automatic testing. For that reason, there is [an outstanding issue](https://github.com/stevebuik/greased/issues/8) to provide just enough "then" support as part of Greased so that tests can run in any browser. I'm hoping someone with more javascript skills than me can complete this one because Communities/Sites really need test coverage to be reliable.

## Credits

The idea of running assertions as an application came from watching https://www.youtube.com/watch?v=Hxmbl2Oj_cM but it didn't work with the LockerService. However only Assertions and Diff are required from QUnit so https://github.com/flitbit/diff works under LockerService. Building assertions on top of this was an easy leap.

The idea of testing N instances of the same component came from https://github.com/bhauman/devcards In Clojurescript development this provides a delightful experience so Greased has it as well.

Kudos to [Phillip Clark](https://github.com/flitbit), [Keir Bowden](@bob_buzzard) and [Bruce Hauman](@bhauman) for sharing. This kind of cross-pollination is what OSS is all about.

Finally [Inventing on principle](https://www.youtube.com/watch?v=PUv66718DII) is an inspiration to any kind of software development. If you haven't seen it, it's worth the time.

## TODO (looking for help)

Check [the FEATURE issues](https://github.com/stevebuik/greased/issues) for new features that would really help everyone who uses this tool. I will sing the praises of anyone who contributes.
