'use strict';
const model = require('../model/product.model').products;

const selectAll = function () {
    return model;
}

const selectById = function (product_id) {
    return model.find(product => product.id === product_id);
}

module.exports = {selectAll, selectById};