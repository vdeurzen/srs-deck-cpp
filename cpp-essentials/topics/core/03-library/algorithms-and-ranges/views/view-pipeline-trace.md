---
id: view-pipeline-trace
kind: trace
version: 1
level: 3
tags: [ranges, views, tracing]
probes:
  1: { x: "9" }
  2: { total: "34" }
requires:
  - view-changed-source
elaborate: Say which stage of this pipeline you would put first if the vector held a million elements and only the odd ones mattered, and why the order changes the work done.
refs:
  - https://en.cppreference.com/w/cpp/ranges/drop_view
  - https://en.cppreference.com/w/cpp/ranges/filter_view
  - https://en.cppreference.com/w/cpp/ranges/transform_view
---

`std::views::drop(1)` skips its source's first element. Read @1 on the
loop's first pass only, and @2 after the loop.

```cpp
std::vector<int> v{1, 2, 3, 4, 5};
auto odd = [](int x) { return x % 2 == 1; };
auto sq = [](int x) { return x * x; };
auto r = v | std::views::drop(1) | std::views::filter(odd)
           | std::views::transform(sq);
int s = 0;
for (int x : r)
    s += x;        // @1
int total = s;     // @2
```

---

The loop asks; each stage pulls from the one before. `drop(1)` skips 1, so
filter first sees 2; a rejecting stage pulls again, so it gets 3, which
passes, and transform squares it: @1 is 9. The next pass rejects 4 and
passes 5 (25), and 9 + 25 = 34. Values verified with GCC 16.2.
