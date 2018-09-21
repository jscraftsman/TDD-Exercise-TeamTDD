/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('App');

    QUnit.test('has an App instance', assert => {
        assert.notEqual(App, undefined);
    });

    QUnit.test('has an initialize() function', assert => {
        assert.notEqual(App.initialize, undefined);
    });

    QUnit.test('has a list of static error messages', assert => {
        assert.equal(App.ERRORS.INVALID_INITIALIZATION, 'Invalid initialization of App! Modules must be passed as an argument.');
        assert.equal(App.ERRORS.INPUT_MODULE_MISSING, 'InputModule is missing!');
        assert.equal(App.ERRORS.Arithmetic_MODULE_MISSING, 'ArithmeticModule is missing!');
        assert.equal(App.ERRORS.OUTPUT_MODULE_MISSING, 'OutputModule is missing!');
    });

    QUnit.test('has a initialize() function that throws an exception if it has an empty argument', assert => {
        function functionBlock() {
            App.initialize();
        }

        function expectedMatcher(err) {
            return err === App.ERRORS.INVALID_INITIALIZATION;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('has an initialize() function that throws an exception if InputModule is missing', assert => {
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

    QUnit.test('has an initialize() function that throws an exception if ArithmeticModule is missing', assert => {
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

    QUnit.test('has an initialize() function that throws an exception if OutputModule is missing', assert => {
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

    QUnit.test('has initialize() function that saves the modules in a variable', assert => {
        let mockModules = {
            InputModule: {}, //  Mock module
            ArithmeticModule: {}, //  Mock module
            OutputModule: {} // Mock module 
        };

        App.initialize(mockModules);
        assert.deepEqual(mockModules, App.MODULES);
    });

    QUnit.test('has an updateInput() function that invokes InputModule.setInput() and input is passed', assert => {
        App.MODULES = createMockAppModules(); 

        let spy = sinon.spy(App.MODULES.InputModule, 'setInput');

        let mockInput = 'random input string';
        App.updateInput(mockInput);

        assert.equal(spy.callCount, 1);
        assert.equal(spy.calledWith(mockInput), true);
    });


    QUnit.test('has a process() function that invokes some funcions from InputModule and ArithmeticModule', assert => {
        let leftOperand = 0;
        let operator = '+';
        let rightOperand = 0;

        App.MODULES = createMockAppModules(leftOperand, operator, rightOperand); 

        let loSpy = sinon.spy(App.MODULES.InputModule, 'getLeftOperand');
        let oSpy = sinon.spy(App.MODULES.InputModule, 'getOperator');
        let roSpy = sinon.spy(App.MODULES.InputModule, 'getRightOperand');
        let amSpy = sinon.spy(App.MODULES.ArithmeticModule, 'calculate');

        App.process(leftOperand, operator, rightOperand);

        assert.equal(loSpy.callCount, 1);
        assert.equal(oSpy.callCount, 1);
        assert.equal(roSpy.callCount, 1);
        assert.equal(amSpy.callCount, 1);
        assert.equal(amSpy.calledWith(leftOperand, operator, rightOperand), true);
    });

    function createMockAppModules(lo, o, ro) {
        let modules = {};
        modules.InputModule = createMockInputModule(lo, o, ro);
        modules.ArithmeticModule = createMockArithmeticModule();

        return modules;
    }

    function createMockInputModule(lo, o, ro) {
        let mockInputModule = {};
        mockInputModule.setInput = input => { };
        mockInputModule.getLeftOperand = () => { return lo };
        mockInputModule.getOperator = () => { return o; };
        mockInputModule.getRightOperand = () => { return ro; };

        return mockInputModule;
    }

    function createMockArithmeticModule() {
        let mockArithmeticModule = {};
        mockArithmeticModule.calculate = (lo, o, ro) => { };

        return mockArithmeticModule;
    }

    // @TODO: Throw exception if a function of App is used without performing App.initialize yet.
})();