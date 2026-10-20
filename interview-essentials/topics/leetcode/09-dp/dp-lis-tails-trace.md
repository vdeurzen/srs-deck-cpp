---
id: dp-lis-tails-trace
kind: trace
version: 1
level: 3
tags: [dynamic-programming, binary-search, tracing, lc-300]
probes:
  1: { first: "2", second: "3" }
  2: { len: "2" }
requires:
  - dp-lis-tails-worked
  - stl-bits-stdcpp-header
  - cpp-essentials/iter-range-for-intro
elaborate: Say in one sentence, as to an interviewer, why 3 overwriting 8 can never shorten the answer.
refs:
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

The tails list for the longest strictly increasing subsequence of
`{5, 2, 8, 3}`. Give `t`'s entries and its size after the loop.

```cpp
#include <bits/stdc++.h>
int main() {
  std::vector<int> a{5, 2, 8, 3}, t;
  for (int x : a) {
    auto it = std::lower_bound(t.begin(), t.end(), x);
    if (it == t.end()) t.push_back(x);
    else *it = x;
  }
  int first = t[0], second = t[1];   // @1
  int len = t.size();                // @2
}
```

---

5 is appended; 2 overwrites 5; 8 is appended; 3 overwrites 8, the
first tail ≥ 3. So `t` = {2, 3} and the length is 2: {2, 8} or
{2, 3}, and 3 is the lower end to extend later. Values from running it
under GCC 16.2.
