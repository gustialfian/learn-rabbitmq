const amqp = require('amqplib')

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)

    const channel = await connection.createChannel()

    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: false })

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

    await channel.consume(queue, function (msg) {
      const secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function () {
        console.log(" [x] %s Done", msg.content.toString());
      }, secs * 1000);
    }, { noAck: true });

  } catch (error) {
    console.log(`error`, error)

  }
}

main()