/* jshint esversion: 6 */

(() => {
    'use strict';

    const DISPLAY_MAP = {
        ONE: 'bc',
        TWO: 'abdeg'
    };

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

        spy.restore();
    });

    // @TODO: Refactor. DRY
    QUnit.test('has a process() function that invokes some functions from InputModule and ArithmeticModule', assert => {
        let leftOperand = 0;
        let operator = '+';
        let rightOperand = 0;
        let mockResult = 0;

        App.MODULES = createMockAppModules(leftOperand, operator, rightOperand);

        let loSpy = sinon.spy(App.MODULES.InputModule, 'getLeftOperand');
        let oSpy = sinon.spy(App.MODULES.InputModule, 'getOperator');
        let roSpy = sinon.spy(App.MODULES.InputModule, 'getRightOperand');
        let omSpy = sinon.spy(App.MODULES.OutputModule, 'setResult');

        let isValidStub = sinon.stub(App.MODULES.InputModule, 'isValid');
        let calculateStub = sinon.stub(App.MODULES.ArithmeticModule, 'calculate');

        isValidStub.returns(true);
        calculateStub.returns(mockResult);

        App.process();

        assert.equal(loSpy.callCount, 1);
        assert.equal(oSpy.callCount, 1);
        assert.equal(roSpy.callCount, 1);
        assert.equal(calculateStub.callCount, 1);
        assert.equal(calculateStub.calledWith(leftOperand, operator, rightOperand), true);
        assert.equal(omSpy.callCount, 1);
        assert.equal(omSpy.calledWith(mockResult), true);

        loSpy.restore();
        oSpy.restore();
        roSpy.restore();
        omSpy.restore();
        isValidStub.restore();
        calculateStub.restore();
    });

    // @TODO: Refactor. DRY
    QUnit.test('has a process() function that does not invoke necessary functions if input is invalid', assert => {
        let leftOperand = 0;
        let operator = '+';
        let rightOperand = 0;

        App.MODULES = createMockAppModules(leftOperand, operator, rightOperand);

        let loSpy = sinon.spy(App.MODULES.InputModule, 'getLeftOperand');
        let oSpy = sinon.spy(App.MODULES.InputModule, 'getOperator');
        let roSpy = sinon.spy(App.MODULES.InputModule, 'getRightOperand');
        let amSpy = sinon.spy(App.MODULES.ArithmeticModule, 'calculate');
        let omSpy = sinon.spy(App.MODULES.OutputModule, 'setResult');

        let isValidStub = sinon.stub(App.MODULES.InputModule, 'isValid');
        isValidStub.returns(false);

        App.process();

        assert.equal(loSpy.callCount, 0);
        assert.equal(oSpy.callCount, 0);
        assert.equal(roSpy.callCount, 0);
        assert.equal(amSpy.callCount, 0);
        assert.equal(omSpy.callCount, 0);

        loSpy.restore();
        oSpy.restore();
        roSpy.restore();
        amSpy.restore();
        omSpy.restore();
        isValidStub.restore();
    });

    // @TODO: Refactor. DRY
    QUnit.test('has a getOutput() function that returns true for INVALID_INPUT if input is invalid', assert => {
        let leftOperand = 0;
        let operator = '+';
        let rightOperand = 0;

        App.MODULES = createMockAppModules(leftOperand, operator, rightOperand);

        let stub = sinon.stub(App.MODULES.InputModule, 'isValid');
        stub.returns(false);

        let output = App.getOutput();

        assert.equal(output.INVALID_INPUT, true);

        stub.restore();
    });

    // @TODO: Refactor. DRY
    QUnit.test('has a getOutput() function that returns false for INVALID_INPUT if input is invalid', assert => {
        let leftOperand = 0;
        let operator = '+';
        let rightOperand = 0;

        App.MODULES = createMockAppModules(leftOperand, operator, rightOperand);

        let stub = sinon.stub(App.MODULES.InputModule, 'isValid');
        stub.returns(true);

        let output = App.getOutput();

        assert.equal(output.INVALID_INPUT, false);

        stub.restore();
    });

    // @TODO: Refactor. DRY
    QUnit.test('has a getOutput() function that returns the results from OutputModule', assert => {
        let leftDigitMock = DISPLAY_MAP.ONE;
        let rightDigitMock = DISPLAY_MAP.TWO;

        App.MODULES = createMockAppModules();

        let imStub = sinon.stub(App.MODULES.InputModule, 'isValid');
        let ldStub = sinon.stub(App.MODULES.OutputModule, 'getLeftDigit');
        let rdStub = sinon.stub(App.MODULES.OutputModule, 'getRightDigit');

        imStub.returns(true);
        ldStub.returns(leftDigitMock);
        rdStub.returns(rightDigitMock);

        let output = App.getOutput();

        assert.equal(ldStub.callCount, 1);
        assert.equal(output.RESULT.LEFT_DIGIT, leftDigitMock);
        assert.equal(output.RESULT.RIGHT_DIGIT, rightDigitMock);

        imStub.restore();
        ldStub.restore();
        rdStub.restore();
    });

    function createMockAppModules(lo, o, ro) {
        let modules = {};
        modules.InputModule = createMockInputModule(lo, o, ro);
        modules.ArithmeticModule = createMockArithmeticModule();
        modules.OutputModule = createMockOutputModule();

        return modules;
    }

    function createMockInputModule(lo, o, ro) {
        let mockInputModule = {};
        mockInputModule.setInput = input => {};
        mockInputModule.getLeftOperand = () => {
            return lo
        };
        mockInputModule.getOperator = () => {
            return o;
        };
        mockInputModule.getRightOperand = () => {
            return ro;
        };
        mockInputModule.isValid = () => {};

        return mockInputModule;
    }

    function createMockArithmeticModule() {
        let mockArithmeticModule = {};
        mockArithmeticModule.calculate = (lo, o, ro) => {
            return 0;
        };

        return mockArithmeticModule;
    }

    function createMockOutputModule() {
        let mockOutputModule = {};
        mockOutputModule.setResult = (result) => {};
        mockOutputModule.getLeftDigit = () => {
            return 'MOCK';
        };
        mockOutputModule.getRightDigit = () => {
            return 'MOCK';
        };

        return mockOutputModule;
    }

    // @TODO: Throw exception if a function of App is used without performing App.initialize yet.
})();