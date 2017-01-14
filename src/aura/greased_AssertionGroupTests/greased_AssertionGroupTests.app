<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:greased_ComponentTestLinks />

    <p>Note that there are no assertions made here.
        This is just used to check Groups with/without Assertions and how the various Assertion compare to each other.</p>

    <c:greased_AssertionGroup aura:id="empty"/>
    <c:greased_AssertionGroup aura:id="full"/>

</aura:application>