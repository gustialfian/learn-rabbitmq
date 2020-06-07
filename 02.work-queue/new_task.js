const amqp = require('amqplib');

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)

    const channel = await connection.createChannel()

    var queue = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    await channel.assertQueue(queue, { durable: false })
    await channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    })

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