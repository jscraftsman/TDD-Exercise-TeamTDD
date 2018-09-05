(() => {
    QUnit.module('App');

    QUnit.test("Has an App instance", (assert) => {
        assert.notEqual(App, undefined);
    });

    QUnit.test("App has a start() function", (assert) => {
        assert.notEqual(App.start, undefined);
    });

    QUnit.test("App has a list of static error messages", (assert) => {
        assert.deepEqual(App.INPUT_MODULE_MISSING_ERROR, "InputModule is missing!");
        assert.deepEqual(App.CPU_MODULE_MISSING_ERROR, "CPUModule is missing!");
        assert.deepEqual(App.OUTPUT_MODULE_MISSING_ERROR, "OutputModule is missing!");
    });

    QUnit.test("App.start() throws exception if InputModule is missing", (assert) => {
        function functionBlock() {
            InputModule = undefined; // Intentinally remove instance
            App.start();
        }

        function expectedMatcher(err) {
            return err === App.INPUT_MODULE_MISSING_ERROR;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test("App.start() throws exception if CPUModule is missing", (assert) => {
        function functionBlock() {
            InputModule = {}; // Mock InputModule
            CPUModule = undefined; // Intentinally remove instance
            App.start();
        }

        function expectedMatcher(err) {
            return err === App.CPU_MODULE_MISSING_ERROR;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test("App.start() throws exception if OutputModule is missing", (assert) => {
        function functionBlock() {
            InputModule = {}; // Mock InputModule
            CPUModule = {}; // Mock CPUModule
            OutputModule = undefined; // Intentinally remove instance
            App.start();
        }

        function expectedMatcher(err) {
            return err === App.OUTPUT_MODULE_MISSING_ERROR;
        }
        assert.throws(functionBlock, expectedMatcher);
    });
})();