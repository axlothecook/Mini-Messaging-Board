const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    messages text[][]
);
`;

const main = async () => {
    console.log('seeding...');
    const client = new Client({ connectionString: process.env.NODE_ENV_DB3 });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
};

main();