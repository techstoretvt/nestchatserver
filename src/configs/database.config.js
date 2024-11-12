
const development = {
  username: 'postgres',
  password: '123456789',
  database: 'chatapp',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',

  dialectOptions: {
    bigNumberStrings: true,
  }
  ,
  query: {
    "raw": true
  },
  timezone: "+07:00"
};
const testing = {
  username: process.env.CI_DB_USERNAME,
  password: process.env.CI_DB_PASSWORD,
  database: process.env.CI_DB_NAME,
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const production = {
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_NAME,
  host: process.env.PROD_DB_HOSTNAME,
  port: process.env.PROD_DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
    ssl: {
      // ca: readFileSync(__dirname + '/mysql-ca-main.crt'),
      require: true,
      rejectUnauthorized: false
    },
  },
};

export default {
  development,
  testing,
  production
}