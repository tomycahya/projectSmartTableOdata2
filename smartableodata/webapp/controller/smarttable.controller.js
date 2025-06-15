sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("smartableodata.controller.smarttable", {
      onInit: function () {},
      onItemPress: function (oEvent) {
        // Ambil context dari item yang dipilih di SmartTable
        var oItem = oEvent.getSource();
        var oContext = oItem.getBindingContext();
        var id = oContext ? oContext.getProperty("ID") : null; // Ganti "ID" sesuai nama property di model

        this.getOwnerComponent().getRouter().navTo("RouteDetail", { id: id });
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
        MessageToast.show(
          "Not available as this feature is disabled for this app in the view.xml"
        );
      },

      onFilterChange: function (oEvent) {
        console.log(oEvent);
      },
      onBeforeExport: function (oEvt) {
        var mExcelSettings = oEvt.getParameter("exportSettings");

        // Disable Worker as Mockserver is used in Demokit sample
        mExcelSettings.worker = false;
      },
      onF4press: function () {
        if (!this._dialog) {
          this._dialog = sap.ui.xmlfragment(
            this.getView().getId(),
            "smartableodata.view.EmpF4help",
            this
          );
          // console.log(this._dialog)
          this.getView().addDependent(this._dialog);
        }
        this._dialog.open();
      },
      onSelectListValue: function (params) {
        var oItem = params.getSource();
        // If oItem is a control inside the ColumnListItem, get the parent
        var oListItem = oItem.getParent ? oItem.getParent() : oItem;
        var oContext = oListItem.getBindingContext();

        // Ambil data dari context (misal: property "ID" dan "Name")
        var sId = oContext ? oContext.getProperty("IDVal") : null;
        var sName = oContext ? oContext.getProperty("Name") : null;

        console.log("ID:", sId, "Name:", sName);
        var id = oContext ? oContext.getProperty("ID") : null; 
        this.getView().byId("_IDGenInput").setValue();
        this._dialog.close();
      },
      onClose: function () {
        this._dialog.close();
      },
    });
  }
);
