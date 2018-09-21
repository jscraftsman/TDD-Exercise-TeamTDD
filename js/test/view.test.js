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

    function createMockEvent() {
        let mockEvent = {};
        mockEvent.target = {};
        mockEvent.target.value = 'random string';

        return mockEvent;
    }

    function createAppMock() {
        let mockApp = {};
        mockApp.updateInput = function () {};
        mockApp.process = function () {};

        return mockApp;
    }

})();