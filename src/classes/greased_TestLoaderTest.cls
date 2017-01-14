@IsTest
private class greased_TestLoaderTest {

    // this test provides coverage in case you want to install greased into production

    @IsTest
    private static void testLoad() {
        System.assertEquals('loaded', greased_TestLoader.load());
    }

}