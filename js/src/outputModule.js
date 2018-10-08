/* jshint esversion: 6 */

(() => {
    'use strict';

    let leftResultMap = null;
    let rightResultMap = null;

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
            OutputModule.RESULT = newValue.toString();
            parseResult();
        },

        getLeftDigit: function () {
            return leftResultMap;
        },

        getRightDigit: function () {
            return rightResultMap;
        }
    };

    function parseResult() {
        let parsedResult = OutputModule.RESULT.split('');

        if (isOneDigit(parsedResult)) {
            leftResultMap = mapDisplay();
            rightResultMap = mapDisplay(parsedResult[0]);
        } else {
            if (isDecimal(parsedResult)) {
                leftResultMap = mapDisplay(parsedResult[0] + parsedResult[1]);
                rightResultMap = mapDisplay(parsedResult[2]);
            } else {
                leftResultMap = mapDisplay(parsedResult[0]);
                rightResultMap = mapDisplay(parsedResult[1]);
            }
        }
    }

    function isOneDigit(digits) {
        return digits.length < 2;
    }

    function isDecimal(digits) {
        return digits.length === 3;
    }

    function mapDisplay(digit) {
        if (digit === undefined) return OutputModule.DISPLAY_MAP.EMPTY;

        switch (digit) {
            case '0':
                return OutputModule.DISPLAY_MAP.ZERO;
            case '1':
                return OutputModule.DISPLAY_MAP.ONE;
            case '2':
                return OutputModule.DISPLAY_MAP.TWO;
            case '3':
                return OutputModule.DISPLAY_MAP.THREE;
            case '4':
                return OutputModule.DISPLAY_MAP.FOUR;
            case '5':
                return OutputModule.DISPLAY_MAP.FIVE;
            case '6':
                return OutputModule.DISPLAY_MAP.SIX;
            case '7':
                return OutputModule.DISPLAY_MAP.SEVEN;
            case '8':
                return OutputModule.DISPLAY_MAP.EIGHT;
            case '9':
                return OutputModule.DISPLAY_MAP.NINE;
            case '-':
                return OutputModule.DISPLAY_MAP.NEGATIVE;
            case '0.':
                return OutputModule.DISPLAY_MAP.ZERO_POINT;
            case '1.':
                return OutputModule.DISPLAY_MAP.ONE_POINT;
            case '2.':
                return OutputModule.DISPLAY_MAP.TWO_POINT;
            case '3.':
                return OutputModule.DISPLAY_MAP.THREE_POINT;
            case '4.':
                return OutputModule.DISPLAY_MAP.FOUR_POINT;
            default:
                return OutputModule.DISPLAY_MAP.EMPTY;
        }
    }

    window.OutputModule = OutputModule;

})();