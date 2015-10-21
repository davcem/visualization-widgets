var HACKAGRAPH = HACKAGRAPH || {};


HACKAGRAPH.Vis = function () {
    this.data_handler_ = null;
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

    Modernizr.load({
        test: path_js,
        load: path_js,
        complete: function () {
            console.log("cytoscape load completed");
            this.initializeCytoscape_();
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
        }.bind(this)
    });
}

/**
 *
 * @param {array} data  Processed data by the @see{HACKAGRAPH.DataHandler}
 */
HACKAGRAPH.Vis.prototype.update = function (graph_data) {

    //Update the graph here!
    console.log("UPDATING THE GRAPH WITH DATA ", graph_data);

};

HACKAGRAPH.Vis.prototype.initializeCytoscape_ = function () {

    console.log("cytoscape initialize start");

    cy = cytoscape({
        container: document.getElementById('cy'),
        //initial viewport state:
        zoom: 1,
        pan: { x: 0, y: 0 },
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
        initrender: function(evt){ /* ... */ },
        renderer: { /* ... */ },
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
                'background-color' : 'green'
            })
            .selector('node[type="Publication"]')
            .css(
            {
                'background-color' : 'red'
            }),
        elements: {
            nodes: [{
                data: {
                    id: 'a',
                    titel: 'document1',
                    provider: 'Wissensmedia',
                    type: 'Publication'
                }
            }, {
                data: {
                    id: 'b',
                        titel: 'document2',
                        provider: 'Wissensmedia',
                        type: 'Publication'
                }
            }, {
                data: {
                    id: 'c',
                    titel: 'document3',
                    provider: 'Wissensmedia',
                    type: 'Book'
                }
            }, {
                data: {
                    id: 'd',
                    titel: 'document4',
                    provider: 'Wissensmedia',
                    type: 'Book'
                }
            }, {
                data: {
                    id: 'e',
                    titel: 'document5',
                    provider: 'Wissensmedia',
                    type: 'Picture'
                }
            }],

            edges: [{
                data: {
                    id: 'a"e',
                    weight: 1,
                    source: 'a',
                    target: 'e'
                }
            }, {
                data: {
                    id: 'ab',
                    weight: 3,
                    source: 'a',
                    target: 'b'
                }
            }, {
                data: {
                    id: 'be',
                    weight: 4,
                    source: 'b',
                    target: 'e'
                }
            }, {
                data: {
                    id: 'bc',
                    weight: 5,
                    source: 'b',
                    target: 'c'
                }
            }, {
                data: {
                    id: 'ce',
                    weight: 6,
                    source: 'c',
                    target: 'e'
                }
            }, {
                data: {
                    id: 'cd',
                    weight: 2,
                    source: 'c',
                    target: 'd'
                }
            }, {
                data: {
                    id: 'de',
                    weight: 7,
                    source: 'd',
                    target: 'e'
                }
            }]
        },

        layout: {
            name: 'breadthfirst',
            directed: true,
            roots: '#a',
            padding: 10
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


