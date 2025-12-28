const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    messages text[][][]
);
`;

const main = async () => {
    console.log('seeding...');
    const client = new Client({ connectionString: process.env.NODE_ENV_DB2 });
    // const client = new Client({
    //     host: process.env.DATABASE_HOST,
    //     database: process.env.DATABASE_NAME,
    //     username: process.env.DATABASE_USER,
    //     password: process.env.DATABASE_PASSWORD,
    //     ssl: true
    // });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
};

main();