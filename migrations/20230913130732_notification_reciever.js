/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('messages_receiver', function (table) {
            table.increments('id');
            table.string('notification_id', 255).nullable();
            table.string('receiver_id', 255).nullable();
            table.boolean('is_seen').defaultTo(false);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('messages_receiver');

};