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
            // @TODO: Should check if Input is valid and show error accordingly
            let leftOperand = App.MODULES.InputModule.getLeftOperand();
            let operator = App.MODULES.InputModule.getOperator();
            let rightOperand = App.MODULES.InputModule.getRightOperand();
            App.MODULES.ArithmeticModule.calculate(leftOperand, operator, rightOperand);
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