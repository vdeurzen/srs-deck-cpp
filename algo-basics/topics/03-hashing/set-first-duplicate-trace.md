---
id: hashing-set-first-duplicate-trace
kind: trace
version: 1
level: 1
tags: [hashing, sets, tracing]
probes:
  1: { first_dup: "3", checks: "4", "seen.size()": "3" }
requires:
  - hashing-map-set-purpose
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_set/insert
---

Find the first id that repeats. `insert` returns a pair whose
`.second` is `false` when the key was already there.

```cpp
std::unordered_set<int> seen;
int ids[] = {7, 3, 9, 3, 7};
int first_dup = -1, checks = 0;

int main() {
  for (int x : ids) {
    ++checks;
    if (!seen.insert(x).second) { first_dup = x; break; }
  }
  // @1
}
```

---

The set answers "seen before?" in O(1) on average, so the scan is
O(n). **Comparing each id with all earlier ones would be O(n²)**; the
set trades memory for that.

`seen` stops at three elements because the duplicate is not inserted
again.

(Values from running it under GCC 16.2.)
