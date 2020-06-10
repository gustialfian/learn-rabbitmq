```bash
# shell 1
node 04.routing/receive_logs_direct.js info warning error
# shell 2
node 04.routing/receive_logs_direct.js error
# shell 3
node 04.routing/emit_log_direct.js info "healhcheck"
node 04.routing/emit_log_direct.js warning "storage almost full"
node 04.routing/emit_log_direct.js info "app running"
node 04.routing/emit_log_direct.js error "Run. Run. Or it will explode"
node 04.routing/emit_log_direct.js info "db up"
```