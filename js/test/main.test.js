/* jshint esversion: 6 */

(() => {
    'use strict';

    QUnit.module('Main');

    QUnit.test('Has an Main instance', assert => {
        assert.notEqual(Main, undefined);
    });

    QUnit.test('Main has a start() function', assert => {
        assert.notEqual(Main.start, undefined);
    });

    QUnit.test('Main.start() will call App.initialize() only once', assert => {
        let spy = sinon.spy(App, 'initialize');

        Main.start();
        assert.equal(spy.callCount, 1);
    });

    QUnit.test('Main.start() will call View.initialize only once', assert => {
        let spy = sinon.spy(View, 'initialize');

        Main.start();
        assert.equal(spy.callCount, 1);
    });

})();