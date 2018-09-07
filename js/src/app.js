(() => {
    const App = {
        ERRORS: {
            INVALID_INITIALIZATION: 'Invalid initialziation of App.start()! Modules must be passed as an argument.',
            INPUT_MODULE_MISSING: 'InputModule is missing!',
            CPU_MODULE_MISSING: 'CPUModule is missing!',
            OUTPUT_MODULE_MISSING: 'OutputModule is missing!'
        },

        start: function (modules) {
            throwIfAModuleIsMissing(modules);
            MODULES = modules;
        }
    };

    /* Private variables */
    let MODULES = null;

    /* Private functions */
    function throwIfAModuleIsMissing(modules) {
        if (modules === undefined) throw App.ERRORS.INVALID_INITIALIZATION;
        if (modules.InputModule === undefined) throw App.ERRORS.INPUT_MODULE_MISSING;
        if (modules.CPUModule === undefined) throw App.ERRORS.CPU_MODULE_MISSING;
        if (modules.OutputModule === undefined) throw App.ERRORS.OUTPUT_MODULE_MISSING;
    }

    window.App = App;

    // TODO: Create "Main" and use App.start(); Pass modules as parameter
    // TODO: Add UI Interface in Main
})();