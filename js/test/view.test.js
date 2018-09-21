/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('View');

    QUnit.test('Has a View instance', assert => {
        assert.notEqual(View, undefined);
    });

    QUnit.test('View has an initialize() function', assert => {
        assert.notEqual(View.initialize, undefined);
    });

    QUnit.test('View has a list of static error messages', assert => {
        assert.equal(View.ERRORS.INVALID_INITIALIZATION, 'Invalid initialziation of View! App instance must be passed as an argument.');
    });

    QUnit.test('View.initialize() throws exception if has an empty argument', assert => {
        function functionBlock() {
            View.initialize();
        }

        function expectedMatcher(err) {
            return err === View.ERRORS.INVALID_INITIALIZATION;
        }
        assert.throws(functionBlock, expectedMatcher);
    });

    QUnit.test('View.initialize() adds an on change event listener', assert => {
        View.initialize(App);

        let inputDOM = document.querySelector('#input');
        assert.notEqual(inputDOM.oninput, null);
        assert.deepEqual(inputDOM.oninput, View.inputChangeHandler);
    });

    QUnit.test('View.initialize() stores the instance of App in a variable', assert => {
        let mockAppInstance = {};

        View.initialize(mockAppInstance);
        assert.deepEqual(mockAppInstance, View.APP_INSTANCE);
    });

    QUnit.test('When View.inputChangeHandler() is called, input is passed to App.updateInput()', assert => {
        let mockApp = {};
        mockApp.updateInput = function () {};

        let mockEvent = {};
        mockEvent.target = {};
        mockEvent.target.value = 'random string';
        let mockInput = mockEvent.target.value;

        let spy = sinon.spy(mockApp, 'updateInput');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);
        assert.equal(spy.calledWith(mockInput), true);
    });

})();