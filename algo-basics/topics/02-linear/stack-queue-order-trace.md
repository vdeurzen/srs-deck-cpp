---
id: linear-stack-queue-order-trace
kind: trace
version: 1
level: 1
tags: [foundations, stacks, queues, tracing]
requires:
  - interview-essentials/linear-stack-adt
  - interview-essentials/linear-queue-adt
probes:
  1: { a: "8", b: "3" }
  2: { c: "2", d: "5" }
refs:
  - https://en.cppreference.com/w/cpp/container/stack
  - https://en.cppreference.com/w/cpp/container/queue
---

The same values go into a stack and a queue. (`std::queue` calls
enqueue `push` and dequeue `pop`.)

```cpp
#include <queue>
#include <stack>

int main() {
  std::stack<int> s;
  std::queue<int> q;
  for (int x : {3, 5, 8}) { s.push(x); q.push(x); }
  int a = s.top(), b = q.front();   // @1
  s.pop(); q.pop();
  s.push(2); q.push(2);
  int c = s.top(), d = q.front();   // @2
}
```

---

The stack now holds 3 5 2, the queue 5 8 2. **A stack removes at the
end it adds to; a queue removes at the opposite end.** That one
property is the whole difference: the newest 2 is the stack's top at
once, but waits behind 5 and 8 in the queue.

(Values from running it under GCC 16.2.)
