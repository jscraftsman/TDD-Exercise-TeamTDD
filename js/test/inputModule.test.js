/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('InputModule');

    QUnit.test('has an InputModule instance', assert => {
        assert.notEqual(InputModule, undefined);
    });

    QUnit.test('has a setInput() function that stores input in the INPUT constant', assert => {
        let mockInput = 'MOCK';

        InputModule.INPUT = 'RANDOM';

        InputModule.setInput(mockInput);

        assert.equal(InputModule.INPUT, mockInput);
    });

    QUnit.test('has an isValid() function that returns true for "l + r" input', assert => {
        assertValidityOfOperation('+', assert);
    });

    QUnit.test('has an isValid() function that returns true for "l - r" input', assert => {
        assertValidityOfOperation('-', assert);
    });

    QUnit.test('has an isValid() function that returns true for "l x r" input', assert => {
        assertValidityOfOperation('x', assert);
    });

    QUnit.test('has an isValid() function that returns true for "l / r" input', assert => {
        assertValidityOfOperation('/', assert);
    });

    QUnit.test('has an isValid() function returns false for "l + r" if l or r is not valid', assert => {
        assertInvalidOperands('+', assert);
    });

    QUnit.test('has an isValid() function returns false for "l - r" if l or r is not valid', assert => {
        assertInvalidOperands('-', assert);
    });

    QUnit.test('has an isValid() function returns false for "l x r" if l or r is not valid', assert => {
        assertInvalidOperands('x', assert);
    });

    QUnit.test('has an isValid() function returns false for "l / r" if l or r is not valid', assert => {
        assertInvalidOperands('/', assert);
    });

    QUnit.todo('has a getLeftOperand() function', assert => {

    });

    QUnit.todo('has a getRightOperand() function', assert => {

    });

    QUnit.todo('has a getOperator() function', assert => {

    });

    /* Helper functions */

    function assertValidityOfOperation(operator, assert) {
        let DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let lo of DIGITS) {
            for (let ro of DIGITS) {
                let mockInput = `${lo} ${operator} ${ro}`;
                InputModule.setInput(mockInput);
                let isValid = InputModule.isValid();
                assert.equal(isValid, true);
            }
        }
    }

    function assertInvalidOperands(operator, assert) {
        let invalidValues = ['a', '10', 10, -1, 1.5];

        for (let invalidValue of invalidValues) {
            assertInvalidLeftOperand(operator, invalidValue, assert);
            assertInvalidRightOperand(operator, invalidValue, assert);
        }
    }

    function assertInvalidLeftOperand(operator, lo, assert) {
        let mockInput = `${lo} ${operator} 1`;
        InputModule.setInput(mockInput);
        let isValid = InputModule.isValid();
        assert.equal(isValid, false);
    }

    function assertInvalidRightOperand(operator, ro, assert) {
        let mockInput = `1 ${operator} ${ro}`;
        InputModule.setInput(mockInput);
        let isValid = InputModule.isValid();
        assert.equal(isValid, false);
    }

})();