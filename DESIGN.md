# Design

## Why asynchronous

* Dynamically adding components to the DOM is asynchronous
* Code being tested might call Apex, which is asynchronous

## Promises vs Callbacks

Promises only available in SFDC "Supported" browsers. In Communities, you have to assume users
will use un-supported browsers. For this reason, tests can be written using callbacks instead of 
Promises by passing callbacks to each assertion.

This means Promises cannot be used in client code. They could still be used in test code since you
control the browsers used to invoke tests but that means the tests cannot be used to check your code 
in all browsers that users might use.
