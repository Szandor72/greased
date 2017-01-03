public with sharing class greased_TestLoader {

    @AuraEnabled
    public static String load() {
        return 'loaded';
    }

}