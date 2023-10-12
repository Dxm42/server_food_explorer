
exports.up = knex => knex.schema.createTable("dishes", table =>{
  table.increments('id').primary();
  table.integer('id_admin').unsigned().notNullable();
  table.foreign('id_admin').references('admin.id');
  table.string('nome').notNullable();
  table.string('description');
  table.string('category');
  table.string('ingredients');
  table.decimal('price').notNullable();
  table.string('image');
});


exports.down = knex => knex.schema.dropTable("dishes")