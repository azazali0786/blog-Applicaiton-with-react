const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'blogdb',
  password: 'Azaz#786@Ali',
  port: 5432,
});

async function check(){
  await client.connect()
  const res = await client.query('SELECT * from blogs')
  console.log(res.rows[2])
  // await client.end() 
}   

check()  
module.exports = client;   
                