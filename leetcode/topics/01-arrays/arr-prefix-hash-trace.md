---
id: arr-prefix-hash-trace
kind: trace
version: 2
level: 3
tags: [prefix-sums, hash-map, tracing, lc-560]
probes:
  1: { found: "2", n: "3" }
requires:
  - arr-prefix-hash-worked
  - interview-essentials/arr-prefix-hash-parsons
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
elaborate: Why would a set of prefixes, instead of a count per prefix, undercount here, and on which kind of input?
---

Subarray Sum Equals K (LC 560): count the contiguous non-empty subarrays
that sum to `k`. Here `a = {1, -1, 1}`, `k = 1`, and the loop has
handled `a[0]` and `a[1]`: the prefix sums so far are 0 (empty), 1 and
0 again. One more turn, for `a[2]`:

```cpp
std::unordered_map<int, int> seen{{0, 2}, {1, 1}};   // prefix -> count
int p = 0, n = 1, k = 1;
int x = 1;                    // a[2]
p += x;
int found = seen[p - k];
n += found;
++seen[p];                    // @1
```

---

`p` is 1, so the turn looks up prefix 0, which occurred **twice**: the
empty prefix and the prefix after `{1, -1}`. Each starts a subarray
ending here that sums to 1: `{1, -1, 1}` and `{1}`. **A repeated prefix
value is a repeated starting point**, which is why the map counts
rather than flags. With the earlier `{1}`, that makes 3.

Values from compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra -fsanitize=address,undefined`, clean).
