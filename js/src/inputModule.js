/* jshint esversion: 6 */

(() => {
    'use strict';

    const InputModule = {
        INPUT: '',

        setInput: function (input) {
            InputModule.INPUT = input;
            parseInput();
        },

        isValid: function () {
            if (hasIncorrectNumberOfParts()) return false;
            if (isInvalidDigit(PARTS.leftOperand)) return false;
            if (isInvalidDigit(PARTS.rightOperand)) return false;
            if (isNotValidOperation(PARTS.operator)) return false;

            return true;
        },

        getLeftOperand: function () {
            return PARTS.leftOperand;
        },

        getRightOperand: function () {
            return PARTS.rightOperand;
        },

        getOperator: function () {
            return PARTS.operator;
        }

    };

    /* Private variables */

    let PARTS = {
        leftOperand: '',
        operator: '',
        rightOperand: ''
    };

    /* Private functions */

    function parseInput() {
        let parts = InputModule.INPUT.split(' ');

        PARTS.leftOperand = parseNumber(parts[0]);
        PARTS.operator = parts[1] || '';
        PARTS.rightOperand = parseNumber(parts[2]);
    }

    function parseNumber(num) {
        let n = isNotDecimal(num) ? Number.parseFloat(num) : Number.parseInt(num);
        return typeof (n) === 'number' ? n : '';
    }

    function hasIncorrectNumberOfParts() {
        return InputModule.INPUT.split(' ').length < 3;
    }

    function isNotNumber(num) {
        return (typeof (num) !== 'number') || Number.isNaN(num);
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