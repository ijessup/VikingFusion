/*
* @file init.js
* @author Isaac Jessup
*
* Code for the initialization of the application. The app is divided into
* separate objects for the application logic (the app object)
* and the user interface (the app.ui object).
*/

/**
 * Here we add jQuery Mobile specific code.
 */
(function()
{
	/**
	 * Show one page.
	 */
	app.ui.showPage = function(page)
	{
		$.mobile.changePage("#" + page);//, {transition: "slideleft"});
	};

	/**
	 * Navigate back one page.
	 */
	app.ui.goBack = function()
	{
		
		if ($.mobile.activePage[0].id === "home")
		{
			// Send the app to the background if
			// we are on the home screen (first page).
			//mosync.app.sendToBackground();
			mosync.app.exit();
		}
		else
		{					
			// Pause video
			$('video-player-' + $.mobile.activePage[0].id).pause();
			
			// Otherwise navigate to previous screen.
			history.back();
			return false;
		}
	};
	
	/**
	 * Called by framework when document has loaded.
	 */
	app.ui.initializeFramework = function()
	{	
		$.getScript('https://connect.facebook.net/en_US/all.js', function(){
			FB.init({ 
				appId: "137992656363154", 
				nativeInterface: CDV.FB, 
				useCachedDialogs: false,
				xfbml : true 
			});
			FB.XFBML.parse();
		});
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "https://connect.facebook.net/en_US/all.js#xfbml=1";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		var calendarData = {
			events : [],
			months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			days : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			startOfWeek : 0
		}
		$.getJSON("http://vikingfusion.berry.edu/index.php/tools/packages/mobicomm/eventlist",function(data){
			
  			$.each(data, function(key, val) {
  				var ev = {
  					summary : val.summary,
  					begin : new Date(val.begin),
  					end : new Date(val.end)
  				}
  				
  				calendarData.events.push(ev);
  			});
  			
			app.ui.initializeCalendar(calendarData);
		});
	};
	
	app.ui.initializeCalendar = function(calendarData) {
		$("#calendar").jqmCalendar(calendarData);
	}

	/**
	 * Displays a loading indicator in the UI.
	 */
	app.ui.showLoadingIndicator = function()
	{
		// We do not set this due to problems with
		// dynamically updating/refreshing the DOM/UI
		// of jQuery Mobile apps.
		// TODO: Use the loading support of jQuery Mobile.
	};

	/**
	 * Outputs the list of pages to the user-interface.
	 */
	app.ui.showTop10List = function(pageName, data)
	{
		var results = "";
		
		if ((!data) ||
			(data.length === 0) ||
			(data.error === "Not found"))
		{
			results = "<li>No content found.</li>";
		} else {
			for (var i = 0; i < data.length; ++i) {
				if(pageName == 'entertainment') {
					if(data[i].cvName == "Electric Feel") {
						results += '<li><a onclick="window.open(\'http://cdn.livestream.com/embed/electricfeel2012?layout=4&color=0xed1c24&autoPlay=false&mute=false&iconColorOver=0xffffff&iconColor=0xffd2d5&allowchat=true\', \'_system\', \'location=no\');">' + data[i].cvName + '</a></li>';
					} else {
						results += '<li><a onclick="app.ui.getTop10(' + data[i].cID + ', \'' + data[i].cvName + '\')">' + data[i].cvName + '</a></li>';
					}
				} else {
					results += '<li><a onclick="app.ui.getItemContent(' + data[i].cID + ')">' + data[i].cvName + '</a></li>';
				}
			}
		}
		$("#"+pageName+" .top10ListContent").html(results);
		$("#"+pageName+" .top10ListContent").listview("refresh");
	}; 


	/**
	 * Outputs the page content to the user-interface.
	 */
	app.ui.showItemContent = function(cID, data)
	{
		var results = "";
		
		if ((!data) ||
			(data.length === 0) ||
			(data.error === "Not found"))
		{
			results = "No content found.";
		}
		else
		{
			results = data;
		}
		results += 
			'<div data-role="footer" data-id="advertisments" data-position="fixed" class="ui-advertisment">'+
				'<img id="adImage" src="images/advertisments/carrierweb.png"/>'+
				'<img src="images/close.png" style="height:32px" onclick="app.ui.hideAdvertisment();"/>'+
			'</div>';
		$("#" + cID + ' .itemContent').html(results);
		$('#'+cID).trigger('finishedLoading');
	};
	
	/**
	 * Outputs the list of pages to the user-interface.
	 */
	app.ui.showSearchResults = function(data)
	{
		var results = "";
		
		if ((!data) ||
			(data.length === 0) ||
			(data.error === "Not found"))
		{
			results = "<li>No content found.</li>";
		} else {
			for (var i = 0; i < data.length; ++i) {
				results += '<li><a onclick="app.ui.getItemContent(' + data[i].cID + ')">' + data[i].cvName + '</a></li>';
			}
		}
		$("#search-results").html(results);
		$("#search-results").listview("refresh");
	}; 
	
	app.ui.finishedLoading = function(e)
	{	
		FB.XFBML.parse();
		
		$('.social', e.target).jsShare({ 
			animate: false,
			initialdisplay: 'expanded', 
			maxwidth: '100%', 
			url: $('.social', e.target).attr('data-url'), 
			title: $('.social', e.target).attr('data-title') 
		});
		
		var 
			currentPage = $(e.target),
			options = {
				captionAndToolbarAutoHideDelay: 0
				},
			photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
			
		return true;
	}
		
})();
