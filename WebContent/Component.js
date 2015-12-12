// Author: Benjamin Kwong
// Description: Custom UI5 app to launch SAP Webdynpro Apps in place within Fiori window.
//				See the App controller for full breakdown of logic. 

jQuery.sap.declare("zwdainplace.Component");

sap.ui.core.UIComponent.extend("zwdainplace.Component", {
		metadata : {
		        name : "SAP UI Fiori In Place Launcher",
		        version : "1.0",
		        includes : [],
		        dependencies : {
		            libs : ["sap.m", "sap.ui.layout"],
		            components : []
		        },
			    rootView : {
			    	viewName : "zwdainplace.view.App",
			    	type : "JS"
			    },
				config : {
					fullWidth : true,
					serviceConfig : {
				    	name : "ZSAP_LANDSCAPE",
				    	serviceUrl : "/sap/opu/odata/sap/ZFIORI_GETSYSLANDSCAPE_SRV/"
				 	}
				},
				routing: {
			         
			    }
		},
		init : function() {		
		    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		
		    var mConfig = this.getMetadata().getConfig();
		
		    // always use absolute paths relative to our own component
		    // (relative paths will fail if running in the Fiori Launchpad)
		    var rootPath = jQuery.sap.getModulePath("zwdainplace");
			    
		    // Create and set domain model to the component
		    var sServiceUrl = mConfig.serviceConfig.serviceUrl;
		    var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		    this.setModel(oModel);
		
		    // set device model
		    var deviceModel = new sap.ui.model.json.JSONModel({
		        isTouch : sap.ui.Device.support.touch,
		        isNoTouch : !sap.ui.Device.support.touch,
		        isPhone : sap.ui.Device.system.phone,
		        isNoPhone : !sap.ui.Device.system.phone,
		        listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
		        listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		    });
		    deviceModel.setDefaultBindingMode("OneWay");
		    this.setModel(deviceModel, "device");
		},
});