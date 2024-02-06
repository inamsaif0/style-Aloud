/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('messages', function (table) {
            table.increments('id');
            table.integer('sender_id', 11).nullable();
            table.integer('receiver_id', 11).nullable();
            table.integer('parent_id', 11).nullable();
            table.integer('flagged_by', 11).nullable();
            table.integer('delete_by', 11).nullable();
            table.string('conversation_id', 255).nullable();
            table.string('file_type', 255).nullable();
            table.text('msg').nullable();
            table.text('media').nullable();
            table.boolean('is_deleted').nullable().defaultTo(false);
            table.boolean('is_seen').nullable().defaultTo(false);


        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('messages');

};