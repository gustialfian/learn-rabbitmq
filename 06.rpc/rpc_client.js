const amqp = require('amqplib')

const url = 'amqp://localhost'

const args = process.argv.slice(2)

if (args.length == 0) {
  console.log("Usage: rpc_client.js num")
  process.exit(1)
}

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()

    const assertQueue = await channel.assertQueue('', { exclusive: true })

    var correlationId = generateUuid()
    var num = parseInt(args[0])

    console.log(' [x] Requesting fib(%d)', num)

    // listener yang nungguin response dari server
    channel.consume(assertQueue.queue, function (msg) {
      if (msg.properties.correlationId == correlationId) {
        console.log(' [.] Got %s', msg.content.toString())
        setTimeout(function () {
          connection.close()
          process.exit(0)
        }, 500)
      }
    }, {
      noAck: true
    })

    // yang melakukan request dari sisi client
    channel.sendToQueue(
      'rpc_queue',
      Buffer.from(num.toString()),
      {
        correlationId: correlationId,
        replyTo: assertQueue.queue
      }
    )
  } catch (error) {
    console.log(`error`, error)
  }
}

main()

function generateUuid() {
  return Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
}