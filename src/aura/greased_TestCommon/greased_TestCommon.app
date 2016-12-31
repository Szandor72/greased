<aura:application description="Inherited features for Greased test apps"
                  abstract="true"
                  extends="force:slds">


    <ltng:require scripts="{!$Resource.greased_diff}" afterScriptsLoaded="{!c.jsReady}"/>

    <aura:attribute name="assertions" type="Aura.Component[]" access="private"
                    description="All the assertion child components"/>
    <aura:attribute name="visibleAssertions" type="Aura.Component[]" access="private"
                    description="Assertion child components currently displayed"/>

    <aura:attribute name="showSuccesses" type="Boolean" default="false"
                    description="When true, shows all assertions, even those that succeeded"/>
    <aura:attribute name="failed" type="Boolean" default="false"
                    description="Indicates when an assertion has failed. Stops further assertions from being added"/>

    <aura:registerEvent name="startEvent" type="c:greased_StartTestingEvent"/>

    <aura:handler name="change" value="{!v.showSuccesses}" action="{!c.filter}"/>

    <aura:method name="assert" description="Check a boolean result"
                 action="{!c.assertOK}" access="public">
        <aura:attribute name="result" type="Boolean"/>
        <aura:attribute name="description" type="String"/>
    </aura:method>
    <aura:method name="assertEquals" description="Check that two values are equal"
                 action="{!c.assertEquals}" access="public">
        <aura:attribute name="expected" type="Object"/>
        <aura:attribute name="actual" type="Object"/>
        <aura:attribute name="description" type="String"/>
    </aura:method>
    <aura:method name="assertNotEquals" description="Check that two values are not equal"
                 action="{!c.assertNotEquals}" access="public">
        <aura:attribute name="expected" type="Object"/>
        <aura:attribute name="actual" type="Object"/>
        <aura:attribute name="description" type="String"/>
    </aura:method>

    <lightning:layout horizontalAlign="space">
        <lightning:layoutItem flexibility="auto" padding="around-small">
            Controls
        </lightning:layoutItem>
        <lightning:layoutItem flexibility="auto" padding="around-small">
            <ui:inputCheckbox label="Show successful Assertions" value="{!v.showSuccesses}"/>
        </lightning:layoutItem>
    </lightning:layout>

        {!v.body}

    <div>
        <aura:if isTrue="{!and(not(v.showSuccesses), v.assertions.length > 0)}">
            <div class="slds-notify slds-notify--alert slds-theme--success slds-theme--alert-texture" role="alert">
                <span class="slds-assistive-text">Success</span>
                <h2>
                    <lightning:icon iconName="utility:check" size="small" class="success"/>
                        {!v.assertions.length-1} Assertion(s) Succeeded
                </h2>
            </div>
            <br/>
        </aura:if>

            {!v.visibleAssertions}
    </div>

</aura:application>
