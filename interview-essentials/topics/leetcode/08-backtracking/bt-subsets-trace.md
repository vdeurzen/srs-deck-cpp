---
id: bt-subsets-trace
kind: trace
version: 1
level: 3
tags: [backtracking, subsets, tracing]
probes:
  1: { cur: "7", out: "3" }
requires:
  - bt-subsets-worked
  - cpp-essentials/vector-back-pop-back
  - cpp-essentials/cast-functional-notation
refs:
  - https://leetcode.com/problems/subsets/
  - https://doi.org/10.1145/321296.321300
elaborate: Say in one sentence, as to an interviewer, why one shared `cur` grown and shrunk is cheaper than passing each call its own copy.
---

Every subset of `{7, 8}`. Probe @1 is read just after that line runs
for the first time. Write `cur` as its items, and `out` as how many
subsets it holds.

```cpp
std::vector<int> a{7, 8}, cur;
std::vector<std::vector<int>> out;
void subsets(int i) {
  out.push_back(cur);
  for (int j = i; j < int(a.size()); ++j) {
    cur.push_back(a[j]);
    subsets(j + 1);
    cur.pop_back();   // @1
  }
}
int main() { subsets(0); }
```

---

Each call records on entry, before its loop, so the root's `[]`, then
`[7]`, then `[7, 8]` are recorded on the way down: 3 subsets. The first
removal runs when `subsets(2)` returns to `subsets(1)`, the call that
appended 8, so `cur` goes back to `[7]`: the state `subsets(1)` was
entered with.

Values from running it under GCC 16.2.
