/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('pet_profile', function (table) {
        table.increments('id');
        table.string('user_id', 255).nullable();
        table.string('name', 255).nullable();
        table.string('image', 255).nullable();
        table.string('profile_image', 255).nullable();
        table.integer('type', 255).nullable();
        table.text('height', 255).nullable();
        table.text('weight', 255).nullable();
        table.string('about', 255).nullable()
        table.string('breed', 255).nullable();
        table.string('trait', 255).nullable(); 
        table.string('gender', 255).nullable(); 
        table.string('breeder', 255).nullable(); 
        table.string('address', 255).nullable(); 
        table.string('longitude', 255).nullable(); 
        table.string('latitude', 255).nullable(); 
        table.string('price', 255).nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pet_profile');
  
};
