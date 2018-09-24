/* jshint esversion: 6 */

(() => {
    'use strict';

    const KEYCODE_ENTER = 13;
    const DISPLAY_MAP = {
        NEGATIVE: 'g',
        ZERO: 'abcdef'
    };

    QUnit.module('View');

    QUnit.test('has a View instance', assert => {
        assert.notEqual(View, undefined);
    });

    QUnit.test('has an initialize() function', assert => {
        assert.notEqual(View.initialize, undefined);
    });

    QUnit.test('has a list of static variables', assert => {
        assert.equal(View.TRIGGER_KEYCODE, KEYCODE_ENTER);
        assert.equal(View.BASE_IMG_PATH, 'img/');
        assert.equal(View.DEFAULT_DISPLAY_IMG, 'empty');
        assert.equal(View.IMG_EXTENSION, '.png');
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

    QUnit.test('has an initialize() function that adds an DOM onKeyUp event listener', assert => {
        View.initialize(App);

        let inputDOM = document.querySelector('#input');
        assert.notEqual(inputDOM.onkeyup, null);
        assert.deepEqual(inputDOM.onkeyup, View.inputChangeHandler);
    });

    QUnit.test('has an initialize() function that stores the instance of App into a variable', assert => {
        let mockAppInstance = {};

        View.initialize(mockAppInstance);
        assert.deepEqual(mockAppInstance, View.APP_INSTANCE);
    });

    QUnit.test('has an initialize() function that sets the initial display', assert => {
        let mockAppInstance = {};

        View.initialize(mockAppInstance);
        assert.equal(View.LEFT_DIGIT_IMG, View.createImgPath(View.DEFAULT_DISPLAY_IMG));
        assert.equal(View.RIGHT_DIGIT_IMG, View.createImgPath(View.DEFAULT_DISPLAY_IMG));
    });

    QUnit.test('has a createImgPath() function that returns a parsed path of display', assert => {
        let path = View.createImgPath(View.DEFAULT_DISPLAY_IMG);
        assert.equal(path, `${View.BASE_IMG_PATH}${View.DEFAULT_DISPLAY_IMG}${View.IMG_EXTENSION}`);

        let randomImageName = 'RANDOM';
        path = View.createImgPath(randomImageName);
        assert.equal(path, `${View.BASE_IMG_PATH}${randomImageName}${View.IMG_EXTENSION}`);
    });

    QUnit.test('has a getUserInput() function that obtains the value of the of input field', assert => {
        let mockInput = 'mock input';
        createMockInput(mockInput);
        
        let userInput = View.getUserInput();

        assert.equal(userInput, mockInput);
    });

    QUnit.test('has an inputChangeHandler() function that invokes App.updateInput() passes the input data if "Enter" key is pressed', assert => {
        let mockInput = 'mock input';
        let mockEvent = createMockKeyEvent(KEYCODE_ENTER);
        let mockApp = createAppMock();

        createMockInput(mockInput);

        let spy = sinon.spy(mockApp, 'updateInput');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);
        assert.equal(spy.calledWith(mockInput), true);
    });

    QUnit.test('has an inputChangeHandler() function that invokes App.process() if "Enter" key is pressed', assert => {
        let mockEvent = createMockKeyEvent(KEYCODE_ENTER);
        let mockApp = createAppMock();

        let spy = sinon.spy(mockApp, 'process');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);
    });

    QUnit.test('has an inputChangeHandler() function that invokes updateView() if "Enter" key is pressed', assert => {
        let mockEvent = createMockKeyEvent(KEYCODE_ENTER);
        let mockApp = createAppMock();

        let spy = sinon.spy(View, 'updateView');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(spy.callCount, 1);

        spy.restore();
    });

    QUnit.test('has an inputChangeHandler() function that does not invoke the necessary functions if "Enter" key is not pressed', assert => {
        let randomKeyCode = KEYCODE_ENTER + 128;
        let mockEvent = createMockKeyEvent(randomKeyCode);
        let mockApp = createAppMock();
        
        let appUpdateInputSpy = sinon.spy(mockApp, 'updateInput');
        let appProcesSpy = sinon.spy(mockApp, 'process');
        let viewUpdateViewSpy = sinon.spy(View, 'updateView');

        View.initialize(mockApp);
        View.inputChangeHandler(mockEvent);

        assert.equal(appUpdateInputSpy.callCount, 0);
        assert.equal(appProcesSpy.callCount, 0);
        assert.equal(viewUpdateViewSpy.callCount, 0);
    });

    QUnit.test('has an inputChangeHandler() function that clears the input if "Enter" key is pressed', assert => {
        let mockInput = 'mock input';
        let mockEvent = createMockKeyEvent(KEYCODE_ENTER);
        let mockApp = createAppMock();
        createMockInput(mockInput);

        View.initialize(mockApp);

        assert.equal(View.getUserInput(), mockInput);

        View.inputChangeHandler(mockEvent);

        assert.equal(View.getUserInput(), '');
    });

    QUnit.test('has an updateView() function that invokes updateError() function if input is invalid', assert => {
        let spy = sinon.spy(View, 'updateError');

        View.updateView();

        assert.equal(spy.callCount, 1);
        spy.restore();
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

    QUnit.test('has an updateView() function that invokes updateResult() function', assert => {
        let mockApp = createAppMock();
        let spy = sinon.spy(View, 'updateResult');

        View.initialize(mockApp);
        View.updateView();

        assert.equal(spy.callCount, 1);
        spy.restore();
    });

    QUnit.test('has an updateResult() function that sets the display results to default if input is invalid', assert => {
        let mock = { INVALID_INPUT: true, };

        let expected = {
            LEFT_DIGIT: View.DEFAULT_DISPLAY_IMG,
            RIGHT_DIGIT: View.DEFAULT_DISPLAY_IMG
        };

        assertDisplayDigits(mock, expected, assert);
    });

    QUnit.test('has an updateResult() function that sets the display results to default if left or right digit is an empty string', assert => {
        let mockValidInput = { 
            INVALID_INPUT: true, 
            LEFT_DIGIT: '', 
            RIGHT_DIGIT: ''
        };
        let mockInvalidInput = { 
            INVALID_INPUT: false, 
            LEFT_DIGIT: '', 
            RIGHT_DIGIT: ''
        };

        let expected = {
            LEFT_DIGIT: View.DEFAULT_DISPLAY_IMG,
            RIGHT_DIGIT: View.DEFAULT_DISPLAY_IMG
        };

        assertDisplayDigits(mockValidInput, expected, assert);
        assertDisplayDigits(mockInvalidInput, expected, assert);
    });

    QUnit.test('has an updateResult() function that sets the displays results based from the data from App.getOutput().RESULT', assert => {
        let mock = { 
            INVALID_INPUT: false, 
            LEFT_DIGIT: DISPLAY_MAP.NEGATIVE, 
            RIGHT_DIGIT: DISPLAY_MAP.ZERO
        };

        let expected = {
            LEFT_DIGIT: DISPLAY_MAP.NEGATIVE,
            RIGHT_DIGIT: DISPLAY_MAP.ZERO
        };

        assertDisplayDigits(mock, expected, assert);
    });

    QUnit.test('has an updateResult() function that updates the image source of display digits', assert => {
        let mockApp = createAppMock();
        let stub = sinon.stub(mockApp, 'getOutput');
        let leftDigit = DISPLAY_MAP.NEGATIVE;
        let rightDigit = DISPLAY_MAP.ZERO;
        stub.returns({
            INVALID_INPUT: false,
            RESULT: {
                LEFT_DIGIT: leftDigit,
                RIGHT_DIGIT: rightDigit 
            } 
        });

        View.initialize(mockApp);

        View.LEFT_DIGIT_IMG = 'RANDOM STRING';
        View.RIGHT_DIGIT_IMG = 'RANDOM STRING';

        View.updateResult();

        evaluateDisplayDigitImageSource('left', View.createImgPath(leftDigit), assert);
        evaluateDisplayDigitImageSource('right', View.createImgPath(rightDigit), assert);
        stub.restore();
    });

    function createMockKeyEvent(keyCode) {
        let mockEvent = {};
        mockEvent.keyCode = keyCode;

        return mockEvent;
    }

    function createAppMock() {
        let mockApp = {};
        mockApp.updateInput = function () {};
        mockApp.process = function () {};
        mockApp.getOutput = function () {};

        return mockApp;
    }

    function createMockInput(mockInput) {
        let inputDOM = document.querySelector('input#input');
        inputDOM.value = mockInput;
    }

    function assertError(error, assert) {
        let mockApp = createAppMock();
        let stub = sinon.stub(mockApp, 'getOutput');
        stub.returns({
            INVALID_INPUT: error.INVALID_INPUT
        });

        View.initialize(mockApp);

        assert.equal(View.ERROR_MESSAGE, '');

        View.ERROR_MESSAGE = 'RANDOM STRING';
        View.updateError();

        assert.equal(stub.callCount, 1);
        assert.equal(View.ERROR_MESSAGE, error.MESSAGE);

        evaluateErrorUIDOM(error.MESSAGE, assert);
        stub.restore();
    }

    function assertDisplayDigits(mock, expected, assert) {
        let mockApp = createAppMock();
        let stub = sinon.stub(mockApp, 'getOutput');
        stub.returns({
            INVALID_INPUT: mock.INVALID_INPUT,
            RESULT: {
                LEFT_DIGIT: mock.LEFT_DIGIT,
                RIGHT_DIGIT: mock.RIGHT_DIGIT
            } 
        });

        View.initialize(mockApp);

        View.LEFT_DIGIT_IMG = 'RANDOM STRING';
        View.RIGHT_DIGIT_IMG = 'RANDOM STRING';
        View.updateResult();

        assert.equal(View.LEFT_DIGIT_IMG, View.createImgPath(expected.LEFT_DIGIT));
        assert.equal(View.RIGHT_DIGIT_IMG, View.createImgPath(expected.RIGHT_DIGIT));

        stub.restore();
    }

    function evaluateErrorUIDOM(errorMessage, assert) {
        let errorDOM = document.querySelector('span#error');
        assert.equal(errorDOM.textContent, errorMessage);
    }

    function evaluateDisplayDigitImageSource(place, expectedPath, assert) {
        let imgDOM = document.querySelector(`img#${place}-digit`);
        let containsString = imgDOM.src.indexOf(expectedPath) !== -1;
        assert.equal(containsString, true);
    }

})();