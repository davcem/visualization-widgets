var HACKAGRAPH = HACKAGRAPH || {};

/**
 * Responsible for fetching and manipulating data from eexcess to provide them to to the Cytoscape object
 * @constructor
 * @param {HACKAGRAPH.Vis} vis_obj
 * @param {array} Raw eexcess data
 */
HACKAGRAPH.DataHandler = function (vis_obj, init_data) {

    this.processed_data_ = null;
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

    this.processed_data_ = "huhu " + this.e_data_.length;

};

/**
 * Return Process Data
 */
HACKAGRAPH.DataHandler.prototype.getProcessedData = function () {

    return this.processed_data_;
};