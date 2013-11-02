/*
* @file app.js
* @author Isaac Jessup
*
* Code for the application layer. The app is divided into
* separate objects for the application logic (the app object)
* and the user interface (the app.ui object).
*/

/**
 * Application layer (non-UI code).
 */
var app = (function()
{
	var app = {};
	var mobicommURL = "http://vikingfusion.berry.edu/index.php/tools/packages/mobicomm/";
	
	/**
	 * Downloads top 10 items in a given category.
	 */
	app.getTop10 = function( cID, callbackFun ) {		
		// Do AJAX call to get an array of categories.
		$.getJSON(mobicommURL + "pagelist?limit=10&cID=" + cID)
		.done( function( data ) {
			callbackFun( data );
		})
		.error( function( err ) {
			alert( "Connection Error" );
		});
	}
	/**
	 * Downloads tsearch results.
	 */
	app.getSearchResults = function( query, limit, callbackFun ) {
		$("#search-results").html("<li>Loading...</li>");
		$("#search-results").listview("refresh");
		
		// Do AJAX call to get an array of categories.
		$.getJSON(mobicommURL + "pagelist?limit=" + limit + "&query=" + query)
		.done( function( data ) {
			callbackFun( data );
		})
		.error( function( err ) {
			alert( "Connection Error" );
		});
	}
	/**
	 * Downloads item page content.
	 */
	app.getItemContent = function( cID, callbackFun ) {
		// Do AJAX call to get an array of categories.
		$.ajax(mobicommURL + "pagearea?cID=" + cID)
		.done( function( data ) {
			callbackFun( data );
		})
		.error( function( err ) {
			alert( "Connection Error" );
		});
	}

	return app;
})();
