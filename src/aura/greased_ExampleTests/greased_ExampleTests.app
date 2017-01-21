<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:greased_ComponentTestLinks />

    <c:greased_Example aura:id="ex1"/>

</aura:application>
