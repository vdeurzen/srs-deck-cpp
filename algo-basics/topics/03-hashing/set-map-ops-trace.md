---
id: hashing-set-map-ops-trace
kind: trace
version: 1
level: 1
tags: [foundations, sets, tracing]
probes:
  1: { "s.size()": "2", added: "false" }
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_set/insert
---

A set stores keys. `insert` returns a pair whose `.second` says whether
the key was added.

```cpp
#include <string>
#include <unordered_set>

int main() {
  std::unordered_set<std::string> s;
  s.insert("ann"); s.insert("bob");
  bool added = s.insert("ann").second;   // @1
}
```

---

**A set holds each key at most once**: the second `"ann"` is not added,
and `insert` reports that rather than failing. That is what makes a set
the tool for "have I seen this before?".

(Values from running it under GCC 16.2.)
