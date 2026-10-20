---
id: arr-prefix-hash-parsons
kind: parsons
version: 1
level: 3
tags: [prefix-sums, hash-map, lc-560, lc-974]
distractors:
  - "    ++seen[x];"
  - "    n += seen[k - p];"
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
      return n == want && s.c[20] == zeros && s.lookups == 7;   // prefix 0 seen `zeros` times
    }
    static_assert(count_is({1, 1, 1}, 2, 2, 1));
    static_assert(count_is({1, 2, 3}, 3, 2, 1));    // {1, 2} starts at the empty prefix
    static_assert(count_is({1, -1, 0}, 0, 3, 3));   // a prefix must not pair with itself
    static_assert(count_is({2, 4, -3}, 3, 1, 1));
    static_assert(count_is({3, 0, 0}, 3, 3, 1));
    int main() {                                    // and with the real map
      std::unordered_map<int, int> seen;
      return subarray_sum(std::array{1, 1, 1}, 2, seen);
    }
requires:
  - arr-prefix-count-trace
  - cpp-essentials/iter-map-subscript-inserts
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://leetcode.com/problems/subarray-sums-divisible-by-k/
  - https://leetcode.com/problems/contiguous-array/
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
elaborate: Contiguous Array (LC 525) wants the longest subarray of a 0/1 array with equally many 0s and 1s, not a count. What would `seen` store instead, and when would you write it?
---

Count the contiguous subarrays of `a` summing to `k`; `seen` counts
prefix sums. Order the lines.

```cpp
constexpr int subarray_sum(const auto& a, int k, auto& seen) {
  int p = 0, n = 0;  seen[0] = 1;
  for (int x : a) {
    p += x;
    n += seen[p - k];
    ++seen[p];
  }
  return n;  }
```

---

**Seed, then add, look up, count: prefix sums with a hash map of their counts** (Subarray Sum Equals K,
LC 560: count the contiguous subarrays summing to `k`). `seen` counts
the prefix sums so far. After `p += x`, every earlier prefix equal to
`p − k` starts a subarray that ends at `x` and sums to `k`.

- `seen[0] = 1` seeds the empty prefix, so a subarray starting at index
  0 counts. Without it, `{1, 2, 3}` with `k = 3` finds only `{3}`.
- `++seen[p]` comes after the lookup: before it, `p` would pair with
  itself, the empty subarray, which counts wrongly when `k == 0`.
- `p - k`, not `k - p`: `p[j] − p[i] = k` gives `p[i] = p[j] − k`.
- Count prefixes, not values: `++seen[x]` loses the sums.

Subarray Sums Divisible by K (LC 974: count the subarrays whose sum is
divisible by `k`) is the same loop keyed on
`((p % k) + k) % k`.
