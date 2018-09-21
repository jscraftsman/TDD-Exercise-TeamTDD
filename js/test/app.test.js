/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('App');

    QUnit.test('Has an App instance', assert => {
        assert.notEqual(App, undefined);
    });

    QUnit.test('App has an initialize() function', assert => {
        assert.notEqual(App.initialize, undefined);
    });

    QUnit.test('App has a list of static error messages', assert => {
        assert.equal(App.ERRORS.INVALID_INITIALIZATION, 'Invalid initialization of App! Modules must be passed as an argument.');
        assert.equal(App.ERRORS.INPUT_MODULE_MISSING, 'InputModule is missing!');
        assert.equal(App.ERRORS.Arithmetic_MODULE_MISSING, 'ArithmeticModule is missing!');
        assert.equal(App.ERRORS.OUTPUT_MODULE_MISSING, 'OutputModule is missing!');
    });

    QUnit.test('App.initialize() throws exception if has an empty argument', assert => {
        function functionBlock() {
            App.initialize();
        }

        function expectedMatcher(err) {
            return err === App.ERRORS.INVALID_INITIALIZATION;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('App.initialize() throws exception if InputModule is missing', assert => {
        let expectedMatcher = err => err === App.ERRORS.INPUT_MODULE_MISSING;

        function functionBlock() {
            let mockModules = {
                InputModule: undefined, // Intentionally remove instance
                ArithmeticModule: {}, // Mock module
                OutputModule: {} //  Mock module
            };
            App.initialize(mockModules);
        }

        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('App.initialize() throws exception if ArithmeticModule is missing', assert => {
        let expectedMatcher = err => err === App.ERRORS.Arithmetic_MODULE_MISSING;

        function functionBlock() {
            let mockModules = {
                InputModule: {}, //  Mock module
                ArithmeticModule: undefined, // Intentionally remove instance
                OutputModule: {} //  Mock module
            };
            App.initialize(mockModules);
        }

        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('App.initialize() throws exception if OutputModule is missing', assert => {
        let expectedMatcher = err => err === App.ERRORS.OUTPUT_MODULE_MISSING

        function functionBlock() {
            let mockModules = {
                InputModule: {}, //  Mock module
                ArithmeticModule: {}, //  Mock module
                OutputModule: undefined // Intentionally remove instance
            };
            App.initialize(mockModules);
        }

        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('App.initialize saves the modules in a variable', assert => {
        let mockModules = {
            InputModule: {}, //  Mock module
            ArithmeticModule: {}, //  Mock module
            OutputModule: {} // Mock module 
        };

        assert.equal(App.MODULES, null);

        App.initialize(mockModules);

        assert.deepEqual(mockModules, App.MODULES);
    });

    QUnit.test('When App.updateInput() is called, InputModule.setInput() is also invoked and input is passed', assert => {
        App.MODULES = {}; // MOCK
        App.MODULES.InputModule = {
            setInput: function (input) { /* MOCK */ }
        };
        let spy = sinon.spy(App.MODULES.InputModule, 'setInput');

        let mockInput = 'random input string';
        App.updateInput(mockInput);

        assert.equal(spy.callCount, 1);
        assert.equal(spy.calledWith(mockInput), true);
    });


    // TODO: Throw exception if a function of App is used without performing App.initialize yet.
})();