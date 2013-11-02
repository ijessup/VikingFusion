/*
* @file app.ui.js
* @author Mikael Kindborg and Isaac Jessup
*
* This file contains UI code at a more abstract level.
* The intention is to make it easier to switch UI libraries
* without having to update/rewrite all the UI code.
*/

app.ui = (function()
{
	var ui = {};
	
	ui.toCamelCase = function(TEXT){
		TEXT = TEXT.toLowerCase()
		var words = TEXT.split(" ")
		for(var i=1;i<words.length; i++){
			words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
		}
		TEXT = words.join("")
		return TEXT
	}

	// Make sure we get the correct event type on every touch system.

	ui.showMessage = function(message)
	{
		// Windows Phone does not support alert, show the message
		// in the user name field for now.
		alert(message);
	};
	
	ui.getTop10 = function( cID, pageName )
	{
		var handle = ui.toCamelCase(pageName);
		if($("#" + handle).length == 0) {
			$('body')
				.append('<div id="' + handle + '" data-role="page" data-add-back-btn="true"><div data-role="header"><h1>' + pageName + '</h1></div><div data-role="content"><ul class="top10ListContent" data-role="listview"><li>Loading...</li></ul><div data-role="footer" data-id="advertisments" data-position="fixed" class="ui-advertisment"><img id="adImage" src="images/advertisments/carrierweb.png"/><img src="images/close.png" style="height:32px" onclick="app.ui.hideAdvertisment();"/></div></div>');
		}
		// Go to second screen.
		ui.showPage(handle);
		
		app.getTop10( cID, function( data ) {
			ui.showTop10List( handle, data );
		});
	};
	
	ui.getItemContent = function( cID )
	{
		if($("#" + cID).length == 0) {
			$('body')
				.append('<div id="' + cID +'" class="item-page" data-role="page" data-add-back-btn="true"><div data-role="header"><h1>Viking Fusion</h1></div><div class="itemContent" data-role="content"><p>Loading...</p></div><div data-role="footer" data-id="advertisments" data-position="fixed" class="ui-advertisment"><img id="adImage" src="images/advertisments/carrierweb.png"/><img src="images/close.png" style="height:32px" onclick="app.ui.hideAdvertisment();"/></div></div>');
			
			$('#'+cID).bind('finishedLoading', function(e) 
				{
					ui.finishedLoading(e);
				}
			);
			
			app.getItemContent( cID, function( data ) {
				ui.showItemContent( cID, data );
			});
			
			ui.showPage(cID);
		} else {
			ui.showPage(cID);
		}
	};
	
	/*
	 * Search
	 */
	ui.submitSearchQuery = function() 
	{
		ui.showLoadingIndicator();
		
		app.getSearchResults( $('input[name=query]').val(), 8, function( data ) {
			ui.showSearchResults( data );
		});
	}

	/**
	 * Set up event bindings and initialize the UI.
	 */
	ui.initialize = function()
	{
		// Handle the back key event (on Android).
		document.addEventListener(
			"backbutton",
			function()
			{	
				ui.goBack();
			},
			true);

		ui.initializeFramework();
	};


	/**
	 * Displays a loading indicator in the UI.
	 */
	ui.showLoadingIndicator = function()
	{
		//$("#tweetList").html("<li>Loading...</li>");
		alert("ui.showLoadingIndicator: Implement for the specific UI framework used");
	};

	/**
	 * Called by framework when document has loaded.
	 */
	ui.initializeFramework = function()
	{
		alert("ui.initializeFramework: Implement for the specific UI framework used");
	};

	/**
	 * Navigate back one page.
	 */
	ui.goBack = function()
	{
		alert("ui.goBack: Implement for the specific UI framework used");
	};

	/**
	 * Show one page.
	 */
	ui.showPage = function(page)
	{
		alert("ui.showPage: Implement for the specific UI framework used");
	};
	
	
	/** 
	 * Create advertisment pop-up at bottom of screen. 
	 */
	ui.showAdvertisment = function() {
		//$('#adImage').attr('src', app.getRandomAdvertismentImagePath());
		$('.ui-advertisment')
			.delay(300000).fadeIn(400);
	}
	ui.hideAdvertisment = function() {
		$('.ui-advertisment')
			.slideUp(300);
			
		ui.showAdvertisment();
	}
	
	return ui;
	
	ui.itemCon
})();

// Call app.ui.initialize when document has loaded.
document.addEventListener(
	"DOMContentLoaded",
	app.ui.initialize,
	false);