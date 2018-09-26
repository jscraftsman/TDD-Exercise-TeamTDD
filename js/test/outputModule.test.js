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

    QUnit.todo('1 digit result, negative result, decimal result', assert => {

    });

})();