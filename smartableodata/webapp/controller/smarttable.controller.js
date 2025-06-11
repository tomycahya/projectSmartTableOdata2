sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
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
    onSearch: function (oEvent) {
      var oSmartFilterBar = this.byId("smartFilterBar");
      var oTable = this.byId("_IDGenTable");

      // Ambil parameter filter dari SmartFilterBar
      oSmartFilterBar.getFilters().then(function (aFilters) {
        var oBinding = oTable.getBinding("items");

        if (oBinding) {
          oBinding.filter(aFilters);
        }
      });
    },
  });
});
