const amqp = require('amqplib')

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()

    const exchange = 'topic_logs';
    const args = process.argv.slice(2);
    const key = (args.length > 0) ? args[0] : 'anonymous.info';
    const msg = args.slice(1).join(' ') || 'Hello World!';

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    channel.publish(exchange, key, Buffer.from(msg));

    console.log(" [x] Sent %s:'%s'", key, msg);

    setTimeout(function () {
      connection.close();
      process.exit(0)
    }, 500);

  } catch (error) {
    console.log(`error`, error)
  }
}

main()