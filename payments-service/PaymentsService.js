const amqp = require('amqplib');

module.exports = class PaymentsService {
    constructor(connectrionString, channelName, queueName) {
        this.connectrionString = connectrionString;
        this.channelName = channelName;
        this.queueName = queueName;
        this.connection = null;
        this.channel = null;
    }

    async init() {
        console.log(`Initializing RabbitMQ connection to: ${this.connectrionString}`);
        this.connection = await amqp.connect(this.connectrionString);
        this.channel = await this.connection.createChannel(this.channelName);
        await this.channel.assertQueue(this.queueName);
        await this.channel.consume(this.queueName, this.onMessageReceive.bind(this));
    }

    onMessageReceive(message) {
        let contents = message.content.toString();
        let parsed = JSON.parse(contents);
        if (parsed.subscription && parsed.plan) {
            let { subscription, plan } = parsed;
            console.log(`Charging card ${subscription.cardNumber} with ${plan.price}`);
            this.channel.ack(message);
        } else {
            console.log('Invalid Payload. Aborting');
            this.channel.ack(message);
        }
    }
};