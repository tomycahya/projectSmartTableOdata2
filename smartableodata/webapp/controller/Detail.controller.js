sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
  ],
  function (Controller, MessageBox, History) {
    "use strict";

    return Controller.extend("smartableodata.controller.detail", {
      onInit: function () {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("RouteDetail")
          .attachPatternMatched(this.onattachPatternMatched, this);
      },
      
      // onSelectList: function(params) {
      //     // result array json get path
      //     // karena array di data.json "employess"
      //     // maka ketika get properti yang diambil sesuai empid yang ada di array "employees"
      //     // var empid = params.getParameter("listItem").getBindingContext().getProperty("empId")

      //     // result array json get path
      //     // karena array di data.json "employess"
      //     // maka ketika get path jadi /employess/1
      //     // 1 adalah urutan data sesuai yang di klik
      //     // var spath = params.getParameter("listItem").getBindingContext().getPath()
      //     // alert(spath)
      // },
      onattachPatternMatched:function (params) {
        var oModel = this.getOwnerComponent().getModel()
        var ojsonModel = new sap.ui.model.json.JSONModel();
        var oBusyDialog = new sap.m.BusyDialog({
          title: "Loading...",
          text: "Please wait while the data is being loaded.",
        })
        // console.log(oModel)
        var index = params.getParameter("arguments").id
        var oFilter = new sap.ui.model.Filter("ID", "EQ", index);
        oBusyDialog.open()
          oModel.read("/Products", {
            filters: [oFilter],
            success: function (oData) {
              oBusyDialog.close(); // Close busy indicator
              // console.log(oData.results[0]);
              ojsonModel.setData(oData.results[0]);
              this.getView().setModel(ojsonModel, "productModel");
            }.bind(this),
            error: function (e) {
              oBusyDialog.close(); // Close busy indicator
              MessageBox.error("Error fetching data: " + e.message);
            }
          });
      },
      // onUpdate: function () {
      //     var prdid = this.getView().byId("text1").getText()
      //     this.getOwnerComponent().getRouter().navTo("RouteEdit",{prdid:prdid})
      // },
      // onDelete: function () {
      //     var prdid = this.getView().byId("text1").getText()
      //     var oModel = this.getView().getModel();
      //     oModel.remove("/PRODUCTSet('"+ prdid +"')", {
      //         success:function(res){
      //             // console.log(res)
      //             MessageBox.success("Deleted Product Successfully")
      //             // this.clearFrom()
      //             this.onBack()
      //         }.bind(this),
      //         error:function(e){
      //             MessageBox.error("Error", e)
      //             // this.clearFrom()
      //         }.bind(this)
      //     })
      // },
      // onBack:function(){
      //     this.getOwnerComponent().getRouter().navTo("RouteView1")
      // },
      onNavBack: function () {
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getOwnerComponent().getRouter().navTo("Routesmarttable");
        }
      },
    });
  }
);
