<aura:application extends="c:greased_TestCommon">

    <aura:handler event="c:greased_StartTestingEvent" action="{!c.handleStartTests}"/>

    <c:LoginForm aura:id="empty"/>

    <c:LoginForm aura:id="disabled"/>

    <c:LoginForm aura:id="enabled"/>

    <c:LoginForm aura:id="rejected"/>

</aura:application>
