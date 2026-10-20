---
id: linear-ring-full-empty-trace
kind: trace
version: 2
level: 2
tags: [queues, ring-buffers, tracing]
requires:
  - interview-essentials/linear-ring-buffer-code
probes:
  1: { head: "0", tail: "0" }
  2: { head: "0", tail: "0" }
elaborate: Which would you pick for a ring buffer you ship, a separate count or one slot left unused, and what does each cost?
refs:
  - https://en.cppreference.com/w/cpp/container/queue
---

A FIFO queue in a 3-slot ring buffer: `tail` is where the next push
goes, `head` is the oldest element. It already holds 1 and 2.

```cpp
constexpr int N = 3;
int buf[N] = {1, 2, 0}, head = 0, tail = 2;

void push(int x) { buf[tail] = x; tail = (tail + 1) % N; }
int  pop()       { int x = buf[head]; head = (head + 1) % N; return x; }

int main() {
  push(3);                // @1
  pop(); pop(); pop();    // @2
}
```

---

The push fills the last slot and wraps `tail` onto `head`; the three pops
walk `head` round to meet it again. Full and empty both show
**`head == tail`**, so the indices alone cannot tell them apart. A ring
therefore keeps a separate count, or leaves one slot unused so that
"full" is `(tail + 1) % N == head`. Without that, a push into a full ring
silently overwrites the oldest element.

(Values from running it under GCC 16.2.)
