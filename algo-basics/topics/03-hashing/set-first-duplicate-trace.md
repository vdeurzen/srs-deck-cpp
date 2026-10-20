---
id: hashing-set-first-duplicate-trace
kind: trace
version: 2
level: 1
tags: [hashing, sets, tracing]
probes:
  1: { first_dup: "7", "seen.size()": "2" }
requires:
  - hashing-map-set-purpose
elaborate: What does the set cost you in memory here, and when would sorting the ids first be the better trade?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_set/insert
---

Find the first id that repeats. `insert` returns a pair whose
`.second` is `false` when the key was already there.

```cpp
#include <unordered_set>

int main() {
  std::unordered_set<int> seen;
  int ids[] = {7, 3, 7, 9};
  int first_dup = -1;
  for (int x : ids) {
    bool added = seen.insert(x).second;
    if (!added) { first_dup = x; break; }
  }
  // @1
}
```

---

The second 7 is not added, so the loop stops there with `seen` holding
only 7 and 3. The set answers "seen before?" in O(1) on average, so the
scan is O(n). **Comparing each id with all earlier ones would be
O(n²)**; the set trades memory for that.

(Values from running it under GCC 16.2.)
