/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('OutputModule');

    QUnit.test('has an OutputModule instance', assert => {
        assert.notEqual(OutputModule, undefined);
    });

    QUnit.test('has a setResults() function that stores the result in a variable', assert => {
        let expectedValue = 1;

        OutputModule.setResult(expectedValue);

        assert.equal(OutputModule.RESULT, expectedValue);
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

    QUnit.test('has a getLeftDigit() function that returns the left digit of a two digit result', assert => {
        let mockResult = 12;
        let expectedValue = 1;

        OutputModule.setResult(mockResult);
        let leftDigit = OutputModule.getLeftDigit();

        assert.equal(leftDigit, expectedValue);
    });

    QUnit.test('has a getRightDigit() function that returns the right digit of a two digit result', assert => {
        let mockResult = 12;
        let expectedValue = 2;

        OutputModule.setResult(mockResult);
        let rightDigit = OutputModule.getRightDigit();

        assert.equal(rightDigit, expectedValue);
    });

    QUnit.todo('has a getLeftDigit() and getRightDigit() function that returns a one digit result', assert => {
        let mockResult = 1;

        OutputModule.setResult(mockResult);
        let leftDigit = OutputModule.getLeftDigit();
        let rightDigit = OutputModule.getRightDigit();

        assert.equal(leftDigit, OutputModule.DISPLAY_MAP.EMPTY);
        assert.equal(rightDigit, OutputModule.DISPLAY_MAP.ZERO);
    });

    // TODO: 1 digit result
    // TODO: negative result
    // TODO: decimal result

})();