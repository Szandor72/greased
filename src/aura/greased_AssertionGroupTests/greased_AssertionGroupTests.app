<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:greased_ComponentTestLinks />

    <p>Note: assertions in this test are fake. Just made to check the display of assertions in groups.</p>

    <p>Change one of the assertions to fail if you are working on failure display</p>

    <div class="slds-hide">
        <ui:inputText aura:id="input1" value="foo" label="Name"/>
        <ui:inputText aura:id="input2" value="bar" label="Name"/>
    </div>

</aura:application>