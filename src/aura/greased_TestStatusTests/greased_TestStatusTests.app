<aura:application extends="c:greased_TestCommon">

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <c:greased_ComponentTestLinks />

    <p>This test illustrates how it is useful to see N copies of a component in different states.
        This makes changes to CSS easier since you can easily check that changes work for all component states.</p>

    <c:greased_TestStatus aura:id="initial" count="0"/>
    <c:greased_TestStatus aura:id="loaded" count="0"/>
    <c:greased_TestStatus aura:id="running" count="3"/>
    <c:greased_TestStatus aura:id="passed" count="7"/>
    <c:greased_TestStatus aura:id="failed" count="7"/>

</aura:application>