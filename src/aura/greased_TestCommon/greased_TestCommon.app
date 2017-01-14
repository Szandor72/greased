<aura:application description="Inherited features for Greased test apps"
                  abstract="true"
                  controller="greased_TestLoader"
                  extends="force:slds">

    <ltng:require scripts="{!$Resource.greased_diff}" afterScriptsLoaded="{!c.jsReady}"/>

    <aura:attribute name="status" type="String" access="public" default="LOADING"
                    description="The status of the test"/>

    <aura:attribute name="count" type="Integer" access="public" default="0"
                    description="The count of assertions processed"/>

    <aura:attribute name="assertionGroups" type="Aura.Component[]" access="public"
                    description="All assertions, grouped by focused component description"/>
    <aura:attribute name="failure" type="Aura.Component" access="public"
                    description="The failed assertion, always displayed"/>
    <aura:attribute name="showAssertions" type="Boolean" default="false"
                    description="When true, shows assertions"/>

    <aura:attribute name="javascriptLoaded" type="Boolean" default="false" access="public"
                    description="Set true when all the javascript assets have been loaded"/>
    <aura:attribute name="apexLoaded" type="Boolean" default="false" access="public"
                    description="Set true when the initial Apex called have been completed"/>
    <aura:attribute name="startFn" type="Object" access="public"
                    description="The fn that will be invoked when the tests can begin"/>

    <aura:handler name="init" value="{!this}" action="{!c.doCommonInit}"/>

    <aura:handler name="toggleDisplay" event="c:greased_ToggleDisplayEvent" action="{!c.handleToggle}"/>

    <c:greased_TestStatus status="{!v.status}" count="{!v.count}"/>

    <hr/>

        {!v.body}

    <hr/>

    <aura:if isTrue="{!v.showAssertions}">
            {!v.assertionGroups}
    </aura:if>

        {!v.failure}

</aura:application>