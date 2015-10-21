var HACKAGRAPH = HACKAGRAPH || {};

/**
 * Responsible for fetching and manipulating data from eexcess to provide them to to the Cytoscape object
 * @constructor
 * @param {HACKAGRAPH.Vis} vis_obj
 * @param {array} Raw eexcess data
 */
HACKAGRAPH.DataHandler = function (vis_obj, init_data) {

    this.processed_data_ = {
        kws: [],
        docs: [],
        edges: []
    };
    this.e_data_ = init_data;
    /** @type{HACKAGRAPH.Vis} vis_**/
    this.vis_ = vis_obj;


    //Register Event for getting new results
    window.onmessage = function (e) {
        if (e.data.event) {
            switch (e.data.event) {
                case  "eexcess.newResults" :
                    this.fetchNewData();
                    this.processData();
                    this.vis_.update(this.processed_data);
                    break;
            }
        }
    }.bind(this)
};

/**
 * Get new Data from eexcess
 */
HACKAGRAPH.DataHandler.prototype.fetchNewData = function () {

    console.log("TODO: FETCH NEW DATA!");

};

/**
 * Process Data
 */
HACKAGRAPH.DataHandler.prototype.processData = function () {

    var all_kws = [];
    var docs = [];
    for (var i = 0; i < this.e_data_.length; i++) {

        var res = this.e_data_[i];
        var tmp_kws = [];
        for (var kw_key in res.keywords) {
            var kw_weight = res.keywords[kw_key];
            if (all_kws.indexOf(kw_key) === -1) {
                all_kws.push(kw_key);
                all_kws.push(kw_key);
                tmp_kws.push(kw_key);
                this.createKwNode_(kw_key);
            }
        }

        this.createDocNode_(res, tmp_kws);
    }
};

HACKAGRAPH.DataHandler.prototype.createDocNode_ = function (doc, kws) {

    var node = {
        group: 'nodes',
        data: {
            id: 'doc_' + doc.index,
            res_index: doc.index
            //parent: 'nparent',
        },
        position: {x: parseInt(Math.random() * 400), y: parseInt(Math.random() * 300)},
        /* selected: false,
         selectable: true,
         locked: false,
         grabbable: true,
         classes: 'foo bar',
         style: {'background-color': 'red'} */
    };

    this.processed_data_.docs.push(node);


    for (var i = 0; i < kws.length; i++) {
        var kw = kws[i];
        //Create corresponding edge
        var edge = {
            group: 'edges',
            data: {
                id: 'doc_' + doc.index + '_kw_' + kw,
                source: 'doc_' + doc.index,
                target: 'kw_' + kw,
                type: 'doc'
            },

        };
        this.processed_data_.edges.push(edge);
    }
};


HACKAGRAPH.DataHandler.prototype.createKwNode_ = function (kw) {
    var node = {
        group: 'nodes',
        data: {
            id: 'kw_' + kw,
            kw_name: kw,
            type: 'kw'
        },
        position: {x: parseInt(Math.random() * 400), y: parseInt(Math.random() * 300)},

    };

    this.processed_data_.kws.push(node);
};

/**
 * Return Process Data
 */
HACKAGRAPH.DataHandler.prototype.getProcessedData = function () {
    var nodes = [];
    nodes.push.apply(nodes, this.processed_data_.docs);
    nodes.push.apply(nodes, this.processed_data_.kws);
    return {nodes: nodes, edges: this.processed_data_.edges};
};