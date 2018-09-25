/* jshint esversion: 6 */

(() => {
    'use strict';

    const InputModule = {
        INPUT: '',

        setInput: function (input) {
            InputModule.INPUT = input;
        },

        isValid: function () {
            let parts = InputModule.INPUT.split(' ');

            if (hasIncorrectNumberOfParts(parts)) return false;

            let leftOperand = parts[0];
            let operation = parts[1];
            let rightOperand = parts[2];

            if (isInvalidDigit(leftOperand)) return false;
            if (isInvalidDigit(rightOperand)) return false;
            if (isNotValidOperation(operation)) return false;

            return true;
        }


    };

    /* Private functions */
    function hasIncorrectNumberOfParts(elements) {
        return elements < 3;
    }

    function isNotNumber(num) {
        return Number.isNaN(num);
    }

    function isNotDecimal(num) {
        return num % 1 !== 0;
    }

    function isNotSingleDigit(num) {
        return (num < 0 || num > 9);
    }

    function isInvalidDigit(num) {
        return (isNotNumber(num) || isNotDecimal(num) || isNotSingleDigit(num));
    }

    function isNotValidOperation(o) {
        return (isNotAddition(o) && isNotSubtraction(o) && isNotMultiplication(o) && isNotDivision(o));
    }

    function isNotAddition(o) {
        return o !== '+';
    }

    function isNotSubtraction(o) {
        return o !== '-';
    }

    function isNotMultiplication(o) {
        return o !== 'x';
    }

    function isNotDivision(o) {
        return o !== '/';
    }


    window.InputModule = InputModule;

})();