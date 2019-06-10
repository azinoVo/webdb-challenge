
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'project name 1', description: 'description here for project one'},
        {name: 'project name 2', description: 'description here for project two'}
      ]);
    });
};
