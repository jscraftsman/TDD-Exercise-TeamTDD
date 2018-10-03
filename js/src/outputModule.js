/* jshint esversion: 6 */

(() => {
    'use strict';

    const OutputModule = {
        DISPLAY_MAP: {
            NEGATIVE: 'g',
            EMPTY: 'empty',
            ZERO: 'abcdef',
            ONE: 'bc',
            TWO: 'abdeg',
            THREE: 'abcdg',
            FOUR: 'bcfg',
            FIVE: 'acdfg',
            SIX: 'acdefg',
            SEVEN: 'abc',
            EIGHT: 'abcdefg',
            NINE: 'abcfg',
            ZERO_POINT: 'abcdefh',
            ONE_POINT: 'bch',
            TWO_POINT: 'abdegh',
            THREE_POINT: 'abcdgh',
            FOUR_POINT: 'bcfgh'
        },

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