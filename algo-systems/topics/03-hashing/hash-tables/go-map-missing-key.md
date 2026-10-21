---
id: hash-go-map-missing-key
kind: basic
version: 2
level: 2
requires:
  - cpp-essentials/iter-map-subscript-inserts
tags: [hashing, containers]
elaborate: In your C++, which reads use `m[k]` only to look, and would a Go habit of reading a missing key as zero have put them there?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
---

Two ways to count a word `w` in `std::unordered_map<std::string, int> counts`:

```cpp
++counts[w];                                         // A

auto it = counts.find(w);                            // B
if (it == counts.end()) counts.insert({w, 1});
else ++it->second;
```

## `w` is not in `counts` yet. How many hash lookups does each do?

---

**A does one; B does two, the failed `find` and then `insert`.**

`operator[]` looks the key up once and, on a miss, inserts a
`0` in the slot it found, which `++` makes 1. B's
`insert` hashes and searches again. Use `[]` to count, `find` to read.
