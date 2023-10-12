
exports.up = knex => knex.schema.createTable("admin", table =>{
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
})

exports.down = knex => knex.schema.dropTable("admin")
