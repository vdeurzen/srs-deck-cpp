---
id: sort-trace-lsd-radix
kind: trace
version: 1
level: 4
tags: [tracing, sorting, radix]
probes:
  1: { "a[0]": "21", "a[1]": "11", "a[4]": "13" }
  2: { "a[0]": "11", "a[1]": "13", "a[4]": "52" }
  3: { "b[0]": "11", "b[1]": "21", "b[2]": "52" }
requires:
  - sort-radix
refs:
  - https://en.wikipedia.org/wiki/Radix_sort
---

```cpp
auto pass = [](const std::vector<int>& v, int div) {
  std::vector<int> out;
  for (int d = 0; d < 10; ++d)        // buckets in digit order,
    for (int x : v)                   // each filled in input order
      if (x / div % 10 == d) out.push_back(x);
  return out;
};
const std::vector<int> in{53, 21, 13, 52, 11, 23};
auto a = pass(in, 1);                 // @1
a = pass(a, 10);                      // @2
auto b = pass(pass(in, 10), 1);       // @3
```

---

Each pass is stable: within a bucket, elements keep the order the
previous pass left them in. After the ones pass, 21 precedes 11 (input
order); the tens pass puts 11 and 13 in one bucket, and the ones pass
already ordered them, so `a` is sorted. LSD means **least significant
digit first**: run the passes the other way round (`b`) and the last
pass wins, giving `11 21 52 13 23 53`, sorted by ones only. Verified by
compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
