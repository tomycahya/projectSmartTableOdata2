/*global QUnit*/

sap.ui.define([
	"smartableodata/controller/smarttable.controller"
], function (Controller) {
	"use strict";

	QUnit.module("smarttable Controller");

	QUnit.test("I should test the smarttable controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
