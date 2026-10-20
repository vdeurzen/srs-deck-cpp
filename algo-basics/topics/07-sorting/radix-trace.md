---
id: sort-radix-trace
kind: trace
version: 2
level: 2
tags: [tracing, sorting, radix-sort, stability]
probes:
  1: { first: "13", second: "12" }
requires:
  - sort-radix-worked
  - sort-counting-code
  - cpp-essentials/iter-range-for-const-auto-ref
elaborate: Where would you sort records on several keys this way, least important key first, with a stable sort for each key?
refs:
  - https://en.wikipedia.org/wiki/Radix_sort
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

One radix pass, on the tens digit only. `v` has not had a ones-digit
pass.

```cpp
std::vector<int> v{13, 32, 12, 31};
std::vector<int> bucket[10];
for (int x : v) bucket[x / 10 % 10].push_back(x);   // tens digit
v.clear();
for (const auto& b : bucket)
  for (int x : b) v.push_back(x);
int first = v[0], second = v[1];                     // @1
```

---

13 and 12 share tens digit 1 and keep their input order, so the pass
yields `13 12 32 31`: **a stable pass orders by its own digit and leaves
ties as they came**. That is why LSD radix sort runs the ones pass
first: its order is exactly what this pass preserves. (Run with GCC 16.2.)
