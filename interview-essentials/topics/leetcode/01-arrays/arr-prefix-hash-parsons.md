---
id: arr-prefix-hash-parsons
kind: parsons
version: 1
level: 3
tags: [prefix-sums, hash-map, lc-560, lc-974]
distractors:
  - "  ++seen[0];"
  - "  n += seen[k - p];"
compile:
  harness: |
    #include <array>
    #include <unordered_map>
    struct Seen {                        // constexpr stand-in for unordered_map<int, int>
      std::array<int, 41> c{};           // keys -20 .. 20
      int lookups = 0;
      constexpr int& operator[](int key) { ++lookups; return c.at(key + 20); }
    };
    constexpr bool count_is(std::array<int, 3> a, int k, int want, int zeros) {
      Seen s;
      int n = subarray_sum(a, k, s);
      return n == want && s.c[20] == zeros && s.lookups == 6;   // prefix 0 seen `zeros` times
    }
    static_assert(count_is({1, 1, 1}, 2, 2, 1));
    static_assert(count_is({1, 2, 3}, 3, 2, 1));    // {1, 2} starts at the empty prefix
    static_assert(count_is({1, -1, 0}, 0, 3, 2));   // a prefix must not pair with itself
    static_assert(count_is({2, 4, -3}, 3, 1, 1));
    static_assert(count_is({3, 0, 0}, 3, 3, 1));
    int main() {                                    // and with the real map
      std::unordered_map<int, int> seen;
      return subarray_sum(std::array{1, 1, 1}, 2, seen);
    }
requires:
  - arr-prefix-hash-signal
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://leetcode.com/problems/subarray-sums-divisible-by-k/
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
elaborate: LC 525 wants the longest such subarray, not the count. What would `seen` store instead, and when would you write it?
---

```cpp
constexpr int subarray_sum(const auto& a, int k, auto& seen) {
  int p = 0, n = 0;
  for (int x : a) {
    ++seen[p];
    p += x;
    n += seen[p - k];
  }
  return n;
}
```

---

**Prefix sum + hash map of prefix counts** (LC 560). Each turn first
records the prefix *before* `x`, then looks up `p − k` for the prefix
that ends at `x`: every earlier prefix equal to it starts a subarray
that sums to `k`.

- The first turn records the empty prefix, so no separate seed is
  needed. Adding `++seen[0]` as well counts it twice. Most editorials
  write the same count the other way round: seed `seen[0] = 1`, look
  up, then record after `p += x`.
- Recording after `p += x` would let a prefix pair with itself, the
  empty subarray, which counts wrongly when `k == 0`.
- `p - k`, not `k - p`: `p[j] − p[i] = k` gives `p[i] = p[j] − k`.

LC 974 (sums divisible by `k`) is the same loop keyed on
`((p % k) + k) % k`.

`seen` is a parameter, so `seen[...]` is resolved only when the function
is called. The harness passes a constexpr array-backed stand-in, since
`std::unordered_map` is not constexpr, and `main` compiles the same code
with the real map.
