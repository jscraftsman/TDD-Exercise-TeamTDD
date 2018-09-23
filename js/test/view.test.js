/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('View');

    QUnit.test('has a View instance', assert => {
        assert.notEqual(View, undefined);
    });

    QUnit.test('has an initialize() function', assert => {
        assert.notEqual(View.initialize, undefined);
    });

    QUnit.test('has a list of static error messages', assert => {
        assert.equal(View.ERRORS.INVALID_INITIALIZATION, 'Invalid initialziation of View! App instance must be passed as an argument.');
        assert.equal(View.ERRORS.INVALID_INPUT, 'Invalid input!');
    });

    QUnit.test('has an initialize() function that throws an exception if it has an empty argument', assert => {
        function functionBlock() {
            View.initialize();
        }

        function expectedMatcher(err) {
            return err === View.ERRORS.INVALID_INITIALIZATION;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('has an initialize() function that adds an DOM onChange event listener', assert => {
        View.initialize(App);

        let inputDOM = document.querySelector('#input');
        assert.notEqual(inputDOM.oninput, null);
        assert.deepEqual(inputDOM.oninput, View.inputChangeHandler);
    });

    QUnit.test('has an initialize() function that stores the instance of App into a variable', assert => {
        let mockAppInstance = {};

        View.initialize(mockAppInstance);
        assert.deepEqual(mockAppInstance, View.APP_INSTANCE);
    });

    QUnit.test('has an inputChangeHandler() function that invokes App.updateInput() and passes the input data', assert => {
        let mockEvent = createMockEvent();
        let mockApp = createAppMock();
        let mockInput = mockEvent.target.value;

        let spy = sinon.spy(mockApp, 'updateInput');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);
        assert.equal(spy.calledWith(mockInput), true);
    });

    QUnit.test('has an inputChangeHandler() function that invokes App.process()', assert => {
        let mockEvent = createMockEvent();
        let mockApp = createAppMock();

        let spy = sinon.spy(mockApp, 'process');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);
    });

    QUnit.test('has an inputChangeHandler() function that invokes updateView()', assert => {
        let mockEvent = createMockEvent();
        let mockApp = createAppMock();

        let spy = sinon.spy(View, 'updateView');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);
    });

    QUnit.test('has an updateView() function that invokes updateError() function if input is invalid', assert => {
        let spy = sinon.spy(View, 'updateError');

        View.updateView();

        assert.equal(spy.callCount, 1);
    });

    QUnit.test('has an updateError() function that invokes App.getOutput() and shows the error message', assert => {
        assertError({
            INVALID_INPUT: true,
            MESSAGE: View.ERRORS.INVALID_INPUT
        }, assert);
    });

    QUnit.test('has an updateError() function that invokes App.getOutput() and hides the error message', assert => {
        assertError({
            INVALID_INPUT: false,
            MESSAGE: '' 
        }, assert);
    });

    QUnit.todo('has an updateView() function that displays 0 as the result', assert => {

    });
    
    QUnit.todo('has an updateView() function that displays a one digit result', assert => {

    });
    
    QUnit.todo('has an updateView() function that displays a two digit result', assert => {

    });

    QUnit.todo('has an updateView() function that displays a three digit result', assert => {

    });

    QUnit.todo('has an updateView() function that displays the left operand', assert => {

    });

    QUnit.todo('has an updateView() function that displays the right operand', assert => {

    });

    QUnit.todo('has an updateView() function that displays the operator', assert => {

    })

    function createMockEvent() {
        let mockEvent = {};
        mockEvent.target = {};
        mockEvent.target.value = 'RANDOM EVENT';

        return mockEvent;
    }

    function createAppMock() {
        let mockApp = {};
        mockApp.updateInput = function () {};
        mockApp.process = function () {};
        mockApp.getOutput = function () {};

        return mockApp;
    }

    function assertError(error, assert) {
        let mockApp = createAppMock();
        let stub = sinon.stub(mockApp, 'getOutput');
        stub.returns({INVALID_INPUT: error.INVALID_INPUT});

        View.initialize(mockApp);

        assert.equal(View.ERROR_MESSAGE, '');

        View.ERROR_MESSAGE = 'RANDOM STRING';
        View.updateError();

        assert.equal(stub.callCount, 1);
        assert.equal(View.ERROR_MESSAGE, error.MESSAGE);

        evaluateErrorUIDOM(error.MESSAGE, assert);
    }

    function evaluateErrorUIDOM(errorMessage, assert) {
        let errorDOM = document.querySelector('span#error');
        assert.equal(errorDOM.textContent, errorMessage);
    }

})();