<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:greased_ComponentTestLinks/>

    <p>This test runs 4 instances of the component being tested (LoginForm) and drives each instance into a different state.
        Assertions are then made to ensure that the attributes of each instance contains the expected data.</p>

    <p>Open the javascript console to see extra information when running test, particularly when assertions are failing.</p>

    <c:greased_LoginForm aura:id="empty"/>

    <c:greased_LoginForm aura:id="disabled"/>

    <c:greased_LoginForm aura:id="enabled"/>

    <c:greased_LoginForm aura:id="rejected"/>

</aura:application>
