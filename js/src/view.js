/* jshint esversion: 6 */

(() => {
    'use strict';

    const View = {
        ERRORS: {
            INVALID_INITIALIZATION: 'Invalid initialziation of View! App instance must be passed as an argument.',
            INVALID_INPUT: 'Invalid input!'
        },

        ERROR_MESSAGE: '',

        TRIGGER_KEYCODE: 13,

        BASE_IMG_PATH: 'img/',
        DEFAULT_DISPLAY_IMG: 'empty',
        IMG_EXTENSION: '.png',

        LEFT_DIGIT_IMG: '',
        RIGHT_DIGIT_IMG: '',
        
        APP_INSTANCE: null,

        initialize: function (app) {
            if (!app) throw View.ERRORS.INVALID_INITIALIZATION
            View.APP_INSTANCE = app;
            addInputChangeEventListener();

            View.ERROR_MESSAGE = '';
            View.LEFT_DIGIT_IMG = View.createImgPath(View.DEFAULT_DISPLAY_IMG);
            View.RIGHT_DIGIT_IMG = View.createImgPath(View.DEFAULT_DISPLAY_IMG);
        },

        inputChangeHandler: function (e) {
            if(e && e.keyCode === View.TRIGGER_KEYCODE) {
                let input = View.getUserInput();
                View.APP_INSTANCE.updateInput(input);
                View.APP_INSTANCE.process();

                View.updateView();
                clearInput();
            }
        }, 

        getUserInput: function() {
            return returnInputValue();
        },

        updateView: function() {
            View.updateError();
            View.updateResult();
        },

        updateError: function() {
            let output = View.APP_INSTANCE.getOutput();
            if (output && output.INVALID_INPUT === true) {
                View.ERROR_MESSAGE = View.ERRORS.INVALID_INPUT;
            } else {
                View.ERROR_MESSAGE = '';
            }

            displayError();
        },

        updateResult: function() {
            View.LEFT_DIGIT_IMG = View.createImgPath(View.DEFAULT_DISPLAY_IMG);
            View.RIGHT_DIGIT_IMG = View.createImgPath(View.DEFAULT_DISPLAY_IMG);

            let output = View.APP_INSTANCE.getOutput();
            if(output && output.RESULT) {
                let lDigit = output.RESULT.LEFT_DIGIT ? output.RESULT.LEFT_DIGIT : View.DEFAULT_DISPLAY_IMG;
                let rDigit = output.RESULT.RIGHT_DIGIT ? output.RESULT.RIGHT_DIGIT : View.DEFAULT_DISPLAY_IMG;
                
                View.LEFT_DIGIT_IMG = View.createImgPath(lDigit);
                View.RIGHT_DIGIT_IMG = View.createImgPath(rDigit);
            }
        },

        createImgPath: function(imageName) {
            return `${View.BASE_IMG_PATH}${imageName}${View.IMG_EXTENSION}`;
        }

    };

    /* Private functions */
    function addInputChangeEventListener() {
        let inputDOM = document.querySelector('input#input');
        inputDOM.onkeyup = View.inputChangeHandler;
    }

    function returnInputValue() {
        let inputDOM = document.querySelector('input#input');
        return inputDOM.value;
    }

    function clearInput() {
        let inputDOM = document.querySelector('input#input');
        inputDOM.value = '';
    }

    function displayError() {
        let errorDOM = document.querySelector('span#error');
        errorDOM.textContent = View.ERROR_MESSAGE;
    }

    window.View = View;

})();