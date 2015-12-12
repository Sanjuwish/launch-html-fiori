sap.ui.controller("zwdainplace.view.App", {

	onAfterRendering: function() {
		
		// Error Message
		var errorDialog = new sap.m.Dialog({
		      title: 'Error',
		      type: 'Message',
		      state: 'Error',
		      content: new sap.m.Text({
		        text: 'SAP UI not setup correctly - check Tile config in Fiori Administration.'
		      }),
		      beginButton: new sap.m.Button({
		        text: 'OK',
		        press: function () {
		        	errorDialog.close();
		        }
		      }),
		      afterClose: function() {
		    	  errorDialog.destroy();
		      }
		});
		
		var oView = this.getView();
		var oModel = oView.getModel();
		
		// Determine hostname from table SSM_VAR in SAP Gateway system.
		oModel.read("/SystemNames", null, null, true, function(oData, oResponse){
			
			// Constants in ALL CAPS.  Do modify unless SAP have changed their SAP GUI/Webdynpro locations.
			var SAPWDA_PATH = "/sap/bc/webdynpro/sap/",
				SAPGUI_PATH = "/sap/bc/gui/sap/its/webgui?~transaction=",
				SAPBOB_PATH = "/BOE/OpenDocument/opendoc/openDocument.jsp?sIDType=CUID&iDocID=",
				SAPBSP_PATH = "/sap/bc/bsp/sap/",
				SAPBOBJ_PORT = "XXXX";
		
			// Retreive system values
			var thisDomain = window.location.hostname.slice(-9),
				thisProtocol = window.location.protocol,
				thisPort = window.location.port;

			//Define variables and grab Fiori tile parameter values.
			//Parameter parsing variables
			var sapSystem,
				sapUItype,
				sapApp,
				embedURL,
				targetHost,
				i = 0;
			
			var oComponent = oView.getParent();
			sapSystem = oComponent.getComponentData().startupParameters["sys"][0];
			sapUItype = oComponent.getComponentData().startupParameters["typ"][0];
			
			// WDA and BSP app parameter is kept separately as special URL characters break getComponentData().
			// If you change the parameters and app is no longer last, this functionality will break!
			if (sapUItype === "WDA" || sapUItype === "BSP") {
				var lv_appIndex = window.location.href.search("app=");
				sapApp = window.location.href.substr(lv_appIndex + 4); // the 4 char offsets app=
			}
			else {
				sapApp = oComponent.getComponentData().startupParameters["app"][0];
			}
			
			// System variables to be used later.
			var systemNames = oData;
			
			// Check that Odata service has returned entries.
			if (systemNames.results.length != null) {
				// Based on the system variable, check that it matches the key in SSM_VAR in Gateway.
				for( i = systemNames.results.length-1; i >= 0;  i--) {
					if (sapSystem === systemNames.results[i].VarName) {
						targetHost = systemNames.results[i].Value;
						break;
					}
				}
			}
			
			// Build URL based on system.
			switch(sapUItype) {
				case "WDA":
					embedURL = thisProtocol.concat("//", targetHost, thisDomain, ":", thisPort, SAPWDA_PATH, sapApp);
					break;
				case "GUI":
					embedURL = thisProtocol.concat("//", targetHost, thisDomain, ":", thisPort, SAPGUI_PATH, sapApp);
					break;
				case "BOB":
					embedURL = thisProtocol.concat("//", targetHost, thisDomain, ":", SAPBOBJ_PORT, SAPBOB_PATH, sapApp);
					break;
				case "BSP":
					embedURL = thisProtocol.concat("//", targetHost, thisDomain, ":", thisPort, SAPBSP_PATH, sapApp);
					break;
				case "SF":
					embedURL = thisProtocol.concat("//", targetHost, sapApp);
					break;
				case "URL":
					embedURL = sapApp;
					break;	
				default:
					embedURL = null;

					errorDialog.open();
			}
				
			var iframeHTMLsection = oView.byId("html_frag");
			var htmlGeneration = "<iframe id='sapUI_object' src='"+embedURL+"' width='100%' height='100%' seamless></iframe>";
			iframeHTMLsection.setContent(htmlGeneration);
		});
	},
});