---
id: stl-pq-top-ref-trace
kind: trace
version: 1
level: 3
tags: [stl, heaps, tracing, lc-743]
probes:
  1: { d: "1", u: "0" }
  2: { rd: "4", ru: "1" }
requires:
  - stl-pq-min-heap-type
  - stl-binding-auto-copies
refs:
  - https://leetcode.com/problems/network-delay-time/
  - https://en.cppreference.com/w/cpp/container/priority_queue/pop
  - https://en.cppreference.com/w/cpp/language/structured_binding
elaborate: Dijkstra reads `d` after the pop to relax edges. With the reference form, which distance would it relax from, and would any test notice?
---

Dijkstra (LC 743) pops `(dist, node)` pairs from a min-heap. Two ways
to read the top before popping:

```cpp
using P = std::pair<int, int>;   // (dist, node)
std::priority_queue<P, std::vector<P>, std::greater<>> pq;

int main() {
  pq.push({4, 1}); pq.push({1, 2}); pq.push({7, 3}); pq.push({1, 0});
  auto [d, u] = pq.top();
  pq.pop();                         // @1
  const auto& [rd, ru] = pq.top();
  pq.pop();                         // @2
}
```

---

Equal distances fall back to the node: `(1, 0)` is on top first. Its
copy `d, u` outlives the pop. `const auto&` makes the hidden variable a
reference to `top()`, which is `c.front()`. `pop()` is `pop_heap` then
`pop_back`; `pop_heap` moves the next-smallest into `c.front()`, and
`pop_back` invalidates only the last element. **So `rd, ru` legally
read `(4, 1)`, still in the heap: silently wrong, not `(1, 2)`.** With
one element left the reference would dangle instead.

Follows from `pop`'s specification. Values from compiling and running
an instrumented copy under GCC 16.2
(`-std=c++23 -Wall -Wextra -fsanitize=address,undefined`).
