---
id: arr-prefix-count-trace
kind: trace
version: 1
level: 3
tags: [prefix-sums, hash-map, tracing, lc-560]
probes:
  1: { p: "0", n: "1" }
  2: { n: "3", "seen[0]": "3" }
requires:
  - arr-prefix-count-worked
  - arr-prefix-hash-signal
  - cpp-essentials/iter-map-subscript-inserts
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
elaborate: Swap the last two lines of `turn` and rerun it in your head with `k = 0`. What does each turn now count that it shouldn't?
---

Count the subarrays of `{2, -2, 0}` summing to `k = 0`. Seeded, then
one `turn` per element: add, look up, count.

```cpp
std::unordered_map<int, int> seen{{0, 1}};   // seed: the empty prefix
int p = 0, n = 0, k = 0;

void turn(int x) {
  p += x;
  n += seen[p - k];
  ++seen[p];
}

int main() {
  turn(2);
  turn(-2);   // @1
  turn(0);    // @2
}
```

---

At `-2`, `p` returns to 0, which the seed counted once: `{2, -2}` sums
to 0. At `0`, `p` is 0 again and `seen[0]` is now 2, so two subarrays
end here: `{2, -2, 0}` and `{0}`. **A repeated prefix is a repeated
starting point**, so `n` is 3.

Values from running it under GCC 16.2.
