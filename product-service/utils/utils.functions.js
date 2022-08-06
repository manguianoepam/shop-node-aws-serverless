const Str = require('@supercharge/strings');

const validateProductData = (body) => {
    return !!(Str.isString(body.title) && Str.isString(body.description) && !isNaN(body.price) && !isNaN(body.count));
}

module.exports = {validateProductData}