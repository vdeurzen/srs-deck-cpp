---
id: mono-next-greater-chunk
kind: chunk
version: 1
level: 3
tags: [monotonic-stack, stacks, lc-739, lc-496]
expose_ms: 9000
compile: null # a function body: graded by text, see below
requires:
  - mono-stack-signal
refs:
  - https://leetcode.com/problems/daily-temperatures/
  - https://leetcode.com/problems/next-greater-element-i/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: LC 503 makes the array circular. How would you get each day's answer without copying the array twice?
---

```cpp
std::vector<int> st, ans(t.size());
for (int i = 0; i < int(t.size()); ++i) {
  for (; !st.empty() && t[st.back()] < t[i]; st.pop_back())
    ans[st.back()] = i - st.back();
  st.push_back(i);
}
return ans;
```

---

**Next greater element with a monotonic stack** (LC 739). `st` holds
the **indices** of days still waiting; their temperatures never rise
from bottom to top. Day `i` answers and pops every cooler day on top,
then waits itself.

Indices, so the answer can be a distance (`i - st.back()`); LC 496
stores `t[i]` instead. Strict `<`: an equal temperature is not warmer.
Days left on the stack keep the default 0.

Graded by text (`compile: null`): it is the body of
`std::vector<int> dailyTemperatures(std::vector<int>& t)`, and a harness
can only be appended after it. Checked by including it verbatim in a
constexpr test of LC 739's examples, GCC 16.2.
