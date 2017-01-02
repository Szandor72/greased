<aura:application description="Inherited features for Greased test apps"
                  abstract="true"
                  extends="force:slds">


    <ltng:require scripts="{!$Resource.greased_diff}" afterScriptsLoaded="{!c.jsReady}"/>

    <aura:attribute name="status" type="String" access="public" default="LOADING"
                    description="The status of the test"/>
    <aura:attribute name="assertions" type="Aura.Component[]" access="public"
                    description="All the assertion child components"/>
    <aura:attribute name="visibleAssertions" type="Aura.Component[]" access="public"
                    description="Assertion child components currently displayed"/>

    <aura:attribute name="showSuccesses" type="Boolean" default="false"
                    description="When true, shows all assertions, even those that succeeded"/>
    <aura:attribute name="failed" type="Boolean" default="false"
                    description="Indicates when an assertion has failed. Stops further assertions from being added"/>

    <aura:registerEvent name="startEvent" type="c:greased_StartTestingEvent"/>

    <aura:handler name="change" value="{!v.showSuccesses}" action="{!c.filter}"/>

    <lightning:layout horizontalAlign="space">
        <lightning:layoutItem flexibility="auto" padding="around-small">
            Controls
        </lightning:layoutItem>
        <lightning:layoutItem flexibility="auto" padding="around-small">
            <ui:inputCheckbox label="Show successful Assertions" value="{!v.showSuccesses}"/>
        </lightning:layoutItem>
    </lightning:layout>

    <hr/>

        {!v.body}

    <div>
        <div class="slds-notify slds-notify--alert slds-theme--success slds-theme--alert-texture" role="alert">
            <span class="slds-assistive-text">Success</span>
            <h2>
                {!v.status}
                <lightning:icon iconName="utility:check" size="small" class="success"/>
                    {!v.assertions.length} Assertion(s) Completed
            </h2>
        </div>
        <br/>

            {!v.visibleAssertions}
    </div>

</aura:application>
