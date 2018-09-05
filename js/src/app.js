(() => {
    const App = {
        INPUT_MODULE_MISSING_ERROR: 'InputModule is missing!',
        CPU_MODULE_MISSING_ERROR: 'CPUModule is missing!',
        OUTPUT_MODULE_MISSING_ERROR: 'OutputModule is missing!',

        start: function () {
            throwIfAModuleIsMissing();
        }
    };

    /* Private functions */
    function throwIfAModuleIsMissing() {
        if (InputModule === undefined) throw App.INPUT_MODULE_MISSING_ERROR;
        if (CPUModule === undefined) throw App.CPU_MODULE_MISSING_ERROR;
        if (OutputModule === undefined) throw App.OUTPUT_MODULE_MISSING_ERROR;
    }

    window.App = App;

    // TODO: Create "Main" and use App.start();
    // TODO: Add UI Interface in Main
})();