---
id: linear-stack-queue-order-trace
kind: trace
version: 2
level: 1
tags: [foundations, stacks, queues, tracing]
requires:
  - interview-essentials/linear-stack-adt
  - interview-essentials/linear-queue-adt
probes:
  1: { "s.top()": "5", "q.front()": "3" }
  2: { "s.top()": "3", "q.front()": "5" }
elaborate: Name a task from your own work that needs the newest item first, and one that needs the oldest first.
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
  s.push(3); s.push(5);
  q.push(3); q.push(5);
  // @1
  s.pop(); q.pop();
  // @2
}
```

---

**A stack removes at the end it adds to; a queue removes at the opposite
end.** So `s.pop()` takes the 5 that went in last, leaving 3 on top, while
`q.pop()` takes the 3 that went in first, leaving 5 at the front.

(Values from running it under GCC 16.2.)
