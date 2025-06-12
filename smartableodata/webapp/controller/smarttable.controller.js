sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller,MessageToast) {
  "use strict";

  return Controller.extend("smartableodata.controller.smarttable", {
    onInit: function () {},
    onItemPress: function (oEvent) {
      // Ambil context dari item yang dipilih di SmartTable
      var oItem = oEvent.getSource();
      var oContext = oItem.getBindingContext();
      var id = oContext ? oContext.getProperty("ID") : null; // Ganti "ID" sesuai nama property di model

      this.getOwnerComponent()
        .getRouter()
        .navTo("RouteDetail", { id: id });
    },
    	_getSmartTable: function () {
			if (!this._oSmartTable) {
				this._oSmartTable = this.getView().byId("LineItemsSmartTable");
			}
			return this._oSmartTable;
		},
    onSort: function () {
			var oSmartTable = this._getSmartTable();
			if (oSmartTable) {
				oSmartTable.openPersonalisationDialog("Sort");
			}
		},
    onFilter: function () {
			var oSmartTable = this._getSmartTable();
			if (oSmartTable) {
				oSmartTable.openPersonalisationDialog("Filter");
			}
		},

		onGroup: function () {
			MessageToast.show("Not available as this feature is disabled for this app in the view.xml");
		},

    onFilterChange: function (oEvent) {
      console.log(oEvent)
    },
    onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");

			// Disable Worker as Mockserver is used in Demokit sample
			mExcelSettings.worker = false;
		},
  });
});
