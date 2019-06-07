
exports.up = function(knex, Promise) {
  return knex.schema 
  .createTable('projects', tbl => {
    tbl
        .increments();
    tbl
        .string('name', 128)
        .notNullable()
        .unique();
    tbl
        .text('description');
    tbl
        .boolean('completed_project');
  })

  .createTable('actions', tbl => {
    tbl
        .increments();
    tbl
        .string('name', 128)
        .notNullable()
        .unique();
    tbl
        .text('description');
    tbl
        .text('notes');
    tbl
        .boolean('completed_action');
    tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT') // explain how cascading works
        .onUpdate('CASCADE');
    
  })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('actions')
};
