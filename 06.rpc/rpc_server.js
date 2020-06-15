const amqp = require('amqplib')

const url = 'amqp://localhost'

async function main() {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()

    const queue = 'rpc_queue'

    channel.assertQueue(queue, {
      durable: false
    })
    channel.prefetch(1)
    console.log(' [x] Awaiting RPC requests')

    channel.consume(queue, msg => {
      const n = parseInt(msg.content.toString())
      console.log(" [.] %s: fib(%d)", msg.properties.replyTo, n)
      const r = fibonacci(n)

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(r.toString()),
        { correlationId: msg.properties.correlationId }
      )

      channel.ack(msg)
    })
  } catch (error) {
    console.log(`error`, error)
  }
}

main()

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n
  else
    return fibonacci(n - 1) + fibonacci(n - 2)
}