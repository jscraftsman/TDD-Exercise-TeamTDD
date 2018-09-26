/* jshint esversion: 6 */

(() => {
    'use strict';

    const ArithmeticModule = {
        calculate: function (lo, o, ro) {
            if (o === '+') return lo + ro;
            if (o === '-') return lo - ro;
            if (o === 'x') return lo * ro;
            if (o === '/') return lo / ro;
        }
    };

    window.ArithmeticModule = ArithmeticModule;

})();