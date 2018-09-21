/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('Main');

    QUnit.test('has a Main instance', assert => {
        assert.notEqual(Main, undefined);
    });

    QUnit.test('has a start() function', assert => {
        assert.notEqual(Main.start, undefined);
    });

    QUnit.test('has a Main.start() will invoke App.initialize()', assert => {
        let spy = sinon.spy(App, 'initialize');

        Main.start();
        assert.equal(spy.callCount, 1);
    });

})();