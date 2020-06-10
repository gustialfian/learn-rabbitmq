```bash
# To receive all the logs:
node 05.topic/receive_logs_topic.js "#"

# To receive all logs from the facility "kern":
node 05.topic/receive_logs_topic.js "kern.*"

# You can create multiple bindings:
node 05.topic/receive_logs_topic.js "kern.*" "*.critical"

# And to emit a log with a routing key "kern.critical" type:
node 05.topic/emit_log_topic.js "anonymous.info" "kucing"
node 05.topic/emit_log_topic.js "kern.critical" "A critical kernel error"
node 05.topic/emit_log_topic.js "anonymous.info" "lamp"
node 05.topic/emit_log_topic.js "anonymous.warn" "unused variabel"
node 05.topic/emit_log_topic.js "anonymous.info" "botol"
```