/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('cart', function (table) {
            table.increments('id');
            table.string('user_id', 255).nullable();
            table.string('product_id', 255).nullable();
            table.boolean('is_confirmed').defaultTo(false)
            table.integer('count', 11).defaultTo(0);
            table.timestamps(true, true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('cart');

};