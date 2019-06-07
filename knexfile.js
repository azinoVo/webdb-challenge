// Update with your config settings.
// knex init

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/projects_actions.db3'
    },
  }
};
