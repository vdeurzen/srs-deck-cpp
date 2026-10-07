---
id: ll-fanout-tail
kind: code
version: 1
level: 4
tags: [low-latency, measurement, distributed, probability]
input: chips
choices:
  c1:
    - "all_fast *= 1.0 - p_slow;"
    - "all_fast -= p_slow;"
    - "all_fast *= p_slow;"
    - "all_fast = 1.0 - p_slow;"
compile:
  harness: |
    static_assert(any_slow(0.01, 1) > 0.0099 && any_slow(0.01, 1) < 0.0101);
    static_assert(any_slow(0.5, 2) == 0.75);
    static_assert(any_slow(0.01, 100) > 0.63 && any_slow(0.01, 100) < 0.64);
    int main() {}
requires:
  - ll-tail-latency
refs:
  - https://dl.acm.org/doi/10.1145/2408776.2408794
---

A request fans out to `n` servers in parallel and waits for all of them;
each is independently slow with probability `p_slow`. Complete the loop
so the function returns the probability that the request is slow.

```cpp
constexpr double any_slow(double p_slow, int n) {
  double all_fast = 1.0;
  for (int i = 0; i < n; ++i) {{c1::all_fast *= 1.0 - p_slow;}}
  return 1.0 - all_fast;
}
```

---

**Slow unless every server is fast: 1 − (1 − p)ⁿ.** At 100 servers and a
1 % chance each, 63 % of requests are slow — each server's p99 is now the
user's median ("The Tail at Scale"). Subtracting `p_slow` per server is
the union bound `n · p`: it overestimates, and reaches 1 at 100 servers.
