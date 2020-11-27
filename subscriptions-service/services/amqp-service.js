const amqplib = require('amqplib');

module.exports = class AmqpService {
    constructor(connectrionString, channelName, queueName) {
        this.connectrionString = connectrionString;
        this.channelName = channelName;
        this.queueName = queueName;
        this.connection = null;
        this.channel = null;
    }

    async init() {
        if (this.connection && this.channel) {
            return;
        }
        this.connection = await amqplib.connect(this.connectionString);
        this.channel = await this.connection.createChannel(this.channel);
        return await this.channel.assertQueue(this.queueName);
    }

    async send(msg) {
        return this.channel.sendToQueue(this.queueName, Buffer.from(msg));
    }
};