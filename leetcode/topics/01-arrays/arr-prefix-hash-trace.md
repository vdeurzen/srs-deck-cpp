---
id: arr-prefix-hash-trace
kind: trace
version: 1
level: 3
tags: [prefix-sums, hash-map, tracing, lc-560]
probes:
  1: { p: "0", n: "1" }
  2: { f3: "2", s0: "2" }
  3: { f4: "2", n: "5" }
requires:
  - interview-essentials/arr-prefix-hash-parsons
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

Subarray Sum Equals K (LC 560): count the contiguous non-empty subarrays
that sum to `k`. Here on `a = {1, -1, 1, 1}`, `k = 1`, one loop turn per
`step`.

```cpp
std::unordered_map<int, int> seen;
int p = 0, n = 0, k = 1;

int step(int x) {             // one turn of the loop
  ++seen[p];
  p += x;
  int found = seen[p - k];
  n += found;
  return found;
}

int main() {
  step(1); step(-1);          // @1
  int f3 = step(1);
  int s0 = seen[0];           // @2
  int f4 = step(1);           // @3
}
```

---

After `{1, -1}` the prefix is back to 0. The third turn records it, so
`seen[0]` is 2: the empty prefix and `{1, -1}`. Its `p` is 1, and both
of those prefixes equal `p − k`: `f3 = 2`, for `{1}` alone and for
`{1, -1, 1}`. **A repeated prefix value is a repeated starting point**,
which is why the map counts rather than flags.

The last turn finds the two prefixes equal to 1: `{1}` and
`{-1, 1, 1}`. Five in total.

Values from compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra -fsanitize=address,undefined`, clean).
