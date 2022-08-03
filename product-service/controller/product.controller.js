'use strict';
const {db} = require('../utils/util.connection');


const selectAll = async () => {
    try {
        console.log(`selectedAll executing`);
        console.log(`DB Connection`);
        const client = await db.connect();
        console.log(`Selecting from Product Table`);
        const select = await client.query('SELECT p.*, s.count FROM product p INNER JOIN stock s ON p.id = s.product_id');
        client.release();
        console.log(`Products: ${JSON.stringify(select.rows)}`);
        return select.rows;
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        return undefined;
    }
}

const selectById = async (id) => {
    try {
        console.log(`selectById executing`);
        console.log(`DB Connection`);
        const client = await db.connect();
        console.log(`Selecting from Product Table by ${id}`);
        const select = await client.query(
            `SELECT p.*, s.count FROM product p INNER JOIN stock s ON p.id = s.product_id WHERE p.id = $1`,
            [id]
        );
        client.release();
        console.log(`Product: ${JSON.stringify(select.rows)}`);
        return select.rows;
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        return undefined;
    }
}

const create = async (product) => {
    console.log(`create product executing`);
    console.log(`DB Connection`);
    const client = await db.connect();
    let isCreated = true;
    try {
        console.log(`BEGIN TRANSACTION`);
        await client.query('BEGIN');

        console.log(`INSERT product`);
        await client.query(
            'INSERT INTO public.product (id, title, description, price) VALUES ($1, $2, $3, $4)',
            [product.id, product.title, product.description, product.price]
        );
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

module.exports = {selectAll, selectById, create};