(() => {
    QUnit.module('App');

    QUnit.test("Has an App instance", (assert) => {
        assert.notEqual(App, undefined);
    });

    QUnit.test("App has a start() function", (assert) => {
        assert.notEqual(App.start, undefined);
    });

    QUnit.test("App has a list of static error messages", (assert) => {
        assert.deepEqual(
            App.ERRORS.INVALID_INITIALIZATION,
            "Invalid initialziation of App.start()! Modules must be passed as an argument.");
        assert.deepEqual(App.ERRORS.INPUT_MODULE_MISSING, "InputModule is missing!");
        assert.deepEqual(App.ERRORS.CPU_MODULE_MISSING, "CPUModule is missing!");
        assert.deepEqual(App.ERRORS.OUTPUT_MODULE_MISSING, "OutputModule is missing!");
    });

    QUnit.test("App.start() throws exception if has an empty argument", (assert) => {
        function functionBlock() {
            App.start();
        }

        function expectedMatcher(err) {
            return err === App.ERRORS.INVALID_INITIALIZATION;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test("App.start() throws exception if InputModule is missing", (assert) => {
        function functionBlock() {
            let mockModules = {
                InputModule: undefined, // Intentinally remove instance
                CPUModule: {}, // Mock module
                OutputModule: {} //  Mock module
            };
            App.start(mockModules);
        }

        function expectedMatcher(err) {
            return err === App.ERRORS.INPUT_MODULE_MISSING;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test("App.start() throws exception if CPUModule is missing", (assert) => {
        function functionBlock() {
            let mockModules = {
                InputModule: {}, //  Mock module
                CPUModule: undefined, // Intentinally remove instance
                OutputModule: {} //  Mock module
            };
            App.start(mockModules);
        }

        function expectedMatcher(err) {
            return err === App.ERRORS.CPU_MODULE_MISSING;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test("App.start() throws exception if OutputModule is missing", (assert) => {
        function functionBlock() {
            let mockModules = {
                InputModule: {}, //  Mock module
                CPUModule: {}, //  Mock module
                OutputModule: undefined // Intentinally remove instance
            };
            App.start(mockModules);
        }

        function expectedMatcher(err) {
            return err === App.ERRORS.OUTPUT_MODULE_MISSING;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

})();