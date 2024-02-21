/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('first_name', 255).nullable();
            table.string('last_name', 255).nullable();
            table.string('email', 255).unique().nullable();
            table.text('password').nullable();
            table.integer('otp', 11).nullable();
            table.text('device_token', 255).nullable();
            table.text('profile_picture', 255).nullable();
            table.string('active_role', 255).nullable().defaultTo('user');
            table.string('role', 255).nullable().defaultTo('user');
            table.string('phone_number', 255).nullable(); 
            table.string('customer_id', 255).nullable(); 
            table.string('dob', 255).nullable(); 
            table.boolean('is_verified').defaultTo(false);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('users');

};