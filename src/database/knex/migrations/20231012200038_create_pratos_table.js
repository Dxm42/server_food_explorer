
exports.up = knex => knex.schema.createTable("dishes", table =>{
  table.increments('id').primary();
  table.integer('id_admin').unsigned().notNullable();
  table.foreign('id_admin').references('admin.id');
  table.string('name').notNullable();
  table.string('description');
  table.string('category');
  table.decimal('price').notNullable();
  table.string('image');
});


exports.down = knex => knex.schema.dropTable("dishes")