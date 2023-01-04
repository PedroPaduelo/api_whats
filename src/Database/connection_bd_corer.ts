


import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host :    process.env.PGHOST,
    port:     5800,
    database: process.env.PGDATABASE,
    user:     process.env.PGUSER,
    password: process.env.PGPASSWORD
  },
  pool: { 
    min: 0,
    max: 250 
  },
  useNullAsDefault: true
})



export default connection;




