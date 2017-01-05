<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <p>This test runs 4 instances of the component being tested (LoginForm) and drives each instance into a different state.
    Assertions are then made to ensure that the attributes of each instance contains the expected data.</p>

    <p>Open the javascript console to see extra information when running test, particularly when assertions are failing.</p>

    <c:LoginForm aura:id="empty"/>

    <c:LoginForm aura:id="disabled"/>

    <c:LoginForm aura:id="enabled"/>

    <c:LoginForm aura:id="rejected"/>

</aura:application>
