
exports.up = exports.up = knex => knex.schema.createTable("shopping_cart", table =>{
  table.increments('id').primary();
  table.integer('id_users').unsigned().notNullable();
  table.foreign('id_users').references('users.id');
  table.integer('id_dishes').unsigned().notNullable();
  table.foreign('id_dishes').references('dishes.id');
  table.integer('quantity').notNullable();
})


exports.down = knex => knex.schema.dropTable("shopping_cart")
