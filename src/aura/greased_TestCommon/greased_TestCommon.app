<aura:application description="Inherited features for Greased test apps"
                  abstract="true"
                  extends="force:slds">


    <ltng:require scripts="{!$Resource.greased_diff}" afterScriptsLoaded="{!c.jsReady}"/>

    <aura:attribute name="assertions" type="Aura.Component[]" access="private"
                    description="All the assertion child components"/>
    <aura:attribute name="failed" type="Boolean" default="false"
                    description="Indicates when an assertion has failed. Stops further assertions from being added"/>

    <aura:registerEvent name="startEvent" type="c:greased_StartTestingEvent"/>

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
            <ui:inputCheckbox label="Show successful Assertions"/>
        </lightning:layoutItem>
    </lightning:layout>

        {!v.body}

        {!v.assertions}

</aura:application>
