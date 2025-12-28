const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({ 
    connectionString: process.env.NODE_ENV_DB2 
});

// module.exports = new Pool({
//     connectionString: process.env.NODE_ENV_DB
// });