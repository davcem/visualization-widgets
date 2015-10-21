var HACKAGRAPH = HACKAGRAPH || {};


HACKAGRAPH.Vis = function () {
    this.data_handler_ = null;
    this.graph_data = [];
};


HACKAGRAPH.Vis.prototype.init = function (data) {

    var path_js = 'Hackagraph/lib/cytoscape.js';
    var path_css = 'Hackagraph/style.css';

    Modernizr.load({
        test: path_css,
        load: path_css,
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
            this.update(graph_data)

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
    console.log(this.graph_data);

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
                'content': 'data(titel)'
            })
            .selector('edge')
            .css({
                'target-arrow-shape': 'triangle',
                'width': 4,
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
            .selector('node[type="Book"]')
            .css(
            {
                'background-color': 'green'
            })
            .selector('node[type="Publication"]')
            .css(
            {
                'background-color': 'red'
            }),
        layout: {
            name: 'breadthfirst',
            directed: false,
            roots: undefined,
            padding: 10
            name: 'circle',
            fit: true, // whether to fit the viewport to the graph
            padding: 30, // the padding on fit
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
            radius: undefined, // the radius of the circle
            startAngle: 3 / 2 * Math.PI, // the position of the first node
            counterclockwise: false, // whether the layout should go counterclockwise (true) or clockwise (false)
            sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            ready: undefined, // callback on layoutready
            stop: undefined // callback on layoutstop

        }
    });

//    var bfs = cy.elements().bfs('#a', function() {
//    }, true);
//
//    var i = 0;
//    var highlightNextEle = function() {
//      bfs.path[i].addClass('highlighted');
//
//      if (i < bfs.path.length) {
//        i++;
//        setTimeout(highlightNextEle, 1000);
//      }
//    };
//
//    // kick off first highlight
//    highlightNextEle();

};


