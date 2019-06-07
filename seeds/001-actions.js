
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {project_id: 1, name: 'action1', description: 'description', notes: 'notes', completed_action: true},
        {project_id: 2, name: 'action2', description: 'description', notes: 'notes', completed_action: true}
      ]);
    });
};
