//  	Author: Benjamin Kwong
//  	Description: Custom UI5 app to launch HTML application within Fiori
//
//  	Changelog: 
//  	10/02/2015	Initial version.
//					- Reads parameters setup in Fiori admin under tile settings.  See Parameters.
//					- Parameters are "app", "typ", "sys" and "mode"
//					- Usage: use "app" parameter for webdynpro app, GUI Tcode, SuccessFactors or Business Objects.
//					-		 use "typ" parameter for UI technology.
//							 - "WDA" for Webdynpro ABAP.
//							 - "GUI" for SAP GUI transactions.
//							 - "BOB" 
//					- 		 use "sys" parameter for calling system.
//							 - "ERP", for SAP ERP or SuccessFactors
//							 - "BOB", for SAP Business Objects 
//							 - "GWY", for SAP Gateway
//							 - "URL", for Web URL in place.
//									Usage: sys=ERP&typ=URL&app=http://www.sap.com
//							
//		20/05/2015	Refactored into UI5 best practices utilising component and MVC.
//					- Added full screen and new window functionality as well.
//
//		FUTURE FEATURES? - "FS", enable fullscreen mode for transactions that require more real estate.