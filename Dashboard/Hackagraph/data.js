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

    var all_kws = {};
    var docs = [];

    /**
     * Create Doc-Nodes and collect keywords and their weights
     */
    for (var i = 0; i < this.e_data_.length; i++) {

        var res = this.e_data_[i];
        var tmp_kws = [];
        for (var kw_key in res.keywords) {
            var kw_weight = res.keywords[kw_key];
            if (all_kws[kw_key] === undefined) {
                all_kws[kw_key] = [];
                tmp_kws.push(kw_key);
            }
            all_kws[kw_key].push(kw_weight);
        }

        this.createDocNode_(res, tmp_kws);
    }


    /**
     * Finally create Keyword-Nodes
     */
    for (var i = 0; i < this.e_data_.keywords.length; i++)
        this.createKwNode_(this.e_data_.keywords[i].term, this.e_data_.keywords[i].stem, this.e_data_.keywords.length - i);
};

HACKAGRAPH.DataHandler.prototype.createDocNode_ = function (doc, kws) {
    var title = doc.title;
    var max_length = 14;
    if (title.length > max_length + 3)
        title = title.substr(0, max_length) + "...";

        var node = {
            group: 'nodes',
            data: {
                id: 'doc_' + doc.index,
                res_index: doc.index,
                type: 'doc',
                title: title
            },
            position: {x: parseInt(Math.random() * 400), y: parseInt(Math.random() * 300)},
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
                target: 'kw_' + kw
            },

        };
        this.processed_data_.edges.push(edge);
    }
};


HACKAGRAPH.DataHandler.prototype.createKwNode_ = function (kw, kw_id, weight) {
    var node = {
        group: 'nodes',
        data: {
            id: 'kw_' + kw_id,
            kw_name: kw,
            type: 'kw',
            weight: weight
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

HACKAGRAPH.DataHandler.prototype.getKwNodes = function () {
    return this.processed_data_.kws;
}