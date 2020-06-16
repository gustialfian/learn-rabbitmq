const amqp = require('amqplib');

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()
    const queue = 'hello';
    const msg = 'Hello world';

    await channel.assertQueue(queue, { durable: false })
    channel.sendToQueue(queue, Buffer.from(msg))

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