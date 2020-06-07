const amqp = require('amqplib');

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()
    const exchange = 'logs'
    const msg = process.argv.slice(2).join(' ') || 'Hello World!'

    channel.assertExchange(exchange, 'fanout', { durable: false })
    channel.publish(exchange, '', Buffer.from(msg))

    console.log(" [x] Sent %s", msg)

    setTimeout(function () {
      connection.close();
      process.exit(0)
    }, 500);
  } catch (error) {
    console.log(`error`, error)
  }
}

main()