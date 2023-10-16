exports.up = knex => knex.schema.createTable("ingredients", table =>{ 
  table.increments('id').primary() 
  table.string('name').notNullable();  
})

exports.down = knex => knex.schema.dropTable("ingredients")
