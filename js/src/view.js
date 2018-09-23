/* jshint esversion: 6 */

(() => {
    'use strict';

    const View = {
        ERRORS: {
            INVALID_INITIALIZATION: 'Invalid initialziation of View! App instance must be passed as an argument.',
            INVALID_INPUT: 'Invalid input!'
        },

        ERROR_MESSAGE: '',
        
        APP_INSTANCE: null,

        initialize: function (app) {
            if (!app) throw View.ERRORS.INVALID_INITIALIZATION
            View.APP_INSTANCE = app;
            addInputChangeEventListener();

            View.ERROR_MESSAGE = '';
        },

        inputChangeHandler: function (e) {
            View.APP_INSTANCE.updateInput(e.target.value);
            View.APP_INSTANCE.process();

            View.updateView();
        }, 

        updateView() {
            View.updateError();
        },

        updateError() {
            let output = View.APP_INSTANCE.getOutput();
            if (output && output.INVALID_INPUT === true) {
                View.ERROR_MESSAGE = View.ERRORS.INVALID_INPUT;
            } else {
                View.ERROR_MESSAGE = '';
            }

            displayError();
        }

    };

    /* Private functions */

    function addInputChangeEventListener() {
        let inputDOM = document.querySelector('input#input');
        inputDOM.oninput = View.inputChangeHandler;
    }

    function displayError() {
        let errorDOM = document.querySelector('span#error');
        errorDOM.textContent = View.ERROR_MESSAGE;
    }

    window.View = View;

})();