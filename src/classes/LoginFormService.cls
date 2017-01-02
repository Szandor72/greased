public with sharing class LoginFormService {

    @AuraEnabled
    public static Map<String, String> load() {
        return new Map<String, String>{'username' => 'dbowie'};
    }

    @AuraEnabled
    public static Map<String, String> login(String username, String password) {
        return new Map<String, String>{'MSG' => 'Invalid Username or Password'};
    }
}