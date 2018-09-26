/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('ArithmethicModule');

    QUnit.test('has an ArithmeticModule instance', assert => {
        assert.notEqual(ArithmeticModule, undefined);
    });

    QUnit.test('has a calculate() function that evaluates an addition operation', assert => {
        let expectedResult = 3;
        let actualResult = ArithmeticModule.calculate(1, '+', 2);

        assert.equal(actualResult, expectedResult);
    });

    QUnit.test('has a calculate function that evaluates a subtraction operation', assert => {
        let expectedResult = 1;
        let actualResult = ArithmeticModule.calculate(3, '-', 2);

        assert.equal(actualResult, expectedResult);
    });

    QUnit.test('has a calculate function that evaluates a multiplication operation', assert => {
        let expectedResult = 6;
        let actualResult = ArithmeticModule.calculate(2, 'x', 3);

        assert.equal(actualResult, expectedResult);
    });

    QUnit.test('has a calculate function that evaluates a division operation', assert => {
        let expectedResult = 0.5;
        let actualResult = ArithmeticModule.calculate(1, '/', 2);

        assert.equal(actualResult, expectedResult);
    });

    QUnit.todo('has a list of static operations', assert => {
        // What if * is used instead of x for multiplication?
    });

})();