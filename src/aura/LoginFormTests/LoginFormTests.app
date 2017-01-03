<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:LoginForm aura:id="empty"/>

    <c:LoginForm aura:id="disabled"/>

    <c:LoginForm aura:id="enabled"/>

    <c:LoginForm aura:id="rejected"/>

</aura:application>
