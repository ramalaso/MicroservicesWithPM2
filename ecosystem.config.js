module.exports = {
    apps: [
        {
            name: 'plans-service',
            script: './plans-service/index.js',
            watch: true,
            env: {
                NODE_ENV: 'development',
                MYSQL_USER: 'root',
                MYSQL_PASS: '123456',
                MYSQL_HOST: 'localhost',
                MYSQL_PORT: 3307,
                MYSQL_BD: 'PlansDb',
                PORT: 3001
            },
            env_production: {
                NODE_ENV: 'production',
            }
        },
        {
            name: 'subscriptions-service',
            script: './subscriptions-service/index.js',
            watch: true,
            env: {
                NODE_ENV: 'development',
                MYSQL_USER: 'root',
                MYSQL_PASS: '123456',
                MYSQL_HOST: 'localhost',
                MYSQL_PORT: 3308,
                MYSQL_BD: 'SubscriptionsDb',
                PORT: 3002
            },
            env_production: {
                NODE_ENV: 'production',
            }
        }
    ]
}