---
id: linear-ring-buffer-code
kind: code
version: 1
level: 2
tags: [queues, ring-buffers]
requires:
  - linear-queue-ring
input: chips
choices:
  c1: ["(head + 1) % N", "head + 1", "(tail + 1) % N", "(head - 1) % N"]
compile:
  harness: |
    constexpr int run() {                 // 9 pushes and pops through 4 slots
      Ring r; int got = 0;
      r.push(1); r.push(2); r.push(3);
      got = got * 10 + r.pop();           // 1
      r.push(4); r.push(5);
      for (int k = 0; k < 4; ++k) got = got * 10 + r.pop();
      r.push(6); r.push(7);
      got = got * 10 + r.pop();
      got = got * 10 + r.pop();
      return got;
    }
    static_assert(run() == 1234567);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/queue
---

A FIFO queue in a fixed array of 4 slots: `tail` is where the next push
goes, `head` is the oldest element. Complete the pop.

```cpp
constexpr int N = 4;
struct Ring {
  int buf[N] = {}, head = 0, tail = 0;
  constexpr void push(int x) { buf[tail] = x; tail = (tail + 1) % N; }
  constexpr int pop() {
    int x = buf[head];
    head = {{c1::(head + 1) % N}};
    return x;
  }
};
```

---

**Advance `head` and wrap it at the end, exactly like `tail`.** Both
indices chase each other round the array, so neither push nor pop moves
an element: O(1) each.

Without the `% N`, `head` runs past `buf[3]` and the read is out of
bounds, which a constant expression rejects. This sketch has no
full/empty check; a real ring tracks the count too.
