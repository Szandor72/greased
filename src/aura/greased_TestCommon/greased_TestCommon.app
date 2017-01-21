<aura:application description="Common test features for Greased tests"
                  abstract="true"
                  extends="force:slds">

    <!--by extending this app instead of greased_TestBase, test inherit slds style and TODO parameter driven features-->

    <aura:attribute name="baseComponent" type="Aura.Component" access="public"
                    description="reference to the based component below. works around LockerService not allowing sub-components access to super-component markup."/>

    <aura:registerEvent name="initEvent" type="c:greased_InitEvent"/>
    <aura:handler name="initEvent" action="{!c.handleInit}"/>

    <c:greased_TestBase aura:id="base">
            {!v.body}
    </c:greased_TestBase>

</aura:application>
