/* jshint esversion: 6 */

(() => {
    'use strict';

    const App = {
        ERRORS: {
            INVALID_INITIALIZATION: 'Invalid initialization of App! Modules must be passed as an argument.',
            INPUT_MODULE_MISSING: 'InputModule is missing!',
            Arithmetic_MODULE_MISSING: 'ArithmeticModule is missing!',
            OUTPUT_MODULE_MISSING: 'OutputModule is missing!'
        },

        MODULES: null,

        initialize: function (modules) {
            throwIfAModuleIsMissing(modules);
            App.MODULES = modules;
        },

        updateInput: function (input) {
            App.MODULES.InputModule.setInput(input);
        },

        process: function() {
            let isValid = App.MODULES.InputModule.isValid();
            if(isValid) {
                let leftOperand = App.MODULES.InputModule.getLeftOperand();
                let operator = App.MODULES.InputModule.getOperator();
                let rightOperand = App.MODULES.InputModule.getRightOperand();
                let result = App.MODULES.ArithmeticModule.calculate(leftOperand, operator, rightOperand);
                App.MODULES.OutputModule.setResult(result);
            }
        },

        getOutput: function() {
            let isValid = App.MODULES.InputModule.isValid();
            let output = {};

            output.INVALID_INPUT = isValid ? false : true;
            output.RESULT = {};
            output.RESULT.LEFT_DIGIT = App.MODULES.OutputModule.getLeftDigit();
            output.RESULT.RIGHT_DIGIT = App.MODULES.OutputModule.getRightDigit();

            return output;
        }
    };

    /* Private functions */
    function throwIfAModuleIsMissing(modules) {
        if (modules === undefined) throw App.ERRORS.INVALID_INITIALIZATION;
        if (modules.InputModule === undefined) throw App.ERRORS.INPUT_MODULE_MISSING;
        if (modules.ArithmeticModule === undefined) throw App.ERRORS.Arithmetic_MODULE_MISSING;
        if (modules.OutputModule === undefined) throw App.ERRORS.OUTPUT_MODULE_MISSING;
    }

    window.App = App;

})();