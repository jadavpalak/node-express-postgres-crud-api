const pool = {
    username: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'password',
    port: 5432,
}

module.exports = {
    DB: 'postgres://'+pool.username+':'+pool.password+'@'+ pool.host +':'+ pool.port +'/'+ pool.database
}