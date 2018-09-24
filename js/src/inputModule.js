/* jshint esversion: 6 */

(() => {
    'use strict';

    const InputModule = {
        INPUT: '',

        setInput: function(input) {
            InputModule.INPUT = input;
        },

        isValid: function() {
            let parts = InputModule.INPUT.split(' ');

            if (parts.length < 3) return false;  

            let lo = parseInt(parts[0]);
            let ro = parseInt(parts[2]);

            if(isNaN(lo) || lo < 0 || lo > 9)  return false;
            if(isNaN(ro) || ro < 0 || ro > 9) return false;


            if(parts[1] !== '+' && parts[1] !== '-' && parts[1] !== 'x' && parts[1] !== '/'){
                return false;
            }

            return true;
        }


    };

    /* Private functions */



    window.InputModule = InputModule;
    
})();