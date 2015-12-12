sap.ui.jsview("zwdainplace.view.App", {

      getControllerName : function() {
         return "zwdainplace.view.App";
      },
          
      createContent : function(oController) {
    	  
    	  // Create page containing iframe container for legacy SAP UI GUI and Webdynpro.
    	 var oApp = new sap.m.App({
      		  pages : [
       		        new sap.m.Page({
   	    		  		id: this.createId("page"),
   	    		  		showHeader: false,
   	    		  		enableScrolling: false,
   	    		  		content: [
   	    		  		   new sap.ui.core.HTML({
   	    		  			   id: this.createId("html_frag"),
   	    		  			   preferDOM:true,
   	    		  			   content:""
   	    		  		   })
   	    		  		]
   					})
       	    	  ]
         });
    	 
    	 return oApp;
    	  
      }
});