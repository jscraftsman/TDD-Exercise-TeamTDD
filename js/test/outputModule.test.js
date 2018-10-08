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

    function assertOutput(assert, mockResult, leftDigitMap, rightDigitMap) {
        OutputModule.setResult(mockResult);

        let leftDigit = OutputModule.getLeftDigit();
        let rightDigit = OutputModule.getRightDigit();

        assert.equal(leftDigit, leftDigitMap);
        assert.equal(rightDigit, rightDigitMap);
    }

    // TODO: 1 digit result
    // TODO: negative result
    // TODO: decimal result
    // TODO: invalid result (should clear old results)

})();