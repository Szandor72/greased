<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:greased_ComponentTestLinks/>

    <c:greased_AssertionGroup aura:id="empty"/>
    <c:greased_AssertionGroup aura:id="full"/>

</aura:application>
