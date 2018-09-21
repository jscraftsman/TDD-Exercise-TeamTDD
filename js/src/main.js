/* jshint esversion: 6 */

(() => {
    'use strict';

    const Main = {
        start: function () {
            let modules = {
                InputModule: window.InputModule ? window.InputModule : {},
                ArithmeticModule: window.ArithmeticModule ? window.ArithmeticModule : {},
                OutputModule: window.OutputModule ? window.OutputModule : {}
            };

            App.initialize(modules);
            View.initialize(App);
        },
    };

    window.Main = Main;

})();