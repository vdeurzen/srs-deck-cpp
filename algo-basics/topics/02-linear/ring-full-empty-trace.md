---
id: linear-ring-full-empty-trace
kind: trace
version: 1
level: 2
tags: [queues, ring-buffers, tracing]
requires:
  - linear-ring-buffer-code
probes:
  1: { head: "0", tail: "0" }
  2: { head: "0", tail: "0" }
refs:
  - https://en.cppreference.com/w/cpp/container/queue
---

The 4-slot ring from the pop Card: `tail` is where the next push goes,
`head` is the oldest element.

```cpp
constexpr int N = 4;
int buf[N], head = 0, tail = 0;

void push(int x) { buf[tail] = x; tail = (tail + 1) % N; }
int  pop()       { int x = buf[head]; head = (head + 1) % N; return x; }

int main() {
  push(1); push(2); push(3); push(4);   // @1
  pop(); pop(); pop(); pop();           // @2
}
```

---

Full and empty both show **`head == tail`**, so the indices alone
cannot tell them apart. A ring therefore keeps a separate count (or
leaves one slot unused, so "full" is `(tail + 1) % N == head`). Without
that, a push into a full ring silently overwrites the oldest element.

(Values from running it under GCC 16.2.)
