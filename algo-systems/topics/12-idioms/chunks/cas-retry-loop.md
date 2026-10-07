---
id: chunks-cas-retry-loop
kind: chunk
version: 1
level: 4
tags: [idioms, concurrency, atomics, lock-free]
expose_ms: 6000
compile: null
requires:
  - cpp-core/atomics-chunk-cas-loop
refs:
  - https://en.wikipedia.org/wiki/Treiber_stack
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
elaborate: Push is safe against ABA, but pop on the same stack is not. What does pop compare that push never relies on?
---

```cpp
void push(Node* n) {   // head is std::atomic<Node*>
  n->next = head.load(std::memory_order_relaxed);
  while (!head.compare_exchange_weak(n->next, n)) {}
}
```

---

**Treiber stack push**: the CAS loop with the new node's own `next` as
`expected`. A failed exchange writes the current head straight into
`n->next`, so the node is relinked for the retry with no extra code.

The node is private until the CAS succeeds, so writing `n->next` needs
no atomics. The CAS's default `seq_cst` (release would do) publishes
`value` to the thread that pops the node.

Graded by whitespace-normalised equality: atomic operations are not
constant expressions, so no compile-time harness can tell a working
loop from a broken one.
