var HACKAGRAPH = HACKAGRAPH || {};


HACKAGRAPH.Vis = function () {

    var pathJS = 'Hackagraph/lib/cytoscape.js';
    var pathCSS = 'Hackagraph/style.css';


    Modernizr.load({
        test: pathJS,
        load: pathJS,
        complete: function () {
            console.log("cytoscape load completed");
            this.initializeCytoscape();
        }.bind(this)
    });
};


HACKAGRAPH.Vis.prototype.initializeCytoscape = function () {

    console.log("cytoscape initialize start");

    cy = cytoscape({
        container: document.getElementById('cy'),

        style: cytoscape
            .stylesheet()
            .selector('node')
            .css({
                'content': 'data(id)'
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
            }),

        elements: {
            nodes: [{
                data: {
                    id: 'a'
                }
            }, {
                data: {
                    id: 'b'
                }
            }, {
                data: {
                    id: 'c'
                }
            }, {
                data: {
                    id: 'd'
                }
            }, {
                data: {
                    id: 'e'
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


$(function () { // on dom ready
    var hackathon_vis = new HACKAGRAPH.Vis();
}); // on dom ready