---
id: spsc-stale-cache-trace
kind: trace
version: 1
level: 4
tags: [spsc, lock-free, queues, tracing]
probes:
  1: { cached_head: "0", refreshes: "0" }
  2: { a: "true", cached_head: "1", "buf[0]": "14" }
  3: { b: "false", refreshes: "2" }
requires:
  - spsc-try-push
refs:
  - https://rigtorp.se/ringbuffer/
---

The producer side of an SPSC ring of 4, written out flat. It fills the
ring, the consumer pops one item, and then the producer pushes twice.

```cpp
constexpr std::size_t N = 4;
std::atomic<std::size_t> head{0};                 // written by the consumer
std::size_t tail = 0, cached_head = 0;  int buf[N]{}, refreshes = 0;
auto try_push = [&](int x) {
  if (tail - cached_head == N) {
    cached_head = head.load(std::memory_order_acquire);  ++refreshes;
    if (tail - cached_head == N) return false;
  }
  buf[tail & (N - 1)] = x;  ++tail;  return true;
};
for (int i = 0; i != 4; ++i) try_push(10 + i);    // @1
head.store(1, std::memory_order_release);         // the consumer popped one
bool a = try_push(14);                            // @2
bool b = try_push(15);                            // @3
```

---

**Filling the ring never reads `head`. Once it is full, every push
pays a refresh.** At @1 the stale `cached_head` of 0 was enough for four
pushes. At @2 the ring looks full, so the producer refreshes, sees the
one pop, and wraps to slot 0. At @3 it looks full again, refreshes
again, and is refused.

So the cache saves cross-core reads only while the consumer keeps
ahead. A ring that sits near full refreshes on every push, as if there
were no cache. Size the ring so it rarely fills. Values are from an
instrumented copy compiled and run with GCC 16.2 (`-std=c++23`).
