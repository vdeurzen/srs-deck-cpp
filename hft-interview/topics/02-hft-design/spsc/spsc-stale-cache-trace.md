---
id: spsc-stale-cache-trace
kind: trace
version: 2
level: 4
tags: [spsc, lock-free, queues, tracing]
probes:
  1: { a: "true", cached_head: "1" }
  2: { b: "true", cached_head: "2" }
requires:
  - spsc-try-push
refs:
  - https://rigtorp.se/ringbuffer/
elaborate: Your ring sits near full all day. What would you change, the ring's size or the code, to stop paying a cross-core read per push?
---

The producer side of an SPSC ring of 4, written out flat. The producer
has filled the ring while its cached copy of `head` stayed 0; the
consumer has since popped one item, so `head` is 1.

```cpp
constexpr std::size_t N = 4;
std::atomic<std::size_t> head{1};                 // written by the consumer
std::size_t tail = 4, cached_head = 0;
int buf[N]{10, 11, 12, 13};
bool try_push(int x) {
  if (tail - cached_head == N) {
    cached_head = head.load(std::memory_order_acquire);
    if (tail - cached_head == N) return false;
  }
  buf[tail & (N - 1)] = x;  ++tail;  return true;
}
bool a = try_push(14);                            // @1
head.store(2, std::memory_order_release);         // the consumer pops another
bool b = try_push(15);                            // @2
```

---

**Once the ring is full, every push pays a refresh.** At @1 the stale
copy says full, so the producer reads `head`, sees the pop, and wraps
to slot 0. At @2 the ring looks full again: one free slot was used up,
so the producer reads `head` once more before it can push.

The cache saves cross-core reads only while the consumer keeps ahead;
a ring that sits near full refreshes on every push, as if there were
no cache. Values are from an instrumented copy compiled and run with
GCC 16.2 (`-std=c++23`).
