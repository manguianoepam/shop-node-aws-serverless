'use strict';
const {db} = require('../utils/util.connection');

const create = async (stock) => {
    console.log(`create stock executing`);
    console.log(`DB Connection`);
    const client = await db.connect();
    let isCreated = true;
    try {
        console.log(`BEGIN TRANSACTION`);
        await client.query('BEGIN');

        console.log(`INSERT stock`);
        await client.query('INSERT INTO public.stock (product_id, count) VALUES ($1, $2)', [stock.productId, stock.count]);

        console.log(`COMMIT TRANSACTION`);
        await client.query('COMMIT');
    } catch (error) {
        console.log(`ROLLBACK TRANSACTION`);
        await client.query('ROLLBACK');
        console.log(`An error occurred ${error}`);
        isCreated = false;
    } finally {
        client.release();
    }
    return isCreated;
};

module.exports = {create};