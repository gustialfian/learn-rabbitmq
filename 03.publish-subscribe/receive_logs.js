const amqp = require('amqplib')

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()
    const exchange = 'logs'

    await channel.assertExchange(exchange, 'fanout', { durable: false })
    const q = await channel.assertQueue('', { exclusive: true })
    channel.bindQueue(q.queue, exchange, '')

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue)

    await channel.consume(q.queue, function (msg) {
      if (msg.content) {
        console.log(" [x] %s", msg.content.toString())
      }
    }, { noAck: true })
  } catch (error) {
    console.log(`error`, error)
  }
}

main()