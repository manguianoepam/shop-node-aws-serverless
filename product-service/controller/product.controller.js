'use strict';
const model = require('../model/product.model').products;

const selectAll = async () => {
    console.log(`${model}`)
    return model;
}

const selectById = async (product_id) => {
    return model.find(product => product.id === product_id);
}

module.exports = {selectAll, selectById};