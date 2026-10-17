---
id: technique-activity-selection
kind: code
version: 1
level: 2
tags: [greedy, intervals]
input: chips
choices:
  c1:
    - "a.end < b.end"
    - "a.start < b.start"
    - "a.end - a.start < b.end - b.start"
    - "a.end > b.end"
compile:
  harness: |
    static_assert(max_talks(std::array<Talk, 3>{{{0, 10}, {1, 2}, {3, 4}}}) == 2);
    static_assert(max_talks(std::array<Talk, 3>{{{0, 5}, {4, 7}, {6, 11}}}) == 2);
    static_assert(max_talks(std::array<Talk, 4>{{{1, 3}, {2, 5}, {3, 6}, {6, 8}}}) == 3);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Activity_selection_problem
  - https://en.cppreference.com/w/cpp/algorithm/sort
requires:
  - technique-greedy-coins-counterexample
---

One room, many talks `[start, end)`. `max_talks` sorts them, then takes
each talk that starts after the last one taken ends. Complete the sort
order that makes this greedy pass optimal.

```cpp
#include <algorithm>
#include <array>
struct Talk { int start, end; };

template <std::size_t N>
constexpr int max_talks(std::array<Talk, N> t) {
  std::sort(t.begin(), t.end(), [](Talk a, Talk b) { return {{c1::a.end < b.end}}; });
  int count = 0, free_at = 0;
  for (Talk x : t)
    if (x.start >= free_at) { ++count; free_at = x.end; }
  return count;
}
```

---

**Earliest end first**: the talk that frees the room soonest leaves the
most time for the rest. Earliest *start*, on `[0, 10)`, `[1, 2)`,
`[3, 4)`, takes `[0, 10)` and loses both short talks. *Shortest*, on
`[0, 5)`, `[4, 7)`, `[6, 11)`, takes `[4, 7)`, which blocks both
neighbours.
