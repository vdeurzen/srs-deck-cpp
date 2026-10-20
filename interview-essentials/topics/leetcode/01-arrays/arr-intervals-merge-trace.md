---
id: arr-intervals-merge-trace
kind: trace
version: 1
level: 3
tags: [intervals, tracing, lc-56]
probes:
  1: { "out.size()": "1", "out.back()[1]": "5" }
  2: { "out.size()": "1", "out.back()[1]": "7" }
requires:
  - arr-intervals-merge-worked
  - arr-intervals-merge-signal
  - cpp-essentials/vector-back-pop-back
  - cpp-essentials/vector-of-vectors
refs:
  - https://leetcode.com/problems/merge-intervals/
elaborate: Say aloud which input interval, added last, would make `out` grow to two intervals, and why.
---

Merging intervals `{start, end}` already sorted by start. Each `add`
either opens a new output interval or extends the last one's end;
`out.empty()` is true while `out` holds nothing.

```cpp
std::vector<std::vector<int>> out;

void add(std::vector<int> v) {
  if (out.empty() || out.back()[1] < v[0]) out.push_back(v);
  else if (out.back()[1] < v[1]) out.back()[1] = v[1];
}

int main() {
  add({1, 5});
  add({2, 4});   // @1
  add({5, 7});   // @2
}
```

---

`[2, 4]` starts inside `[1, 5]` and ends before 5, so neither branch
changes the end: it stays 5, not 4. `[5, 7]` starts at 5, which is not
past the end 5, so **touching intervals merge**: the end becomes 7, and
`out` is still the single `[1, 7]`.

Values from running it under GCC 16.2.
