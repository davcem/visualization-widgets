var HACKAGRAPH = HACKAGRAPH || {};
var cy;


HACKAGRAPH.Vis = function () {
    this.data_handler_ = null;
    this.graph_data = [];

    this.kw_list_open = false;
};


HACKAGRAPH.Vis.prototype.init = function (data) {

    var path_js = 'Hackagraph/lib/cytoscape.js';
    var path_css = 'Hackagraph/style.css';
    var path_cy_qtip = 'Hackagraph/lib/cytoscape-qtip.js';
    var path_jq_qtip_css = 'Hackagraph/lib/jquery.qtip.min.css';
    var path_jq_qtip_js = 'Hackagraph/lib/jquery.qtip.min.js';

    Modernizr.load({
        test: path_css,
        load: path_css,
        complete: function () {
            console.log("cytoscape css load completed");
        }.bind(this)
    });

    Modernizr.load({
        test: path_cy_qtip,
        load: path_cy_qtip,
        complete: function () {
            console.log("cytoscape css load completed");
        }.bind(this)
    });

    Modernizr.load({
        test: path_jq_qtip_css,
        load: path_jq_qtip_css,
        complete: function () {
            console.log("cytoscape css load completed");
        }.bind(this)
    });

    Modernizr.load({
        test: path_jq_qtip_js,
        load: path_jq_qtip_js,
        complete: function () {
            console.log("cytoscape css load completed");
        }.bind(this)
    });


    var data_handler_path = 'Hackagraph/data.js';
    Modernizr.load({
        test: data_handler_path,
        load: data_handler_path,
        complete: function () {
            this.data_handler_ = new HACKAGRAPH.DataHandler(this, data);
            this.data_handler_.processData();
            var graph_data = this.data_handler_.getProcessedData();
            this.update(graph_data);

            this.initKwSelectBox();

            Modernizr.load({
                test: path_js,
                load: path_js,
                complete: function () {
                    console.log("cytoscape load completed");
                    this.initializeCytoscape_();
                }.bind(this)
            });
        }.bind(this)
    });


};

HACKAGRAPH.Vis.prototype.onKwSelectorCheckboxClick = function (element) {
    var checkbox = $(element.children('input')[0]);
    var target_id = checkbox.attr("target");

    alert(target_id);

};

HACKAGRAPH.Vis.prototype.onKwSelectorListClick = function () {

    var $list = $('#hackagraph_kw_selector_container');
    if (this.kw_list_open) {            //CLOSE IT
        $list.css('height', '25px');
        $list.css('overflow', 'none');
    } else {                            //OPEN IT

        $list.css('height', '100%');
        $list.css('overflow', 'auto');
    }

    this.kw_list_open = !this.kw_list_open;
};

/**
 * Building a nice box for selecting keywords
 */
HACKAGRAPH.Vis.prototype.initKwSelectBox = function () {
    var kw_nodes = this.data_handler_.getKwNodes();

    var $list = $('#hackagraph_kw_selector_list');

    //For better performance create long html string and push it only once
    var list_html = "";
    for (var i = 0; i < kw_nodes.length; i++) {
        var kwnode = kw_nodes[i];
        var list_elm = "<li class='hackagraph_kw_selector_elm' id='hackagraph_kw_selector_elm_" + kwnode.data.id + "'>" +
            "<input type='checkbox' target='" + kwnode.data.id + "' />" + kwnode.data.kw_name + "</li>";

        list_html += list_elm;
    }

    $list.append(list_html);


    $(document).ready(function () {
        $('#hackagraph_kw_selector_container > h3').click(function () {
            this.onKwSelectorListClick();
        }.bind(this));

        $('.hackagraph_kw_selector_elm').click(function (data) {
            this.onKwSelectorCheckboxClick($(data.target));
        }.bind(this));
    }.bind(this))

}

/**
 *
 * @param {array} data  Processed data by the @see{HACKAGRAPH.DataHandler}
 */
HACKAGRAPH.Vis.prototype.update = function (graph_data) {

    this.graph_data = graph_data;

    //Update the graph here!
    console.log("UPDATING THE GRAPH WITH DATA ", graph_data);

};

HACKAGRAPH.Vis.prototype.initializeCytoscape_ = function () {

    console.log("cytoscape initialize start");

    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: this.graph_data,
        //initial viewport state:
        zoom: 1,
        pan: {x: 0, y: 0},
        // interaction options:
        minZoom: 1,
        maxZoom: 2,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: false,
        boxSelectionEnabled: false,
        selectionType: 'single',
        touchTapThreshold: 8,
        desktopTapThreshold: 4,
        autolock: false,
        autoungrabify: false,
        autounselectify: false,
        // rendering options:
        headless: false,
        styleEnabled: true,
        hideEdgesOnViewport: false,
        hideLabelsOnViewport: false,
        textureOnViewport: false,
        motionBlur: true,
        motionBlurOpacity: 0.2,
        wheelSensitivity: 1,
        pixelRatio: 1,
        initrender: function (evt) { /* ... */
        },
        renderer: {/* ... */},
        //Style
        style: cytoscape
            .stylesheet()
            .selector('node')
            .css({
                'content': 'data(id)',
                'width': '5',
                'height': '5',
                'font-weight': 'bold',
                'font-size': '10',
                'font-style': 'inherit',
                'color': 'white',
                'text-valign': 'center',
                'text-halign': 'center',
                'color': '#000',
                'text-outline-width': '2',
                'text-outline-color': '#fff',
                'text-outline-opacity': '1',
                'overlay-color': '#fff'
            })
            .selector('edge')
            .css({
                'target-arrow-shape': 'triangle',
                'width': 1,
                'line-color': '#ddd',
                'target-arrow-color': '#ddd'
            })
            .selector('.highlighted')
            .css(
            {
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            })
            .selector('node[type="kw"]')//keyword
            .css(
            {
                'text-outline-color': 'green'
            })
            .selector('node[type="doc"]')//document
            .css(
            {
                'text-outline-color': 'red'
            }),
        layout: {
            name: 'random',
            fit: true, // whether to fit to viewport
            padding: 10, // fit padding
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            animate: true, // whether to transition the node positions
            animationDuration: 1500, // duration of animation in ms if enabled
            ready: undefined, // callback on layoutready
            stop: undefined // callback on layoutstop

        }
    });

//    cy.$('#n').qtip({
//        content: 'data(id)',
//        position: {
//          my: 'top center',
//          at: 'bottom center'
//        },
//        style: {
//          classes: 'qtip-bootstrap',
//          tip: {
//            width: 10,
//            height: 10
//          }
//        }
//      });
};
