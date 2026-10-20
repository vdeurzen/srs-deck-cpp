---
id: sort-trace-lsd-radix
kind: trace
version: 2
level: 4
tags: [tracing, sorting, radix]
probes:
  1: { "a[0]": "31", "a[1]": "21" }
  2: { "a[1]": "21", "a[2]": "23" }
requires:
  - algo-basics/sort-radix-worked
  - interview-essentials/sort-stable-meaning
refs:
  - https://en.wikipedia.org/wiki/Radix_sort
elaborate: What would the second pass's result be if it were not stable, and which pair could come out wrong?
---

`pass(v, div)` is one stable bucket pass on the digit `x / div % 10`:
buckets in digit order, each filled in `v`'s order.

```cpp
std::vector<int> pass(const std::vector<int>& v, int div) {
  std::vector<int> out;
  for (int d = 0; d < 10; ++d)
    for (int x : v)
      if (x / div % 10 == d) out.push_back(x);
  return out;
}
std::vector<int> a{23, 31, 13, 21};
a = pass(a, 1);    // @1 ones digit
a = pass(a, 10);   // @2 tens digit
```

---

The ones pass puts the 1s first, 31 before 21 because that is their
input order, then the 3s: `31 21 23 13`. The tens pass groups 21 and
23 under digit 2, and keeps them in the order the ones pass left them:
`13 21 23 31`, sorted. **Stability carries each earlier pass through
the later ones.**

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
