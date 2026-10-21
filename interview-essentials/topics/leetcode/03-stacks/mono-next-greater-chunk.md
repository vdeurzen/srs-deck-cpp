---
id: mono-next-greater-chunk
kind: chunk
version: 1
level: 3
tags: [monotonic-stack, stacks, lc-739, lc-496]
expose_ms: 12000
compile: null # a loop from a function body
requires:
  - mono-next-greater-worked
  - cpp-essentials/vector-back-pop-back
  - cpp-essentials/cast-functional-notation
refs:
  - https://leetcode.com/problems/daily-temperatures/
  - https://leetcode.com/problems/next-greater-element-i/
  - https://leetcode.com/problems/next-greater-element-ii/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: Next Greater Element II (LC 503) wants each value's next greater value in a circular array, or -1. How would you get every answer without copying the array twice?
---

`t[i]` is day `i`'s temperature; `ans` starts as `t.size()` zeros;
`st` is an empty `std::vector<int>`.

```cpp
for (int i = 0; i < int(t.size()); ++i) {
  while (!st.empty() && t[st.back()] < t[i]) {
    ans[st.back()] = i - st.back();
    st.pop_back();
  }
  st.push_back(i);
}
```

---

**Next greater element with a monotonic stack** (Daily Temperatures,
LC 739: for each day, how many days until a warmer one). `st` holds
the **indices** of days still waiting; their temperatures never rise
from bottom to top. Day `i` answers and pops every cooler day on top,
then waits itself.

Indices, so the answer can be a distance (`i - st.back()`); Next
Greater Element I (LC 496) wants the greater value, so it stores
`t[i]` instead. Strict `<`: an equal temperature is not warmer.
Days left on the stack keep their 0. Then `return ans;`.
