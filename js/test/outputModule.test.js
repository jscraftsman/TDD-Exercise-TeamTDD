/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('OutputModule');

    QUnit.test('has an OutputModule instance', assert => {
        assert.notEqual(OutputModule, undefined);
    });

    QUnit.test('has a setResults() function that stores the result in a variable as a string', assert => {
        let expectedValue = 0;

        OutputModule.setResult(expectedValue);

        assert.equal(OutputModule.RESULT, expectedValue);
        assert.equal(typeof (OutputModule.RESULT), 'string');
    });

    QUnit.test('has the necessary display map', assert => {
        assert.equal(OutputModule.DISPLAY_MAP.NEGATIVE, 'g');
        assert.equal(OutputModule.DISPLAY_MAP.EMPTY, 'empty');
        assert.equal(OutputModule.DISPLAY_MAP.ZERO, 'abcdef');
        assert.equal(OutputModule.DISPLAY_MAP.ONE, 'bc');
        assert.equal(OutputModule.DISPLAY_MAP.TWO, 'abdeg');
        assert.equal(OutputModule.DISPLAY_MAP.THREE, 'abcdg');
        assert.equal(OutputModule.DISPLAY_MAP.FOUR, 'bcfg');
        assert.equal(OutputModule.DISPLAY_MAP.FIVE, 'acdfg');
        assert.equal(OutputModule.DISPLAY_MAP.SIX, 'acdefg');
        assert.equal(OutputModule.DISPLAY_MAP.SEVEN, 'abc');
        assert.equal(OutputModule.DISPLAY_MAP.EIGHT, 'abcdefg');
        assert.equal(OutputModule.DISPLAY_MAP.NINE, 'abcfg');
        assert.equal(OutputModule.DISPLAY_MAP.ZERO_POINT, 'abcdefh');
        assert.equal(OutputModule.DISPLAY_MAP.ONE_POINT, 'bch');
        assert.equal(OutputModule.DISPLAY_MAP.TWO_POINT, 'abdegh');
        assert.equal(OutputModule.DISPLAY_MAP.THREE_POINT, 'abcdgh');
        assert.equal(OutputModule.DISPLAY_MAP.FOUR_POINT, 'bcfgh');
    });

    QUnit.test('has a getLeftDigit() and getRightDigit() function that returns a one digit result', assert => {
        assertOutput(assert, 0, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.ZERO);
        assertOutput(assert, 1, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.ONE);
        assertOutput(assert, 2, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.TWO);
        assertOutput(assert, 3, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.THREE);
        assertOutput(assert, 4, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.FOUR);
        assertOutput(assert, 5, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.FIVE);
        assertOutput(assert, 6, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.SIX);
        assertOutput(assert, 7, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.SEVEN);
        assertOutput(assert, 8, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.EIGHT);
        assertOutput(assert, 9, OutputModule.DISPLAY_MAP.EMPTY, OutputModule.DISPLAY_MAP.NINE);
    });

    QUnit.test('has a getLeftDigit() and getRightDigit() function that returns a negative digit result', assert => {
        assertOutput(assert, -1, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.ONE);
        assertOutput(assert, -2, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.TWO);
        assertOutput(assert, -3, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.THREE);
        assertOutput(assert, -4, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.FOUR);
        assertOutput(assert, -5, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.FIVE);
        assertOutput(assert, -6, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.SIX);
        assertOutput(assert, -7, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.SEVEN);
        assertOutput(assert, -8, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.EIGHT);
        assertOutput(assert, -9, OutputModule.DISPLAY_MAP.NEGATIVE, OutputModule.DISPLAY_MAP.NINE);
    });

    QUnit.test('has a getLeftDigit() and getRightDigit() function that returns a decimal result', assert => {
        assertOutput(assert, 0.1, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.ONE);
        assertOutput(assert, 0.2, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.TWO);
        assertOutput(assert, 0.3, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.THREE);
        assertOutput(assert, 0.4, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.FOUR);
        assertOutput(assert, 0.5, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.FIVE);
        assertOutput(assert, 0.6, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.SIX);
        assertOutput(assert, 0.7, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.SEVEN);
        assertOutput(assert, 0.8, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.EIGHT);
        assertOutput(assert, 0.9, OutputModule.DISPLAY_MAP.ZERO_POINT, OutputModule.DISPLAY_MAP.NINE);
        assertOutput(assert, 1.1, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.ONE);
        assertOutput(assert, 1.2, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.TWO);
        assertOutput(assert, 1.3, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.THREE);
        assertOutput(assert, 1.4, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.FOUR);
        assertOutput(assert, 1.5, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.FIVE);
        assertOutput(assert, 1.6, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.SIX);
        assertOutput(assert, 1.7, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.SEVEN);
        assertOutput(assert, 1.8, OutputModule.DISPLAY_MAP.ONE_POINT, OutputModule.DISPLAY_MAP.EIGHT);
        assertOutput(assert, 2.3, OutputModule.DISPLAY_MAP.TWO_POINT, OutputModule.DISPLAY_MAP.THREE);
        assertOutput(assert, 2.5, OutputModule.DISPLAY_MAP.TWO_POINT, OutputModule.DISPLAY_MAP.FIVE);
        assertOutput(assert, 2.7, OutputModule.DISPLAY_MAP.TWO_POINT, OutputModule.DISPLAY_MAP.SEVEN);
        assertOutput(assert, 3.5, OutputModule.DISPLAY_MAP.THREE_POINT, OutputModule.DISPLAY_MAP.FIVE);
        assertOutput(assert, 4.5, OutputModule.DISPLAY_MAP.FOUR_POINT, OutputModule.DISPLAY_MAP.FIVE);
    });

    function assertOutput(assert, mockResult, leftDigitMap, rightDigitMap) {
        OutputModule.setResult(mockResult);

        let leftDigit = OutputModule.getLeftDigit();
        let rightDigit = OutputModule.getRightDigit();

        assert.equal(leftDigit, leftDigitMap);
        assert.equal(rightDigit, rightDigitMap);
    }

    // TODO: 2 digit result
    // TODO: invalid result (should clear old results)

})();