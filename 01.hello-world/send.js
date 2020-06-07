const amqp = require('amqplib');

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)

    const channel = await connection.createChannel()

    var queue = 'hello';
    var msg = 'Hello world';

    await channel.assertQueue(queue, { durable: false })
    await channel.sendToQueue(queue, Buffer.from(msg))

    console.log(`[x] sent ${msg}`)

    setTimeout(function () {
      connection.close();
      process.exit(0)
    }, 500);
  } catch (error) {
    console.log(`error`, error)
  }
}

main()