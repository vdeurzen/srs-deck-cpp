---
id: part-partition-trace
kind: trace
version: 1
level: 3
tags: [algorithms, rearranging, tracing]
probes:
  1: { evens: "2" }
  2: { four_before_mid: "true" }
requires:
  - part-partition-worked
  - part-keep-order
elaborate: Say which of these probes would change if the call were `std::stable_partition`, and why.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://eel.is/c++draft/alg.partitions
---

Give `evens` at @1 and `four_before_mid` at @2.

```cpp
std::vector<int> v{7, 4, 1, 6};
auto is_even = [](int x) { return x % 2 == 0; };
auto mid = std::partition(v.begin(), v.end(), is_even);
auto evens = mid - v.begin();                                // @1
bool four_before_mid = std::find(v.begin(), mid, 4) != mid;  // @2
```

---

Test the element: 7 odd; 4 even, so swap an element that passes into
the write position (0), advance the write position; 1 odd; 6 even, so
swap an element that passes into the write position (1), advance the
write position; return the boundary, position 2. Whatever method runs,
the standard fixes the count of evens before `mid` (2) and that 4 is
among them (`true`); their order is unspecified, so no probe reads it.
Values from GCC 16.2.
