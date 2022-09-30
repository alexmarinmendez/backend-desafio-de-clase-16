const options = require('./options/mysql.config')
const knex = require('knex')

const database = knex(options)
const articulos = [
    { nombre: 'Papas', codigo: '0018', precio: 23.15, stock: 3 },
    { nombre: 'Bebida', codigo: '0019', precio: 33.15, stock: 34 },
    { nombre: 'Hamburguesa', codigo: '0058', precio: 3.89, stock: 33 },
    { nombre: 'Dulces', codigo: '0043', precio: 45.09, stock: 13 },
    { nombre: 'Chocolates', codigo: '0098', precio: 67.15, stock: 93 },
]
const processDB = async () => {
    let existTable = await database.schema.hasTable('articulos')
    if (existTable) {
        await database.schema.dropTable('articulos')
    }
    await database.schema.createTable('articulos', table => {
        table.increments('id')
        table.string('nombre', 15).nullable(false)    
        table.string('codigo', 10).nullable(false)    
        table.float('precio')
        table.integer('stock')
    })
    await database('articulos').insert(articulos)
    let results = JSON.parse(JSON.stringify(await database.from('articulos').select('*')))
    console.log(results)
    await database.from('articulos').where('id', 3).del()
    await database.from('articulos').where('id', 2).update({stock: 0})
    database.destroy()
}

processDB()

