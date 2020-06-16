const amqp = require('amqplib')

const url = 'amqp://localhost'
var args = process.argv.slice(2)

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>")
  process.exit(1)
}

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()

    const exchange = 'topic_logs'
    channel.assertExchange(exchange, 'topic', {
      durable: false
    })

    const assertQueue = await channel.assertQueue('', { exclusive: true })

    args.forEach(function (key) {
      channel.bindQueue(assertQueue.queue, exchange, key)
    })

    channel.consume(assertQueue.queue, function (msg) {
      console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString())
    }, { noAck: true })

    console.log(' [*] Waiting for logs. To exit press CTRL+C')

  } catch (error) {
    console.log(`error`, error)
  }
}

main()