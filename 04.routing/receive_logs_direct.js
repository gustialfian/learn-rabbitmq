const amqp = require('amqplib')

const url = 'amqp://localhost'
const args = process.argv.slice(2)

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]")
  process.exit(1)
}

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()
    const exchange = 'direct_logs'

    await channel.assertExchange(exchange, 'direct', { durable: false })
    const assertQueue = await channel.assertQueue('', { exclusive: true })

    args.forEach(function (severity) {
      channel.bindQueue(assertQueue.queue, exchange, severity)
    })

    console.log(" [*] Waiting for logs. To exit press CTRL+C")

    await channel.consume(assertQueue.queue, function (msg) {
      if (msg.content) {
        console.log(" [x] %s", msg.content.toString())
      }
    }, {
      noAck: true
    })

  } catch (error) {
    console.log(`error`, error)
  }
}

main()