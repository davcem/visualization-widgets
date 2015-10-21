(function () {

    var HackagraphPlugin = {};
    var $root = null;
    var initializationFinished = false;
    var afterInitCallback;
    var hackathon_vis = null;

//	HackagraphPlugin.initialize = function(EEXCESSObj, rootSelector){
//		$root = $(rootSelector);

    // load CSS
    // load other needed scripts (require.js is available)

    HackagraphPlugin.initialize = function (EEXCESSObj, rootSelector) {
        var path = 'Hackagraph/hackagraph.js';
        $root = $(rootSelector);

        if (initializationFinished)
            return;

        Modernizr.load({
            test: path,
            load: path,
            complete: function () {
                console.log("Hackagraph load completed");
//                           points = new FilterVisTimeCategoryPoints();
//                           width = parseInt(d3.select("#eexcess-filtercontainer").style("width"));
                initializationFinished = true;

                $(function () { // on dom ready

                    if (hackathon_vis == null) {

                        hackathon_vis = new HACKAGRAPH.Vis();

                    }

                }); // on dom ready

            }
        });

    };

    HackagraphPlugin.draw = function (receivedData, mappingCombination, iWidth, iHeight) {
        //var $inner = $('<div id="cy">We are here to stay</div>').css('background-color', 'lightgrey').css('height', 'inherit');
        //var $inner = $('<div id="cy">We are here to stay</div>').css('background-color', 'lightgrey').css('height', '100%').css('padding-top', '50px');

        var $inner = $('<div id="cy">We are here to stay</div>');
        $root.append($inner);

        hackathon_vis.init();
    };

    // indexArray: array with items' indices to highlight. They match items in receivedData (parameter in Render.draw)
    HackagraphPlugin.highlightItems = function (indexArray) {
    };

    HackagraphPlugin.finalize = function () {
    };

    PluginHandler.registerVisualisation(HackagraphPlugin, {
        'displayName': 'hackagraph',
    });
})();
