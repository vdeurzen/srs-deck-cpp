---
id: stl-pq-top-ref-trace
kind: trace
version: 2
level: 3
tags: [stl, heaps, tracing, lc-743]
probes:
  1: { d: "1", rd: "4" }
requires:
  - interview-essentials/stl-pq-min-heap-type
  - interview-essentials/stl-binding-auto-copies
refs:
  - https://leetcode.com/problems/network-delay-time/
  - https://en.cppreference.com/w/cpp/container/priority_queue/pop
  - https://en.cppreference.com/w/cpp/language/structured_binding
elaborate: Dijkstra reads `d` after the pop to relax edges. With the reference form, which distance would it relax from, and would any test notice?
---

Dijkstra, as in Network Delay Time (LC 743), pops `(dist, node)` pairs
from a min-heap. Two ways to read the top before popping:

```cpp
using P = std::pair<int, int>;   // (dist, node)
std::priority_queue<P, std::vector<P>, std::greater<>> pq;

int main() {
  pq.push({1, 2}); pq.push({4, 1}); pq.push({7, 3});
  auto [d, u] = pq.top();
  const auto& [rd, ru] = pq.top();
  pq.pop();                         // @1
}
```

---

`auto` copies the top, `(1, 2)`, so `d` outlives the pop. `const auto&`
makes the hidden variable a reference to `top()`, which is
`c.front()`. `pop()` is `pop_heap` then `pop_back`: `pop_heap` moves
the next-smallest, `(4, 1)`, into `c.front()`, and `pop_back`
invalidates only the last element. **So `rd` legally reads 4, silently
wrong, not 1.** With one element left the reference would dangle
instead.

Follows from `pop`'s specification. Values from compiling and running
an instrumented copy under GCC 16.2 and Clang 22 with libc++
(`-std=c++23 -fsanitize=address`).
