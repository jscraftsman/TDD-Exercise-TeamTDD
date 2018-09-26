/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('ArithmethicModule');

    QUnit.test('has an ArithmeticModule instance', assert => {
        assert.notEqual(ArithmeticModule, undefined);
    });

    QUnit.skip('has a calculate function that evaluates the operation', assert => {
        let expectedResult = 3;
        let actualResult = ArithmeticModule.calculate(1, '+', 2);

        assert.equal(actualResult, expectedResult);
    });

})();