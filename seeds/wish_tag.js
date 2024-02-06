/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('wish_tags').del();
  await knex('wish_tags').insert([
    { id: 1, name: 'tag 1' },
    { id: 2, name: 'tag 2' },
    { id: 3, name: 'tag 3' },
    { id: 4, name: 'tag 4' },
    { id: 5, name: 'tag 5' },
  ]);

  await knex('users').del();
  await knex('users').insert([
    { id: 1, user_name: 'admin', email: "admin@gmail.com", password: "$2b$10$OH9yHMAPveCJAducSD4uhu2f6uGeyo29YI3LOOJ77c6eJRYZE7IJG", role: "admin" },
  ]);

  await knex('metas').del();
  await knex('metas').insert([
    {
      meta_title: "app_info",
      meta_key: 'privacy_policy_content',
      meta_value: "privacy policy content ",
      metaableId: 0,
      metaableType: "app_info",
    },
    {
      meta_title: "app_info",
      meta_key: 'help_content',
      meta_value: "help content",
      metaableId: 0,
      metaableType: "app_info",
    },
  ]);
};
