/* jshint esversion: 6 */

(() => {
    'use strict';

    const View = {
        ERRORS: {
            INVALID_INITIALIZATION: 'Invalid initialziation of View! App instance must be passed as an argument.'
        },
        
        APP_INSTANCE: null,

        initialize: function (app) {
            if (!app) throw View.ERRORS.INVALID_INITIALIZATION
            View.APP_INSTANCE = app;
            addInputChangeEventListener();
        },

        inputChangeHandler: function (e) {
            View.APP_INSTANCE.updateInput(e.target.value);
            View.APP_INSTANCE.process();
        }

    };

    /* Private functions */

    function addInputChangeEventListener() {
        let inputDOM = document.querySelector('input#input');
        inputDOM.oninput = View.inputChangeHandler;
    }

    window.View = View;

})();