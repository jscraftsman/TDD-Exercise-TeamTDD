/* jshint esversion: 6 */

(() => {
    'use strict';

    const OutputModule = {
        RESULT: 0,

        setResult: function (newValue) {
            OutputModule.RESULT = newValue;
        },

        getLeftDigit: function () {
            // @TODO: Refactor to a mapping instead of a number result
            return OutputModule.RESULT.toString().split('')[0];
        },

        getRightDigit: function () {
            // @TODO: Refactor to a mapping instead of a number result
            return OutputModule.RESULT.toString().split('')[1];
        }
    };

    window.OutputModule = OutputModule;

})();