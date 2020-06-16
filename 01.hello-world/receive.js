const amqp = require('amqplib')

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()
    const queue = 'hello'

    await channel.assertQueue(queue, { durable: false })

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

    await channel.consume(queue, (msg) => {
      console.log(" [x] Received %s", msg.content.toString())
    }, { noAck: true })

  } catch (error) {
    console.log(`error`, error)

  }
}

main()