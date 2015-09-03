(function(){

	var FilterVisKeywords = {};

	FilterVisKeywords.initialize = function(EEXCESSObj){		
	};

	FilterVisKeywords.draw = function(allData, selectedData, inputData, $container, category, categoryValues, from, to) {
		var $vis = $container.find('.FilterVisKeywords');
		if ($vis.length == 0){
			$vis = $('<div class="FilterVisKeywords"></div>');
			$container.append($vis);
		}

		var items = categoryValues.join(' ');		
		$vis.html('<div class="" style="align:center; padding:5px;">' + items + '</div>');
	};

	FilterVisKeywords.finalize = function(){
	};
	
	PluginHandler.registerFilterVisualisation(FilterVisKeywords, {
		'displayName' : 'Keywords', 
		'type' : 'keyword', 
	});
})();