/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('review', function (table) {
            table.increments('id');
            table.string('order_id', 255).nullable();
            table.string('user_id', 255).nullable();
            table.string('amount', 255).nullable();
            table.timestamps(true, true);
        })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('review');

};